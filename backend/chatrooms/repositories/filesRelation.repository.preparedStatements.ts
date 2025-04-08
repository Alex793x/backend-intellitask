import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { chatroomFiles, teamspaceFiles, projectFiles } from '../db/schema';
import { sql, eq } from 'drizzle-orm';

export class FilesRelationPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  /**
   * ///////////////////////
   * Create Files Relations
   * ///////////////////////
   */
  public readonly createOneTeamspaceFile = db
    .insert(teamspaceFiles)
    .values({
      fileId: sql`${sql.placeholder('fileId')}`,
      teamspaceId: sql`${sql.placeholder('teamspaceId')}`,
    })
    .returning()
    .prepare('create_teamspace_file');

  public readonly createOneProjectFile = db
    .insert(projectFiles)
    .values({
      fileId: sql`${sql.placeholder('fileId')}`,
      projectId: sql`${sql.placeholder('projectId')}`,
    })
    .returning()
    .prepare('create_project_file');

  public readonly createOneChatroomFile = db
    .insert(chatroomFiles)
    .values({
      fileId: sql`${sql.placeholder('fileId')}`,
      chatroomId: sql`${sql.placeholder('chatroomId')}`,
    })
    .returning()
    .prepare('create_chatroom_file');

  /**
   * ///////////////////////
   * Find Files Relations
   * ///////////////////////
   */

  public readonly findOneTeamspaceFileByFileId = db
    .select()
    .from(teamspaceFiles)
    .where(eq(teamspaceFiles.fileId, sql.placeholder('fileId')))
    .prepare('find_one_teamspace_file_by_file_id');

  public readonly findAllByTeamspaceId = db
    .select()
    .from(teamspaceFiles)
    .where(eq(teamspaceFiles.teamspaceId, sql.placeholder('teamspaceId')))
    .prepare('find_all_by_teamspace_id');

  public readonly findOneProjectFileByFileId = db
    .select()
    .from(projectFiles)
    .where(eq(projectFiles.fileId, sql.placeholder('fileId')))
    .prepare('find_one_project_file_by_file_id');

  public readonly findAllByProjectId = db
    .select()
    .from(projectFiles)
    .where(eq(projectFiles.projectId, sql.placeholder('projectId')))
    .prepare('find_all_by_project_id');

  public readonly findOneChatroomFileByFileId = db
    .select()
    .from(chatroomFiles)
    .where(eq(chatroomFiles.fileId, sql.placeholder('fileId')))
    .prepare('find_one_chatroom_file_by_file_id');

  public readonly findAllByChatroomId = db
    .select()
    .from(chatroomFiles)
    .where(eq(chatroomFiles.chatroomId, sql.placeholder('chatroomId')))
    .prepare('find_all_by_chatroom_id');

  /**
   * ///////////////////////
   * Delete Files Relations
   * ///////////////////////
   */

  public readonly deleteOneTeamspaceFile = db
    .delete(teamspaceFiles)
    .where(eq(teamspaceFiles.fileId, sql.placeholder('fileId')))
    .returning()
    .prepare('delete_teamspace_file');

  public readonly deleteOneProjectFile = db
    .delete(projectFiles)
    .where(eq(projectFiles.fileId, sql.placeholder('fileId')))
    .returning()
    .prepare('delete_project_file');

  public readonly deleteOneChatroomFile = db
    .delete(chatroomFiles)
    .where(eq(chatroomFiles.fileId, sql.placeholder('fileId')))
    .returning()
    .prepare('delete_chatroom_file');
}

export const filesRelationPreparedStatements =
  FilesRelationPreparedStatements.getInstance<FilesRelationPreparedStatements>();
