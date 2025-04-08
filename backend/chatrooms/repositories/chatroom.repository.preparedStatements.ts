import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { chatrooms, organizationChatroomsRelations } from '../db/schema';

export class ChatroomPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  // Find a chatroom by its ID
  public readonly findOne = db.query.chatrooms
    .findFirst({
      with: {
        members: true,
        organizations: true,
      },
      where: (chatrooms, { eq }) => eq(chatrooms.id, sql.placeholder('id')),
    })
    .prepare('find_chatroom_by_id');

  public readonly findAll = db.query.chatrooms
    .findMany({
      with: {
        members: true,
        organizations: true,
      },
    })
    .prepare('find_all_chatrooms');

  public readonly findParticipatingChatrooms = db.query.chatrooms
    .findMany({
      with: {
        members: true,
        organizations: true,
      },
      where: (chatrooms, { isNull }) => isNull(chatrooms.projectId),
    })
    .prepare('find_participating_chatrooms');

  public readonly createOne = db
    .insert(chatrooms)
    .values({
      chatroomCreatorId: sql`${sql.placeholder('chatroomCreatorId')}`,
      name: sql`${sql.placeholder('name')}`,
      type: sql`${sql.placeholder('type')}`,
      projectId: sql`${sql.placeholder('projectId')}`,
      isPrivate: sql`${sql.placeholder('isPrivate')}`,
    })
    .returning()
    .prepare('create_chatroom');

  public readonly createChatroomOrganizationRelation = db
    .insert(organizationChatroomsRelations)
    .values({
      chatroomId: sql`${sql.placeholder('chatroomId')}`,
      organizationId: sql`${sql.placeholder('organizationId')}`,
    })
    .prepare('create_chatroom_organization_relation');

  // TODO: READ AND UNDERSTAND INTERPOLATION OF THIS SQL QUERY
  public readonly updateOne = db
    .update(chatrooms)
    .set({
      name: sql`${sql.placeholder('name')}`,
      type: sql`${sql.placeholder('type')}`,
    })
    .where(eq(chatrooms.id, sql.placeholder('id')))
    .returning()
    .prepare('update_chatroom');

  public readonly deleteOne = db
    .delete(chatrooms)
    .where(eq(chatrooms.id, sql.placeholder('id')))
    .returning()
    .prepare('delete_chatroom');
}

export const chatroomPreparedStatements =
  ChatroomPreparedStatements.getInstance<ChatroomPreparedStatements>();
