import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { index, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const accessEnum = pgEnum('access', ['NONE', 'VIEW', 'EDIT']);

export const uploadTypeEnum = pgEnum('upload_type', ['DOCUMENT', 'MEDIA']);

export const fileTypeEnum = pgEnum('file_type', [
  'AUDIO',
  'CODE',
  'DOCUMENT',
  'FILE',
  'HTML',
  'JSON',
  'IMAGE',
  'MARKDOWN',
  'PDF',
  'PRESENTATION',
  'SPREADSHEET',
  'VIDEO',
  'UNKNOWN',
]);

// Files table
export const files = p.pgTable(
  'files',
  {
    id: p.uuid('id').primaryKey().notNull().defaultRandom(),
    uploadedByUserId: p.text('uploaded_by_user_id').notNull(),
    organizationId: p.text('organization_id').notNull(),
    uploadType: uploadTypeEnum('upload_type').notNull(),
    fileType: fileTypeEnum('file_type').notNull(),
    fileName: p.varchar('file_name', { length: 255 }).notNull(),
    fileUrl: p.varchar('file_url', { length: 2048 }).notNull(),
    fileSize: p.integer('file_size').notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // Index for organization lookup (most common high-level filter)
    index('organization_idx').on(table.organizationId),

    // Composite index for filename search within organization context
    // This helps when searching for files by name within an organization
    index('org_filename_idx').on(table.organizationId, table.fileName),
  ]
);

// AllowedUserAccess table
export const allowedUserAccess = p.pgTable(
  'allowed_user_access',
  {
    id: p.uuid('id').primaryKey().notNull().defaultRandom(),
    fileId: p
      .uuid('file_id')
      .notNull()
      .references(() => files.id, { onDelete: 'cascade' }),
    userId: p.text('user_id').notNull(),
    access: accessEnum('access').notNull(),
    createdAt: p.timestamp('created_at').notNull().defaultNow(),
    updatedAt: p
      .timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('file_id_idx').on(table.fileId),
    index('user_id_idx').on(table.userId),
    p.uniqueIndex('user_file_access_unique').on(table.fileId, table.userId),
  ]
);

// Relations
export const filesRelations = relations(files, ({ many }) => ({
  allowedAccess: many(allowedUserAccess),
}));

export const allowedUserAccessRelations = relations(allowedUserAccess, ({ one }) => ({
  file: one(files, {
    fields: [allowedUserAccess.fileId],
    references: [files.id],
  }),
}));
