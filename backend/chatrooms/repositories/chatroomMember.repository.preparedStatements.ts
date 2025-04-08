import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { chatroomMembers } from '../db/schema';

export class ChatroomMemberPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(chatroomMembers)
    .where(eq(chatroomMembers.id, sql.placeholder('id')))
    .prepare('find_chatroom_member_by_id');

  public readonly findAll = db.select().from(chatroomMembers).prepare('find_all_chatroom_members');

  // This is unused in the repository
  public readonly findManyByChatroomId = db.query.chatroomMembers
    .findMany({
      where: eq(chatroomMembers.chatroomId, sql.placeholder('chatroomId')),
    })
    .prepare('find_chatroom_members_by_chatroomId');

  public readonly createOne = db
    .insert(chatroomMembers)
    .values({
      chatroomId: sql`${sql.placeholder('chatroomId')}`,
      userId: sql`${sql.placeholder('userId')}`,
      role: sql`${sql.placeholder('role')}`,
    })
    .returning()
    .prepare('create_chatroom_member');

  public readonly updateOne = db
    .update(chatroomMembers)
    .set({
      role: sql`${sql.placeholder('role')}`,
      hasLeft: sql`${sql.placeholder('hasLeft')}`,
    })
    .where(eq(chatroomMembers.id, sql.placeholder('id')))
    .returning()
    .prepare('update_chatroom_member');

  public readonly deleteOne = db
    .delete(chatroomMembers)
    .where(eq(chatroomMembers.id, sql.placeholder('id')))
    .returning()
    .prepare('delete_chatroom_member');
}

export const chatroomMemberPreparedStatements =
  ChatroomMemberPreparedStatements.getInstance<ChatroomMemberPreparedStatements>();
