import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { db } from '../db/db';
import { chatroomMembers } from '../db/schema';
import { ChatroomMember, ChatroomMemberRequest } from '../types';
import {
  chatroomMemberPreparedStatements,
  ChatroomMemberPreparedStatements,
} from './chatroomMember.repository.preparedStatements';

export class ChatroomMemberRepository extends BaseRepository<
  ChatroomMember,
  ChatroomMemberRequest
> {
  private constructor(private readonly preparedStatements: ChatroomMemberPreparedStatements) {
    super();
  }
  findOne(id: string): Promise<ChatroomMember> {
    return withErrorHandling(async () => {
      const [chatroomMember] = await this.preparedStatements.findOne.execute({ id });
      return chatroomMember as ChatroomMember;
    }, 'Error finding chatroom member');
  }

  findAll(): Promise<ChatroomMember[]> {
    return withErrorHandling(async () => {
      const chatroomMembers = await this.preparedStatements.findAll.execute();
      return chatroomMembers as ChatroomMember[];
    }, 'Error finding all chatroom members');
  }

  createOne(item: ChatroomMemberRequest): Promise<ChatroomMember> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        chatroomId: item.chatroomId,
        userId: item.userId,
      });

      if (!created) {
        throw new Error('Failed to create chatroom member');
      }

      return created as ChatroomMember;
    }, 'Error creating chatroom member');
  }

  createMany(items: ChatroomMemberRequest[]): Promise<ChatroomMember[]> {
    return withErrorHandling(async () => {
      const createdChatroomMembers = await db
        .insert(chatroomMembers)
        .values(items)
        .returning()
        .execute();

      return createdChatroomMembers as ChatroomMember[];
    }, 'Error creating chatroom members');
  }

  updateOne(memberId: string, item: Partial<ChatroomMemberRequest>): Promise<void> {
    return withErrorHandling(async () => {
      const foundChatroomMember = await this.findOne(memberId);

      if (!foundChatroomMember) {
        throw APIError.notFound('Chatroom member not found');
      }

      const [updated] = await this.preparedStatements.updateOne.execute({
        id: memberId,
        role: item.role || foundChatroomMember.role,
        hasLeft: item.hasLeft || foundChatroomMember.hasLeft,
      });

      if (!updated) {
        throw APIError.internal('Failed to update chatroom member');
      }
    }, 'Error updating chatroom member');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deleted] = await this.preparedStatements.deleteOne.execute({ id });

      if (!deleted) {
        throw APIError.internal('Failed to delete chatroom member');
      }
    }, 'Error deleting chatroom');
  }
}

export const chatroomMemberRepository =
  ChatroomMemberRepository.getInstance<ChatroomMemberRepository>(chatroomMemberPreparedStatements);
