import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { index, pgEnum, unique } from 'drizzle-orm/pg-core';

export const chatroomTypes = pgEnum('chatroom_types', [
  'CHATROOM', // chatroom for group chat
  'PROJECT_CHATROOM', // chatroom for project
  'AGENT_CONFIG_SPACE', // chatroom for AI agent configuration
]);

export const chatroomRoles = pgEnum('chatroom_roles', [
  'ADMIN', // chatroom admin
  'MANAGER', // chatroom manager
  'PROMPT_AIS', // AI prompter
  'WRITE', // write access
  'READ', // read access
]);

// More specific roles for teamspace and project access
export const memberRoles = pgEnum('member_roles', [
  'OWNER', // Full control, can delete teamspace/project
  'ADMIN', // Administrative access, can manage members
  'CONTRIBUTOR', // Can create and edit content
  'VIEWER', // Read-only access
]);

// teamspace and project hierarchy enums and tables
export const teamspaces = p.pgTable('teamspaces', {
  id: p.uuid().defaultRandom().primaryKey(),
  name: p.text().notNull(),
  description: p.text().default(''),
  context: p.text().default(''),
  creatorId: p.text('creator_id').notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// teamspace members table for access control
export const teamspaceMembers = p.pgTable(
  'teamspace_members',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    teamspaceId: p
      .uuid('teamspace_id')
      .notNull()
      .references(() => teamspaces.id, { onDelete: 'cascade' }),
    userId: p.text('user_id').notNull(),
    role: memberRoles().notNull().default('CONTRIBUTOR'),
    invitedByUserId: p.text('invited_by').notNull(),
    hasLeft: p.boolean('has_left').default(false).notNull(),
    joinedAt: p.timestamp('joined_at').defaultNow().notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('teamspace_member_teamspace_idx').on(table.teamspaceId),
    index('teamspace_member_user_idx').on(table.userId),
    unique().on(table.teamspaceId, table.userId),
  ]
);

// Files storage at teamspace level
export const teamspaceFiles = p.pgTable(
  'teamspace_files',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    teamspaceId: p
      .uuid('teamspace_id')
      .notNull()
      .references(() => teamspaces.id, { onDelete: 'cascade' }),
    fileId: p.uuid('file_id').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('teamspace_files_teamspace_idx').on(table.teamspaceId),
    unique().on(table.teamspaceId, table.fileId),
  ]
);

export const projects = p.pgTable(
  'projects',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    teamspaceId: p
      .uuid('teamspace_id')
      .notNull()
      .references(() => teamspaces.id, { onDelete: 'cascade' }),
    name: p.text().notNull(),
    context: p.text().default(''),
    description: p.text().default(''),
    creatorId: p.text('creator_id').notNull(),
    isPrivate: p.boolean('is_private').default(false).notNull(), // Controls if teamspace members automatically get access
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('project_teamspace_idx').on(table.teamspaceId),
    unique().on(table.teamspaceId, table.name),
  ]
);

// Project members table for access control
export const projectMembers = p.pgTable(
  'project_members',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    projectId: p
      .uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    userId: p.text('user_id').notNull(),
    role: memberRoles().notNull().default('CONTRIBUTOR'),
    invitedByUserId: p.text('invited_by_user_id').notNull(),
    hasLeft: p.boolean('has_left').default(false).notNull(),
    joinedAt: p.timestamp('joined_at').defaultNow().notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('project_member_project_idx').on(table.projectId),
    index('project_member_user_idx').on(table.userId),
    unique().on(table.projectId, table.userId),
  ]
);

export const projectFiles = p.pgTable(
  'project_files',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    projectId: p
      .uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    fileId: p.uuid('file_id').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('project_files_project_idx').on(table.projectId),
    unique().on(table.projectId, table.fileId),
  ]
);

export const organizationTeamspacesRelations = p.pgTable(
  'organization_teamspaces_relations',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    teamspaceId: p.uuid('teamspace_id').references(() => teamspaces.id, { onDelete: 'cascade' }),
    organizationId: p.text('organization_id'),
  },
  (table) => [index('organization_teamspaces_relation_id_idx').on(table.organizationId)]
);

