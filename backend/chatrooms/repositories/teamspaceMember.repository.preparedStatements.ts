import { eq, sql, and } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { teamspaceMembers } from '../db/schema';

export class TeamspaceMemberPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(teamspaceMembers)
    .where(eq(teamspaceMembers.id, sql.placeholder('id')))
    .prepare('find_teamspace_member_by_id');

  public readonly findAll = db
    .select()
    .from(teamspaceMembers)
    .prepare('find_all_teamspace_members');

  public readonly findManyByTeamspaceId = db
    .select()
    .from(teamspaceMembers)
    .where(eq(teamspaceMembers.teamspaceId, sql.placeholder('teamspaceId')))
    .prepare('find_teamspace_members_by_teamspace_id');

  public readonly findByUserAndTeamspace = db
    .select()
    .from(teamspaceMembers)
    .where(
      and(
        eq(teamspaceMembers.teamspaceId, sql.placeholder('teamspaceId')),
        eq(teamspaceMembers.userId, sql.placeholder('userId'))
      )
    )
    .prepare('find_teamspace_member_by_user_and_teamspace');

  public readonly createOne = db
    .insert(teamspaceMembers)
    .values({
      teamspaceId: sql`${sql.placeholder('teamspaceId')}`,
      userId: sql`${sql.placeholder('userId')}`,
      role: sql`${sql.placeholder('role')}`,
      invitedByUserId: sql`${sql.placeholder('invitedByUserId')}`,
    })
    .returning()
    .prepare('create_teamspace_member');

  public readonly updateOne = db
    .update(teamspaceMembers)
    .set({
      role: sql`${sql.placeholder('role')}`,
      hasLeft: sql`${sql.placeholder('hasLeft')}`,
    })
    .where(eq(teamspaceMembers.id, sql.placeholder('id')))
    .returning()
    .prepare('update_teamspace_member');

  public readonly deleteOne = db
    .delete(teamspaceMembers)
    .where(eq(teamspaceMembers.id, sql.placeholder('id')))
    .returning()
    .prepare('delete_teamspace_member');
}

export const teamspaceMemberPreparedStatements =
  TeamspaceMemberPreparedStatements.getInstance<TeamspaceMemberPreparedStatements>();
