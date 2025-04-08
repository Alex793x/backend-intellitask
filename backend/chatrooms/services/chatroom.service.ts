import { BaseService } from '../../shared/base/baseService';
import { chatroomRepository, ChatroomRepository } from '../repositories/chatroom.repository';
import { Chatroom, ChatroomDto, ChatroomRequest } from '../types';
import { mapChatroomMemberToMemberWithUserDto } from '../utils/chatroom.mapper';
import { chatroomMemberService, ChatroomMemberService } from './chatroomMember.service';
import { auth, fileManagement } from '~encore/clients';
import { APIError } from 'encore.dev/api';

export class ChatroomService extends BaseService<Chatroom, ChatroomRequest, ChatroomDto> {
  private constructor(
    protected readonly repository: ChatroomRepository,
    private readonly chatroomMemberService: ChatroomMemberService
  ) {
    super(repository);
  }

  /**
   * Transforms a Chatroom entity to a ChatroomDto by fetching user information
   */
  protected override async transformEntity(chatroom: Chatroom): Promise<ChatroomDto> {
    const userIds = chatroom.members.map((member) => member.userId);
    const fileIds = chatroom.files?.map((file) => file.id) || [];
    const usersData = await auth.getUsersByIds({ userIds: userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    let fileMap = new Map();
    if (fileIds.length > 0) {
      const filesData = await fileManagement.getFilesByIds({ fileIds });
      fileMap = new Map(filesData.data.map((file) => [file.id, file]));
    }

    const membersWithUsers = chatroom.members.map((member) =>
      mapChatroomMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
    );
    return {
      ...chatroom,
      members: membersWithUsers,
      files: chatroom.files?.map((file) => fileMap.get(file.id) || file) || [],
      messages: [],
      agents: [],
    } as ChatroomDto;
  }

  protected override async transformEntities(chatrooms: Chatroom[]): Promise<ChatroomDto[]> {
    const userIds = chatrooms.flatMap((chatroom) =>
      chatroom.members.map((member) => member.userId)
    );
    const fileIds = chatrooms.flatMap((chatroom) => chatroom.files?.map((file) => file.id) || []);

    const usersData = await auth.getUsersByIds({ userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    let fileMap = new Map();
    if (fileIds.length > 0) {
      const filesData = await fileManagement.getFilesByIds({ fileIds });
      fileMap = new Map(filesData.data.map((file) => [file.id, file]));
    }

    const membersWithUsers = chatrooms.flatMap((chatroom) =>
      chatroom.members.map((member) =>
        mapChatroomMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
      )
    );

    const chatroomMessagesMap = new Map();
    // const chatroomAgentsMap = new Map();


    return chatrooms.map((chatroom) => ({
      ...chatroom,
      members: membersWithUsers.filter((member) =>
        chatroom.members.some(
          (m) => m.userId === member.user.id && member.chatroomId === chatroom.id
        )
      ),
      files: chatroom.files?.map((file) => fileMap.get(file.id) || file) || [],
      messages: chatroomMessagesMap.get(chatroom.id) || [],
      agents: [],
    }));
  }
  async transformEntitiesWithLatestMessages(chatrooms: Chatroom[]): Promise<ChatroomDto[]> {
    const userIds = chatrooms.map((chatroom) => chatroom.members.map((member) => member.userId));
    const usersData = await auth.getUsersByIds({ userIds: userIds.flat() });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    const membersWithUsers = chatrooms.map((chatroom) =>
      chatroom.members.map((member) =>
        mapChatroomMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
      )
    );

    const chatroomsWithMembers = chatrooms.map((chatroom, index) => {
      // Destructure to separate organizations from the rest of the properties
      const { organizations, ...chatroomWithoutOrganizations } = chatroom;

      // Return new object with members but without organizations
      return {
        ...chatroomWithoutOrganizations,
        members: membersWithUsers[index].filter((member) => member.chatroomId === chatroom.id),
      };
    });


    return chatroomsWithMembers.map((chatroom) => ({
      ...chatroom,
      messages: [],
      agents: [],
      files: [],
    }));
  }

  public override async createOne(
    item: ChatroomRequest,
    organizationId?: string
  ): Promise<ChatroomDto> {
    const createdChatroom = await this.repository.createOne(item, organizationId);
    const createdChatroomMembers = await this.chatroomMemberService.createMany(
      item.chatroomMembers.map((member) => ({
        ...member,
        chatroomId: createdChatroom.id,
      }))
    );

    // Manually build the updated chatroom with the created members
    const updatedChatroom = {
      ...createdChatroom,
      members: createdChatroomMembers,
    } as Chatroom;

    // Use the transformation logic to convert to DTO
    return this.transformEntity(updatedChatroom);
  }

  public async createChatroomOrganizationRelation(chatroomId: string, organizationId: string) {
    await this.repository.createChatroomOrganizationRelation(chatroomId, organizationId);
  }

  public override async findOne(id: string, organizationId?: string): Promise<ChatroomDto> {
    const chatroom = await this.repository.findOne(id, organizationId);
    return this.transformEntity(chatroom);
  }

  public async findParticipatingChatroomsWithLatestMessages(
    userId: string,
    organizationId: string
  ) {
    const chatrooms = await this.repository.findParticipatingChatrooms(userId, organizationId);
    return this.transformEntitiesWithLatestMessages(chatrooms);
  }

  public async findByIds(chatroomIds: string[], organizationId?: string): Promise<ChatroomDto[]> {
    const chatrooms = await this.repository.findByIds(chatroomIds, organizationId);
    return this.transformEntities(chatrooms);
  }

  public async validateChatroomAccess(
    chatroomId: string,
    userId: string,
    requiredRoles?: string[],
    organizationId?: string
  ) {
    const chatroom = await this.repository.findOne(chatroomId, organizationId);
    if (!chatroom) {
      throw APIError.notFound('Chatroom not found');
    }

    // Check if chatroom belongs to the specified organization
    if (
      organizationId &&
      chatroom.organizations &&
      chatroom.organizations.organizationId !== organizationId
    ) {
      throw APIError.permissionDenied('Chatroom not found in this organization');
    }

    const userMember = chatroom.members.find(
      (member) => member.userId === userId && !member.hasLeft
    );

    if (!userMember) {
      throw APIError.permissionDenied('You are not a member of this chatroom');
    }

    if (requiredRoles && !requiredRoles.includes(userMember.role)) {
      throw APIError.permissionDenied(`You need one of these roles: ${requiredRoles.join(', ')}`);
    }

    return chatroom;
  }

  public override async findAll(organizationId?: string): Promise<ChatroomDto[]> {
    const chatrooms = await this.repository.findAll(organizationId);
    return this.transformEntities(chatrooms);
  }

  public async findByProjectId(projectId: string, organizationId?: string): Promise<ChatroomDto[]> {
    const chatrooms = await this.repository.findByProjectId(projectId, organizationId);
    return this.transformEntities(chatrooms);
  }
}

export const chatroomService = ChatroomService.getInstance<ChatroomService>(
  chatroomRepository,
  chatroomMemberService
);