export const chatrooms = p.pgTable('chatrooms', {
  id: p.uuid().defaultRandom().primaryKey(),
  type: chatroomTypes().notNull().default('CHATROOM'),
  chatroomCreatorId: p.text('chatroom_creator_id').notNull(),
  name: p.text().notNull(),
  // Add project reference
  projectId: p.uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  isPrivate: p.boolean('is_private').default(false).notNull(), // Controls if project members automatically get access
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const chatroomFiles = p.pgTable(
  'chatroom_files',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    chatroomId: p.uuid('chatroom_id').references(() => chatrooms.id, { onDelete: 'cascade' }),
    fileId: p.uuid('file_id').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('chatroom_files_chatroom_idx').on(table.chatroomId),
    unique().on(table.chatroomId, table.fileId),
  ]
);

export const organizationChatroomsRelations = p.pgTable(
  'organization_chatrooms_relations',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    chatroomId: p.uuid('chatroom_id').references(() => chatrooms.id, { onDelete: 'cascade' }),
    organizationId: p.text('organization_id'),
  },
  (table) => [index('organization_chatrooms_relation_id_idx').on(table.organizationId)]
);

export const chatroomMembers = p.pgTable(
  'chatroom_members',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    chatroomId: p
      .uuid('chatroom_id')
      .notNull()
      .references(() => chatrooms.id, { onDelete: 'cascade' }),
    userId: p.text('user_id').notNull(),
    role: chatroomRoles().notNull().default('WRITE'),
    hasLeft: p.boolean('has_left').default(false).notNull(),
    joinedAt: p.timestamp('joined_at').defaultNow().notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('chatroom_id_idx').on(table.chatroomId)]
);


// Add teamspace and project relations
export const teamspaceRelations = relations(teamspaces, ({ many, one }) => ({
  projects: many(projects),
  members: many(teamspaceMembers),
  files: many(teamspaceFiles),
  organizations: one(organizationTeamspacesRelations, {
    fields: [teamspaces.id],
    references: [organizationTeamspacesRelations.teamspaceId],
    relationName: 'teamspaceOrganizations',
  }),
}));

export const teamspaceMemberRelations = relations(teamspaceMembers, ({ one }) => ({
  teamspace: one(teamspaces, {
    fields: [teamspaceMembers.teamspaceId],
    references: [teamspaces.id],
  }),
}));

export const teamspaceFileRelations = relations(teamspaceFiles, ({ one, many }) => ({
  // Each file belongs to a teamspace
  teamspace: one(teamspaces, {
    fields: [teamspaceFiles.teamspaceId],
    references: [teamspaces.id],
  }),
  // Files can be shared with projects
  sharedWithProjects: many(projectFiles, { relationName: 'fileProjects' }),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  // Each project belongs to a teamspace
  teamspace: one(teamspaces, {
    fields: [projects.teamspaceId],
    references: [teamspaces.id],
  }),
  // A project can have many chatrooms
  chatrooms: many(chatrooms, { relationName: 'projectChatrooms' }),
  // A project can have many members
  members: many(projectMembers),
  // A project can have many files through the junction table
  files: many(projectFiles, { relationName: 'projectFiles' }),
}));

export const projectMemberRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
}));

export const projectFileRelations = relations(projectFiles, ({ one }) => ({
  // Each project file belongs to a project
  project: one(projects, {
    fields: [projectFiles.projectId],
    references: [projects.id],
    relationName: 'projectFiles',
  }),
  // Reference to the file in teamspaceFiles
  file: one(teamspaceFiles, {
    fields: [projectFiles.fileId],
    references: [teamspaceFiles.id],
    relationName: 'fileProjects',
  }),
}));

export const organizationTeamspaceRelations = relations(
  organizationTeamspacesRelations,
  ({ one }) => ({
    teamspace: one(teamspaces, {
      fields: [organizationTeamspacesRelations.teamspaceId],
      references: [teamspaces.id],
      relationName: 'teamspaceOrganizations',
    }),
  })
);

export const chatroomRelations = relations(chatrooms, ({ one, many }) => ({
  // A chatroom can optionally belong to a project
  project: one(projects, {
    fields: [chatrooms.projectId],
    references: [projects.id],
    relationName: 'projectChatrooms',
  }),
  // A chatroom can have many members
  members: many(chatroomMembers),
  // A chatroom can have many files
  files: many(chatroomFiles),
  organizations: one(organizationChatroomsRelations, {
    fields: [chatrooms.id],
    references: [organizationChatroomsRelations.chatroomId],
    relationName: 'chatroomOrganizations',
  }),
}));

export const chatroomMemberRelations = relations(chatroomMembers, ({ one }) => ({
  // Each chatroom member belongs to a chatroom
  chatroom: one(chatrooms, {
    fields: [chatroomMembers.chatroomId],
    references: [chatrooms.id],
  }),
}));

export const chatroomFileRelations = relations(chatroomFiles, ({ one }) => ({
  // Each chatroom file belongs to a chatroom
  chatroom: one(chatrooms, {
    fields: [chatroomFiles.chatroomId],
    references: [chatrooms.id],
  }),
  // This assumes fileId references an existing file ID
  // If it references teamspaceFiles, add that relation here
}));
