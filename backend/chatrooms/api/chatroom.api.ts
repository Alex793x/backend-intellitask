import { api, APIError } from 'encore.dev/api';
import { chatroomService } from '../services/chatroom.service';
import { ChatroomDto, ChatroomRequest } from '../types';
import { GenericResponse } from '../../shared/types';
import { getAuthData } from '~encore/auth';

/**
 * This API endpoint is used to create a chatroom.
 */
export const createChatroom = api<ChatroomRequest, Promise<GenericResponse<ChatroomDto>>>(
  { expose: true, method: 'POST', path: '/chatrooms', auth: true },
  async (req): Promise<GenericResponse<ChatroomDto>> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    const createdChatroom = await chatroomService.createOne(req, session.activeOrganizationId);
    await chatroomService.createChatroomOrganizationRelation(
      createdChatroom.id,
      session.activeOrganizationId
    );

    return { data: createdChatroom };
  }
);

/**
 * This API endpoint is used to get all chatrooms for testing purposes.
 * TODO: SECURITY - This endpoint should be removed or properly secured in production
 */
export const getChatrooms = api(
  { expose: false, method: 'GET', path: '/chatrooms', auth: false },
  async (): Promise<GenericResponse<ChatroomDto[]>> => {
    // Since this is for testing purposes, we keep it as is
    // In a real scenario, we would require authentication and filter by organization
    return { data: await chatroomService.findAll() };
  }
);

/**
 * This API endpoint is used to get participating chatrooms
 */
export const getParticipatingChatroomsWithLatestMessages = api(
  {
    expose: true,
    method: 'GET',
    path: '/chatrooms/participating',
    auth: true,
  },
  async (): Promise<GenericResponse<ChatroomDto[]>> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    let chatrooms = await chatroomService.findParticipatingChatroomsWithLatestMessages(
      userID,
      session.activeOrganizationId
    );

    chatrooms = chatrooms.filter((chatroom) =>
      chatroom.members.some((member) => member.user.id === userID && !member.hasLeft)
    );

    return {
      data: chatrooms,
    };
  }
);

/**
 * This API endpoint is used to get a chatroom by ID.
 */
export const getChatroom = api(
  { expose: true, method: 'GET', path: '/chatrooms/:id', auth: true },
  async (params: { id: string }): Promise<GenericResponse<ChatroomDto>> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    const foundChatroom = await chatroomService.findOne(params.id, session.activeOrganizationId);
    if (foundChatroom.members.some((member) => member.user.id === userID && !member.hasLeft)) {
      return { data: foundChatroom };
    }

    throw APIError.permissionDenied('You are not a member of this chatroom');
  }
);

/**
 * This API endpoint is used to update a chatroom.
 */
export const updateChatroom = api<ChatroomRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/chatrooms/:id', auth: true },
  async ({ id, ...data }): Promise<void> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    // Validate that the user has ADMIN or MANAGER role
    await chatroomService.validateChatroomAccess(
      id,
      userID,
      ['ADMIN', 'MANAGER'],
      session.activeOrganizationId
    );
    await chatroomService.updateOne(id, data);
  }
);

/**
 * This API endpoint is used to delete a chatroom.
 */
export const deleteChatroom = api(
  { expose: true, method: 'DELETE', path: '/chatrooms/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    // Validate that the user has ADMIN or MANAGER role
    await chatroomService.validateChatroomAccess(
      params.id,
      userID,
      ['ADMIN'],
      session.activeOrganizationId
    );
    await chatroomService.deleteOne(params.id);
  }
);
