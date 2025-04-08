import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, organization, emailOTP, createAuthMiddleware } from 'better-auth/plugins';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { APIError, Gateway, Header } from 'encore.dev/api';
import { appMeta } from 'encore.dev';
import { authHandler } from 'encore.dev/auth';
import { db } from './db/db';
import { AUTHORIZED_PARTIES } from './db/config';
import * as schema from './db/schema';
import { getSessionFromCtx } from 'better-auth/api';
import { secret } from 'encore.dev/config';
import {
  OrganizationInvitationEmailTopic,
  OrganizationInvitationTopic,
  UserResetPasswordTopic,
  UserVerificationTopic,
} from './api/auth.messaging';
import { accessManagementService } from './services/accessManagement.service';
import { CustomSession } from './types';
import {
  NotificationHandling,
  NotificationType,
  OrganizationInvitationNotification,
} from '../eventStreamer/types';
import { publishInvitationEvent, publishOrganizationEvent } from './utils/notificationUtils';

const GOOGLE_CLIENT_ID = secret('GoogleClientId');
const GOOGLE_CLIENT_SECRET_NEW = secret('GoogleClientSecretNew');

const redirectUrlGoogle =
  appMeta().environment.type === 'development'
    ? 'http://localhost:4000/api/auth/callback/google'
    : appMeta().apiBaseUrl + '/api/auth/callback/google';

// ensure to export auth.
export const auth = betterAuth<BetterAuthOptions>({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID(),
      clientSecret: GOOGLE_CLIENT_SECRET_NEW(),
      scope: ['profile', 'email'],
      // redirectURI: appMeta().apiBaseUrl + '/api/auth/callback/google',
      redirectURI: redirectUrlGoogle,
      enabled: true,
    },
  },
  trustedOrigins: AUTHORIZED_PARTIES,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'email-password'],
      allowDifferentEmails: false,
    },
  },
  advanced: {
    defaultCookieAttributes: {
      secure: !(appMeta().environment.type === 'development'),
      httpOnly: true,
      sameSite: 'lax',
    },
    ipAddress: {
      ipAddressHeaders: ['x-client-ip', 'x-forwarded-for'],
      disableIpTracking: false,
    },
    cookies: {
      session_token: {
        name: 'auth_sid_v1r2', // This will hide we use better auth
        attributes: {
          secure: !(appMeta().environment.type === 'development'),
          httpOnly: true,
          sameSite: 'lax',
        },
      },
      session_data: {
        name: 'auth_jwt_data_v1r2', // This will hide we use better auth
        attributes: {
          secure: !(appMeta().environment.type === 'development'),
          httpOnly: true,
          sameSite: 'lax',
        },
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // console.log('OFWGKTA PATH', ctx.path, ctx.body);
      if (
        ctx.path === '/organization/accept-invitation' ||
        ctx.path === '/organization/cancel-invitation' ||
        ctx.path === '/organization/reject-invitation'
      ) {
        const invitationId = ctx.body.invitationId;
        const sessionRes = await getSessionFromCtx(ctx);
        if (!invitationId || !sessionRes?.user.id || !sessionRes?.user.name) return;

        publishInvitationEvent(ctx.path, invitationId, sessionRes?.user.id, sessionRes?.user.name);
        return;
      } else if (ctx.path === '/organization/remove-member') {
        const sessionRes = await getSessionFromCtx(ctx);
        const { memberIdOrEmail, organizationId } = ctx.body;
        if (!memberIdOrEmail || !organizationId || !sessionRes?.user.id) return;
        publishOrganizationEvent(ctx.path, sessionRes.user.id, memberIdOrEmail, organizationId);
      }
    }),
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organizations = await accessManagementService.findOrganizationsAttendedByUser(
            session.userId
          );

          const activeOrganizationId = organizations.length > 0 ? organizations[0].id : null;

          let activeOrgMember;
          if (activeOrganizationId) {
            activeOrgMember = await accessManagementService.findOrganizationMemberByOrgIdAndUserId(
              session.userId,
              activeOrganizationId
            );
          }

          return {
            data: {
              ...session,
              activeOrganizationId: activeOrganizationId,
              activeOrganizationMemberId: activeOrgMember?.id,
              activeOrganizationMemberRole: activeOrgMember?.role,
            },
          };
        },
      },
    },
  },
  session: {
    additionalFields: {
      activeOrganizationMemberId: {
        type: 'string',
        required: true,
      },
      activeOrganizationMemberRole: {
        type: 'string',
        required: true,
      },
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    storeSessionInDatabase: true,
    preserveSessionInDatabase: false,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    admin(),
    emailOTP({
      expiresIn: 86400,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          throw APIError.invalidArgument('We are not supporting this type of signup');
        } else if (type === 'email-verification') {
          await UserVerificationTopic.publish({
            email,
            otp,
          });
        } else {
          await UserResetPasswordTopic.publish({
            email,
            otp,
          });
        }
      },
    }),
    organization({
      teams: {
        enabled: true,
        maximumTeams: 10000, // Optional: limit teams per organization
        allowRemovingAllTeams: true, // Optional: prevent removing the last team
      },
      async sendInvitationEmail(data) {
        OrganizationInvitationEmailTopic.publish({
          invitationId: data.id,
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          organizationName: data.organization.name,
        });

        const user = await accessManagementService.findUserByInvitationId(data.id);
        if (!user) return;
        const organization = await accessManagementService.findOrganizationByInvitationId(data.id);

        const receivedInvitationNotification: OrganizationInvitationNotification = {
          notificationType: NotificationType.ORGANIZATION_INVITATION,
          notificationHandling: NotificationHandling.RECEIVED,
          memberName: data.inviter.user.name ?? 'unkown name',
          organizationName: organization.name,
        };

        OrganizationInvitationTopic.publish({
          initializerId: data.inviter?.user.id ?? '',
          notification: receivedInvitationNotification,
          organizationId: organization.id,
          receiverIds: [user.id],
        });
      },
      // invitations expires after 7 days
      invitationExpiresIn: 60 * 60 * 24 * 7,
    }),
  ],
});

