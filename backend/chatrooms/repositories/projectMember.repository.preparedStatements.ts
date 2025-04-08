import { eq, sql, and } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { projectMembers } from '../db/schema';

export class ProjectMemberPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(projectMembers)
    .where(eq(projectMembers.id, sql.placeholder('id')))
    .prepare('find_project_member_by_id');

  public readonly findAll = db.select().from(projectMembers).prepare('find_all_project_members');

  public readonly findManyByProjectId = db
    .select()
    .from(projectMembers)
    .where(eq(projectMembers.projectId, sql.placeholder('projectId')))
    .prepare('find_project_members_by_project_id');

  public readonly findByUserAndProject = db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, sql.placeholder('projectId')),
        eq(projectMembers.userId, sql.placeholder('userId'))
      )
    )
    .prepare('find_project_member_by_user_and_project');

  public readonly createOne = db
    .insert(projectMembers)
    .values({
      projectId: sql`${sql.placeholder('projectId')}`,
      userId: sql`${sql.placeholder('userId')}`,
      role: sql`${sql.placeholder('role')}`,
      invitedByUserId: sql`${sql.placeholder('invitedByUserId')}`,
    })
    .returning()
    .prepare('create_project_member');

  public readonly updateOne = db
    .update(projectMembers)
    .set({
      role: sql`${sql.placeholder('role')}`,
      hasLeft: sql`${sql.placeholder('hasLeft')}`,
    })
    .where(
      and(
        eq(projectMembers.id, sql`${sql.placeholder('id')}`),
        eq(projectMembers.projectId, sql`${sql.placeholder('projectId')}`)
      )
    )
    .returning()
    .prepare('update_project_member');

  public readonly deleteOne = db
    .delete(projectMembers)
    .where(
      and(
        eq(projectMembers.id, sql.placeholder('id')),
        eq(projectMembers.projectId, sql.placeholder('projectId'))
      )
    )
    .returning()
    .prepare('delete_project_member');
}

export const projectMemberPreparedStatements =
  ProjectMemberPreparedStatements.getInstance<ProjectMemberPreparedStatements>();
