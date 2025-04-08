import { UserDto } from '../../auth/types';
import { AgentWithRelationsDTO } from '../../fuck/types';

import { FileDto } from '../../fileManagement/types';

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  VIEWER = 'VIEWER',
}

export enum FileScope {
  TEAMSPACE = 'TEAMSPACE',
  PROJECT = 'PROJECT',
}

export enum ChatroomType {
  CHATROOM = 'CHATROOM',
  PROJECT_CHATROOM = 'PROJECT_CHATROOM',
  AGENT_CONFIG_SPACE = 'AGENT_CONFIG_SPACE',
}

export enum ChatroomRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  PROMPT_AIS = 'PROMPT_AIS',
  WRITE = 'WRITE',
  READ = 'READ',
}

// Teamspace types
export interface Teamspace {
  id: string;
  name: string;
  description: string;
  context: string;
  creatorId: string;
  members?: TeamspaceMember[];
  organizations: TeamspaceOrganizationRelation;
  files?: FileRelation[];
  projects?: Project[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceDto {
  id: string;
  name: string;
  description: string;
  context: string;
  creatorId: string;
  members: TeamspaceMemberDto[];
  files: FileDto[];
  projects: ProjectDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceNoUsersDto {
  id: string;
  name: string;
  description: string;
  context: string;
  creatorId: string;
  members: TeamspaceMember[];
  files: FileRelation[];
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceRequest {
  name: string;
  description?: string;
  context?: string;
  creatorId: string;
  members: TeamspaceMemberRequest[];
}

export interface TeamspaceMember {
  id: string;
  teamspaceId: string;
  userId: string;
  role: MemberRole;
  invitedByUserId: string;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceMemberDto {
  id: string;
  teamspaceId: string;
  user: UserDto;
  role: MemberRole;
  invitedByUserId: string;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceMemberRequest {
  teamspaceId: string;
  userId: string;
  hasLeft?: boolean;
  role: MemberRole;
  invitedByUserId: string;
}

// Project types
export interface Project {
  id: string;
  teamspaceId: string;
  name: string;
  description: string;
  context: string;
  creatorId: string;
  isPrivate: boolean;
  members?: ProjectMember[];
  chatrooms?: Chatroom[];
  files?: FileRelation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDto {
  id: string;
  teamspaceId: string;
  name: string;
  description: string;
  context: string;
  creatorId: string;
  isPrivate: boolean;
  members: ProjectMemberDto[];
  chatrooms: ChatroomDto[];
  files: FileDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectRequest {
  teamspaceId: string;
  name: string;
  description?: string;
  context?: string;
  creatorId: string;
  isPrivate?: boolean;
  members: ProjectMemberRequest[];
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: MemberRole;
  invitedByUserId: string;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMemberDto {
  id: string;
  projectId: string;
  user: UserDto;
  role: MemberRole;
  invitedByUserId: string;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMemberRequest {
  projectId: string;
  userId: string;
  role: MemberRole;
  invitedByUserId: string;
  hasLeft?: boolean;
}

// File types
export interface FileRelation {
  id: string;
  teamspaceId?: string;
  projectId?: string;
  chatroomId?: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamspaceFileDto {
  id: string;
  teamspaceId: string;
  projectId?: string;
  scope: FileScope;
  name: string;
  description: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedByUser: UserDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  fileId: string;
  addedBy: string;
  createdAt: Date;
}

export interface ProjectFileDto {
  id: string;
  projectId: string;
  file: TeamspaceFileDto;
  addedBy: string;
  createdAt: Date;
}

export interface ProjectFileRequest {
  projectId: string;
  fileId: string;
  addedBy: string;
}

export interface ChatroomOrganizationRelation {
  id: string;
  chatroomId: string;
  organizationId: string;
}

export interface TeamspaceOrganizationRelation {
  id: string;
  teamspaceId: string;
  organizationId: string;
}

export interface ProjectOrganizationRelation {
  id: string;
  projectId: string;
  organizationId: string;
}

// Update Chatroom types to include project reference
export interface Chatroom {
  id: string; // UUID
  type: ChatroomType;
  chatroomCreatorId: string; // UUID of creator
  projectId?: string; // Reference to project
  isPrivate: boolean;
  members: ChatroomMember[];
  organizations: ChatroomOrganizationRelation;
  files: FileRelation[];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatroomDto {
  id: string; // UUID
  type: ChatroomType;
  chatroomCreatorId: string; // UUID of creator
  projectId?: string; // Reference to project
  isPrivate: boolean;
  messages: any[];
  agents: AgentWithRelationsDTO[];
  files: FileDto[];
  name: string;
  members: ChatroomMemberDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatroomRequest {
  chatroomCreatorId: string;
  name: string;
  type: ChatroomType;
  projectId?: string; // Reference to project
  isPrivate?: boolean;
  chatroomMembers: ChatroomMemberRequest[];
  teamIds: string[];
}

// Existing team types
export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamDto {
  id: string;
  name: string;
  members: TeamMemberDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamRequest {
  name: string;
  members: TeamMemberRequest[];
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: ChatroomRole;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberDto {
  id: string;
  user: UserDto;
  role: ChatroomRole;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberRequest {
  teamId: string;
  userId: string;
  role: ChatroomRole;
  hasLeft: boolean;
}

export interface ChatroomMember {
  id: string;
  chatroomId: string;
  userId: string;
  role: ChatroomRole;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatroomMemberDto {
  id: string;
  chatroomId: string;
  user: UserDto;
  role: ChatroomRole;
  hasLeft: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatroomMemberRequest {
  chatroomId: string;
  userId: string;
  role?: ChatroomRole;
  hasLeft?: boolean;
}
