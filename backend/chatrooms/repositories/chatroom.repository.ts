import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { db } from '../db/db';
import { Chatroom, ChatroomDto, ChatroomRequest } from '../types';
import {
  chatroomPreparedStatements,
  ChatroomPreparedStatements,
} from './chatroom.repository.preparedStatements';
import { eq, inArray } from 'drizzle-orm';
import { chatrooms } from '../db/schema';

export class ChatroomRepository extends BaseRepository<Chatroom, ChatroomRequest> {
  protected constructor(private readonly preparedStatements: ChatroomPreparedStatements) {
    super();
  }

  public override findOne(id: string, organizationId?: string): Promise<Chatroom> {
    return withErrorHandling(async () => {
      const chatroom = await this.preparedStatements.findOne.execute({ id });

      if (!chatroom) {
        throw APIError.notFound('Chatroom not found');
      }

      // If organizationId is provided, verify the chatroom belongs to that organization
      if (organizationId && chatroom.organizations) {
        if (chatroom.organizations.organizationId !== organizationId) {
          throw APIError.notFound('Chatroom not found in this organization');
        }
      }

      return chatroom as Chatroom;
    }, 'Error finding chatroom');
  }

  findAll(organizationId?: string): Promise<Chatroom[]> {
    return withErrorHandling(async () => {
      const allChatrooms = await this.preparedStatements.findAll.execute();

      // Filter by organization if provided
      if (organizationId) {
        return allChatrooms.filter(
          (chatroom) =>
            chatroom.organizations && chatroom.organizations.organizationId === organizationId
        ) as Chatroom[];
      }

      return allChatrooms as Chatroom[];
    }, 'Error finding all chatrooms');
  }

  findParticipatingChatrooms(userId: string, organizationId: string): Promise<Chatroom[]> {
    return withErrorHandling(async () => {
      const allChatrooms = await this.preparedStatements.findParticipatingChatrooms.execute({
        userId,
      });

      // Filter chatrooms by organization
      const chatrooms = allChatrooms.filter(
        (chatroom) =>
          chatroom.organizations && chatroom.organizations.organizationId === organizationId
      );

      return chatrooms as Chatroom[];
    }, 'Error finding participating chatrooms');
  }

  createOne(item: ChatroomRequest, organizationId?: string): Promise<Chatroom> {
    return withErrorHandling(async () => {
      return await db.transaction(async () => {
        const [created] = await this.preparedStatements.createOne.execute({
          chatroomCreatorId: item.chatroomCreatorId,
          name: item.name || 'New Chat Conversation',
          projectId: item.projectId,
          isPrivate: item.isPrivate,
          type: item.type,
        });

        if (!created) {
          throw new Error('Failed to create chatroom');
        }

        const createdChatroom = await this.findOne(created.id, organizationId);
        return createdChatroom as Chatroom;
      });
    }, 'Error creating chatroom');
  }

  createChatroomOrganizationRelation(chatroomId: string, organizationId: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.createChatroomOrganizationRelation.execute({
        chatroomId,
        organizationId,
      });
    }, 'Error creating chatroom organization relation');
  }

  findByIds(chatroomIds: string[], organizationId?: string): Promise<Chatroom[]> {
    return withErrorHandling(async () => {
      const foundChatrooms = await db.query.chatrooms.findMany({
        where: inArray(chatrooms.id, chatroomIds),
        with: {
          members: true,
          organizations: true,
        },
      });

      // Filter by organization if provided
      if (organizationId) {
        return foundChatrooms.filter(
          (chatroom) =>
            chatroom.organizations && chatroom.organizations.organizationId === organizationId
        ) as Chatroom[];
      }

      return foundChatrooms as Chatroom[];
    }, 'Error finding chatrooms by ids');
  }

  findByProjectId(projectId: string, organizationId?: string): Promise<Chatroom[]> {
    return withErrorHandling(async () => {
      const foundChatrooms = await db.query.chatrooms.findMany({
        where: eq(chatrooms.projectId, projectId),
        with: {
          members: true,
          organizations: true,
        },
      });

      // Filter by organization if provided
      if (organizationId) {
        return foundChatrooms.filter(
          (chatroom) =>
            chatroom.organizations && chatroom.organizations.organizationId === organizationId
        ) as Chatroom[];
      }

      return foundChatrooms as Chatroom[];
    }, 'Error finding chatrooms by project id');
  }

  updateOne(id: string, chatroomData: ChatroomRequest): Promise<void> {
    return withErrorHandling(async () => {
      const foundChatroom = await this.findOne(id);

      if (!foundChatroom) {
        throw APIError.notFound('Chatroom not found');
      }

      await this.preparedStatements.updateOne.execute({
        ...chatroomData,
        id,
      });
    }, 'Error updating chatroom');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deletedChatroom] = await this.preparedStatements.deleteOne.execute({ id });
      if (!deletedChatroom) {
        throw APIError.notFound('Chatroom not found');
      }
    }, 'Error deleting chatroom');
  }
}

export const chatroomRepository = ChatroomRepository.getInstance<ChatroomRepository>(
  chatroomPreparedStatements
);
