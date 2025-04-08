import { UserDto } from '../../auth/types';
import {
  TeamspaceMember,
  TeamspaceMemberDto,
  ProjectMember,
  ProjectMemberDto,
  ProjectDto,
  Project,
  Chatroom,
  ChatroomDto,
} from '../types';
import { mapChatroomMemberToMemberWithUserDto } from './chatroom.mapper';

/**
 * Map a teamspace member to a member with user information
 */
export const mapTeamspaceMemberToMemberWithUserDto = (
  member: TeamspaceMember,
  user: UserDto
): TeamspaceMemberDto => {
  return {
    id: member.id,
    teamspaceId: member.teamspaceId,
    user,
    role: member.role,
    invitedByUserId: member.invitedByUserId,
    hasLeft: member.hasLeft,
    joinedAt: member.joinedAt,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
};

export const mapProjectToProjectDto = (project: Project, user: UserDto): ProjectDto => {
  return {
    ...project,
    members:
      project.members?.map((member) => mapProjectMemberToMemberWithUserDto(member, user)) || [],
    chatrooms: project.chatrooms?.map((chatroom) => mapChatroomToChatroomDto(chatroom, user)) || [],
    files: [],
  };
};

export const mapChatroomToChatroomDto = (chatroom: Chatroom, user: UserDto): ChatroomDto => {
  return {
    ...chatroom,
    members:
      chatroom.members?.map((member) => mapChatroomMemberToMemberWithUserDto(member, user)) || [],
    messages: [],
    agents: [],
    files: [],
  };
};

/**
 * Map a project member to a member with user information
 */
export const mapProjectMemberToMemberWithUserDto = (
  member: ProjectMember,
  user: UserDto
): ProjectMemberDto => {
  return {
    id: member.id,
    projectId: member.projectId,
    user,
    role: member.role,
    invitedByUserId: member.invitedByUserId,
    hasLeft: member.hasLeft,
    joinedAt: member.joinedAt,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
};
