import { and, eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { organizations, members, sessions, invitations } from '../db/schema';

export class OrganizationPreparedStatement extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(organizations)
    .where(eq(organizations.id, sql`${sql.placeholder('id')}`))
    .innerJoin(members, eq(organizations.id, members.organizationId))
    .prepare('find_organization');

  public readonly findActiveOrganizationBySessionId = db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sql`${sql.placeholder('sessionId')}`))
    .prepare('find_active_organization');

  public readonly findAll = db.select().from(organizations).prepare('find_all_organizations');

  public readonly findOrganizationsAttendedByUser = db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      logo: organizations.logo,
      metadata: organizations.metadata,
      createdAt: organizations.createdAt,
    })
    .from(organizations)
    .innerJoin(members, eq(organizations.id, members.organizationId))
    .where(eq(members.userId, sql`${sql.placeholder('userId')}`))
    .prepare('find_organizations_attended_by_user');

  public readonly findOrganizationInvitationsByEmail = db
    .select({
      id: invitations.id,
      inviterId: invitations.inviterId,
      email: invitations.email,
      status: invitations.status,
      role: invitations.role,
      expiresAt: invitations.expiresAt,
      createdAt: invitations.createdAt,
      organization: organizations,
    })
    .from(invitations)
    .where(
      and(
        eq(invitations.email, sql`${sql.placeholder('email')}`),
        eq(invitations.status, 'pending')
      )
    )
    .innerJoin(organizations, eq(invitations.organizationId, organizations.id))
    .prepare('find_organization_invitations_by_email');

  public readonly findOrganizationMemberByOrgIdAndUserId = db
    .select({
      id: members.id,
      organizationId: members.organizationId,
      teamId: members.teamId,
      userId: members.userId,
      role: members.role,
      createdAt: members.createdAt,
    })
    .from(members)
    .where(
      and(
        eq(members.organizationId, sql`${sql.placeholder('organizationId')}`),
        eq(members.userId, sql`${sql.placeholder('userId')}`)
      )
    )
    .prepare('find_organization_member_by_org_id_and_user_id');

  public readonly findOrganizationByInvitationId = db
    .select({
      id: invitations.id,
      organization: organizations,
      members: members,
    })
    .from(invitations)
    .where(and(eq(invitations.id, sql`${sql.placeholder('invitationId')}`)))
    .innerJoin(organizations, eq(invitations.organizationId, organizations.id))
    .innerJoin(members, eq(organizations.id, members.organizationId))
    .prepare('find_organization_by_invitation_id');
}

export const organizationPreparedStatement =
  OrganizationPreparedStatement.getInstance<OrganizationPreparedStatement>();
