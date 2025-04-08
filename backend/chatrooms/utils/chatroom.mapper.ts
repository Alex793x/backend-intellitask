import { User, UserDto } from '../../auth/types';
import { ChatroomMember, ChatroomMemberDto, TeamMember, TeamMemberDto } from '../types';

export function mapChatroomMemberToMemberWithUserDto(
  member: ChatroomMember,
  user: UserDto
): ChatroomMemberDto {
  // Extract only the fields we want to keep and add the user object
  return {
    id: member.id,
    chatroomId: member.chatroomId,
    role: member.role,
    hasLeft: member.hasLeft,
    joinedAt: member.joinedAt,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
    user,
  };
}

export function mapTeamMemberToMemberWithUserDto(member: TeamMember, user: UserDto): TeamMemberDto {
  // Extract only the fields we want to keep and add the user object
  return {
    id: member.id,
    role: member.role,
    hasLeft: member.hasLeft,
    joinedAt: member.joinedAt,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
    user,
  };
}