interface AuthParams {
  cookie?: Header<'Cookie'>;
}

export interface AuthData {
  userID: string;
  session: CustomSession;
  user: any;
}

// Authentication handler implementation
export const handler = authHandler<AuthParams, AuthData>(async (params) => {
  const cookieHeader = params.cookie;

  if (!cookieHeader) throw APIError.unauthenticated('Not authenticated');

  try {
    // Parse the cookie string to find the better-auth session token
    const cookieMap = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    const sessionToken = cookieMap['auth_sid_v1r2'];
    const jwtToken = cookieMap['auth_jwt_data_v1r2'];

    if (!sessionToken) throw APIError.unauthenticated('No session token found');

    // Create headers with the session cookie
    const headers = new Headers();
    headers.append('Cookie', `auth_sid_v1r2=${sessionToken}`);
    headers.append('Cookie', `auth_jwt_data_v1r2=${jwtToken}`);

    const sessionData = await auth.api.getSession({
      headers: headers,
    });

    if (!sessionData || !sessionData.user || !sessionData.user.id) {
      throw APIError.unauthenticated('Invalid session');
    }

    const session = sessionData.session as CustomSession;

    if (
      session.activeOrganizationId &&
      !session.activeOrganizationMemberId &&
      !session.activeOrganizationMemberRole
    ) {
      const organizations = await accessManagementService.findOrganizationsAttendedByUser(
        sessionData.user.id
      );
      const activeOrganizationId = organizations.length > 0 ? organizations[0].id : null;

      let activeOrgMember;
      if (activeOrganizationId) {
        activeOrgMember = await accessManagementService.findOrganizationMemberByOrgIdAndUserId(
          sessionData.user.id,
          activeOrganizationId
        );
      }

      session.activeOrganizationMemberId = activeOrgMember?.id;
      session.activeOrganizationMemberRole = activeOrgMember?.role;
    }

    return {
      userID: sessionData.user.id,
      session: session as CustomSession,
      user: sessionData.user,
    };
  } catch (error) {
    throw APIError.unauthenticated('Invalid session');
  }
});

export const gateway = new Gateway({ authHandler: handler });
