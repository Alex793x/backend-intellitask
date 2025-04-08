import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

// ==================================================
// 👩‍⚖️ 👨‍⚖️ 👩‍⚖️ USERS 👩‍⚖️ 👨‍⚖️ 👩‍⚖️
// ==================================================

export const users = p.pgTable(
  'users',
  {
    id: p.text().notNull().primaryKey(),
    name: p.text().notNull(),
    email: p.text().unique().notNull(),
    emailVerified: p.boolean('email_verified').default(false),
    image: p.text().default(''),
    role: p.text().default('user'),
    banned: p.boolean('banned').default(false),
    banReason: p.text('ban_reason').default(''),
    banExpires: p.integer('ban_expires').default(0),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('users_email_idx').on(table.email)]
);

/**
 * export interface Member {
  id: string;
  organizationId: string;
  teamId: string;
  userId: string;
  role: string;
  createdAt: Date;
}
 */
export const sessions = p.pgTable(
  'sessions',
  {
    id: p.text().notNull().primaryKey(),
    token: p.text().notNull(),
    userId: p
      .text('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    activeOrganizationId: p.text('active_organization_id'),
    activeOrganizationMemberId: p.text('active_organization_member_id'),
    activeOrganizationMemberRole: p.text('active_organization_member_role'),
    impersonatedBy: p.text('impersonated_by').default(''),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    expiresAt: p.timestamp('expires_at').notNull(),
    ipAddress: p.text().notNull(),
    userAgent: p.text().notNull(),
  },
  (table) => [
    index('sessions_user_id_idx').on(table.userId),
    index('sessions_active_organization_id_idx').on(table.activeOrganizationId),
  ]
);

export const accounts = p.pgTable(
  'accounts',
  {
    id: p.text().notNull().primaryKey(),
    userId: p
      .text('user_id')
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }), // Id of account provided by SSO or equal to userId for credential accounts
    accountId: p.text('account_id').notNull(),
    providerId: p.text('provider_id').notNull(),
    accessToken: p.text('access_token'), // Access token of the account. Returned by the provider
    refreshToken: p.text('refresh_token'), // Refresh token of the account. Returned by the provider
    accessTokenExpiresAt: p.text('access_token_expires_at'), // Theitme when the access token expires
    refreshTokenExpiresAt: p.text('refresh_token_expires_at'), // Theitme when the refresh token expires
    scope: p.text(), // The scope of the account. Returned by the provider
    idToken: p.text('id_token'), // Id token returned from the provider
    password: p.text(), // Password of the account. Mainly used for email and password authentication
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('accounts_user_id_idx').on(table.userId)]
);

export const verifications = p.pgTable(
  'verifications',
  {
    id: p.text().notNull().primaryKey(),
    identifier: p.text().notNull(),
    value: p.text().notNull(),
    expiresAt: p.timestamp('expires_at').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('verifications_identifier_idx').on(table.identifier)]
);

// ==================================================
// 🏦 🏦 🏦 ORGANIZATIONS 🏦 🏦 🏦
// ==================================================

export const organizations = p.pgTable(
  'organizations',
  {
    id: p.text().notNull().primaryKey(),
    name: p.text().notNull(),
    slug: p.text().notNull().unique(),
    logo: p.text().default(''),
    metadata: p.text().default(''),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('organizations_name_idx').on(table.name)]
);

export const members = p.pgTable(
  'members',
  {
    id: p.text().notNull().primaryKey(),
    organizationId: p
      .text('organization_id')
      .notNull()
      .references(() => organizations.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    teamId: p.text('team_id').references(() => teams.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    userId: p.text('user_id').notNull(),
    role: p.text().notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('organizations_members_organization_id_idx').on(table.organizationId),
    index('organizations_members_usesr_id_idx').on(table.userId),
  ]
);

export const teams = p.pgTable(
  'teams',
  {
    id: p.text().notNull().primaryKey(),
    name: p.text().notNull(),
    organizationId: p
      .text('organization_id')
      .notNull()
      .references(() => organizations.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('teams_organization_id_idx').on(table.organizationId)]
);

export const teamMembersRelationTable = p.pgTable(
  'team_members_relation_table',
  {
    id: p.text().notNull().primaryKey(),
    teamId: p
      .text('team_id')
      .notNull()
      .references(() => teams.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    memberId: p
      .text('member_id')
      .notNull()
      .references(() => members.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    hasLeft: p.boolean('has_left').default(false),
    joinedAt: p.timestamp('joined_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('team_members_team_id_member_id_unique').on(table.teamId, table.memberId),
    index('team_members_team_id_idx').on(table.teamId),
    index('team_members_member_id_idx').on(table.memberId),
  ]
);

export const teamMemberRelation = relations(teamMembersRelationTable, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembersRelationTable.teamId],
    references: [teams.id],
  }),
  member: one(members, {
    fields: [teamMembersRelationTable.memberId],
    references: [members.id],
  }),
}));

export const invitations = p.pgTable(
  'invitations',
  {
    id: p.text().notNull().primaryKey(),
    inviterId: p.text('inviter_id').notNull(),
    organizationId: p
      .text('organization_id')
      .notNull()
      .references(() => organizations.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    teamId: p.text().references(() => teams.id, { onDelete: 'cascade' }),
    email: p.text().notNull(),
    status: p.text().notNull(),
    role: p.text().notNull(),
    expiresAt: p.timestamp('expires_at').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('invitations_organization_id_idx').on(table.organizationId),
    index('invitations_email_idx').on(table.email),
    index('invitations_inviter_id_idx').on(table.inviterId),
  ]
);

// ==================================================
// 🤖 🤖 🤖 AI USAGE CONTROL 🤖 🤖 🤖
// ==================================================

export const restrictedAiProviders = p.pgTable(
  'restricted_ai_providers',
  {
    id: p.uuid().defaultRandom(),
    organizationId: p.text('organization_id').notNull(),
    provider: p.text().notNull(), // example: openai, gemini
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('restricted_ai_provider_organization_id_idx').on(table.organizationId)]
);

export const restrictedAiBaseModels = p.pgTable(
  'restricted_ai_base_models',
  {
    id: p.uuid().defaultRandom(),
    organizationId: p.text('organization_id').notNull(),
    apiIdentifier: p.text('api_identifier').notNull(), // example: chatgpt-mini-4.0
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('restricted_ai_base_model_organization_id_idx').on(table.organizationId)]
);

export const restrictedOrganizationMembersAiBaseModels = p.pgTable(
  'restricted_organization_members_ai_base_models',
  {
    id: p.uuid().defaultRandom(),
    organizationId: p.text('organization_id').notNull(),
    memberId: p.text('member_id').notNull(),
    apiIdentifier: p.text('api_identifier').notNull(), // example: chatgpt-mini-4.0
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('restricted_organization_members_ai_base_models_organization_id_idx').on(
      table.organizationId
    ),
    index('restricted_organization_members_ai_base_models_member_id_idx').on(table.memberId),
  ]
);
