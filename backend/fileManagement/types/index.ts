import { UserDto } from '../../auth/types';
import { Nullable } from '../../shared/types';

// Enums
export enum Access {
  NONE = 'NONE',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

export enum UploadType {
  DOCUMENT = 'DOCUMENT',
  MEDIA = 'MEDIA',
}

export enum FileType {
  AUDIO = 'AUDIO',
  CODE = 'CODE',
  DOCUMENT = 'DOCUMENT',
  FILE = 'FILE',
  HTML = 'HTML',
  JSON = 'JSON',
  IMAGE = 'IMAGE',
  MARKDOWN = 'MARKDOWN',
  PDF = 'PDF',
  PRESENTATION = 'PRESENTATION',
  SPREADSHEET = 'SPREADSHEET',
  VIDEO = 'VIDEO',
  UNKNOWN = 'UNKNOWN',
}

// Database Types (match schema)
export interface FileEntity {
  id: string;
  uploadedByUserId: string;
  organizationId: string;
  uploadType: UploadType;
  fileType: FileType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  allowedUserAccess?: AllowedUserAccess[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AllowedUserAccess {
  id: string;
  fileId: string;
  userId: string;
  access: Access;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs (for service responses)
export interface FileDto {
  id: string;
  uploadedByUser: UserDto;
  organizationId: string;
  uploadType: UploadType;
  fileType: FileType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  allowedUsers: AllowedUserAccessDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AllowedUserAccessDto {
  id: string;
  user: UserDto;
  access: Access;
  createdAt: Date;
  updatedAt: Date;
}

// Request Types (for API endpoints)
export interface FileRequest {
  data?: any[];
  uploadedByUserId: string;
  teamspaceId: Nullable<string>;
  projectId: Nullable<string>;
  chatroomId: Nullable<string>;
  organizationId: string;
  uploadType: UploadType;
  fileUrl: string;
  fileType: FileType;
  fileName: string;
  fileSize: number;
  allowedUsers?: AllowedUserAccessRequest[];
}

export interface AllowedUserAccessRequest {
  userId: string;
  access: Access;
}

// Search & Filter Types
export interface FileSearchParams {
  organizationId?: string;
  teamspaceId?: string;
  projectId?: string;
  chatroomId?: string;
  uploadedByUserId?: string;
  fileType?: FileType;
  uploadType?: UploadType;
  fileName?: string;
}
