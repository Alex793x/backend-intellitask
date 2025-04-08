import { and, eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { files } from '../db/schema';

export class FileManagementPreparedStatements extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db.query.files
    .findFirst({
      where: (files, { eq, and }) =>
        and(
          eq(files.id, sql.placeholder('id')),
          eq(files.organizationId, sql.placeholder('organizationId'))
        ),
      with: {
        allowedAccess: true,
      },
    })
    .prepare('find_file_by_id');

  public readonly findAll = db.query.files
    .findMany({
      where: (files, { eq, and }) =>
        and(eq(files.organizationId, sql.placeholder('organizationId'))),
      with: {
        allowedAccess: true,
      },
    })
    .prepare('find_all_files');

  public readonly createOne = db
    .insert(files)
    .values({
      organizationId: sql`${sql.placeholder('organizationId')}`,
      uploadType: sql`${sql.placeholder('uploadType')}`,
      fileType: sql`${sql.placeholder('fileType')}`,
      fileName: sql`${sql.placeholder('fileName')}`,
      fileSize: sql`${sql.placeholder('fileSize')}`,
      uploadedByUserId: sql`${sql.placeholder('uploadedByUserId')}`,
      fileUrl: sql`${sql.placeholder('fileUrl')}`,
    })
    .returning()
    .prepare('create_file');

  public readonly deleteOne = db
    .delete(files)
    .where(
      and(
        eq(files.id, sql.placeholder('id')),
        eq(files.organizationId, sql.placeholder('organizationId'))
      )
    )
    .returning()
    .prepare('delete_file');
}

const fileManagementPreparedStatements =
  FileManagementPreparedStatements.getInstance<FileManagementPreparedStatements>();
export default fileManagementPreparedStatements;
