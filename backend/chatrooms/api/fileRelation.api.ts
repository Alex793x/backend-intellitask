import { api, APIError } from 'encore.dev/api';
import { GenericResponse } from '../../shared/types';
import { filesRelationRepository } from '../repositories/filesRelation.repository';
import { FileRelation } from '../types';
import { fileManagement } from '~encore/clients';
import { getAuthData } from '~encore/auth';

export const createOneTeamspaceFile = api<
  { fileId: string; teamspaceId: string },
  GenericResponse<FileRelation>
>(
  {
    path: '/files/teamspace',
    method: 'POST',
    expose: false,
  },
  async (req) => {
    const createdFileRelation = await filesRelationRepository.createOneTeamspaceFile(
      req.fileId,
      req.teamspaceId
    );

    return {
      data: createdFileRelation,
    };
  }
);

export const createOneProjectFile = api<
  { fileId: string; projectId: string },
  GenericResponse<FileRelation>
>(
  {
    path: '/files/project',
    method: 'POST',
    expose: false,
  },
  async (req) => {
    const createdFileRelation = await filesRelationRepository.createOneProjectFile(
      req.fileId,
      req.projectId
    );

    return {
      data: createdFileRelation,
    };
  }
);

export const createOneChatroomFile = api<
  { fileId: string; chatroomId: string },
  GenericResponse<FileRelation>
>(
  {
    path: '/files/chatroom',
    method: 'POST',
    expose: false,
  },
  async (req) => {
    const createdFileRelation = await filesRelationRepository.createOneChatroomFile(
      req.fileId,
      req.chatroomId
    );

    return {
      data: createdFileRelation,
    };
  }
);

export const deleteOneTeamspaceFile = api<{ fileId: string }, GenericResponse<FileRelation>>(
  {
    path: '/files/teamspace',
    method: 'DELETE',
    expose: true,
  },
  async (req) => {
    const deletedFileRelation = await filesRelationRepository.deleteOneTeamspaceFile(req.fileId);

    if (!deletedFileRelation) {
      throw APIError.notFound('File not found');
    }

    return {
      data: deletedFileRelation,
    };
  }
);

export const deleteOneProjectFile = api<
  { fileId: string; projectId: string },
  GenericResponse<FileRelation>
>(
  {
    path: '/files/project',
    method: 'DELETE',
    expose: true,
    auth: true,
  },
  async (req) => {
    const { userID, session } = getAuthData()!;
    const organizationId = session?.activeOrganizationId;

    if (!userID || !organizationId) {
      throw APIError.unauthenticated('User not authenticated');
    }

    const fileRelation = await filesRelationRepository.findOneProjectFileByFileId(req.fileId);
    if (!fileRelation) {
      throw APIError.notFound('File not found');
    }

    if (fileRelation.projectId !== req.projectId) {
      throw APIError.permissionDenied('You do not have permission to delete this file');
    }

    const deletedFileRelation = await filesRelationRepository.deleteOneProjectFile(req.fileId);

    if (!deletedFileRelation) {
      throw APIError.notFound('File not found');
    }

    await fileManagement.deleteOneFile({ fileId: req.fileId, organizationId });

    return {
      data: deletedFileRelation,
    };
  }
);

export const deleteOneChatroomFile = api<{ fileId: string }, GenericResponse<FileRelation>>(
  {
    path: '/files/chatroom',
    method: 'DELETE',
    expose: true,
  },
  async (req) => {
    const deletedFileRelation = await filesRelationRepository.deleteOneChatroomFile(req.fileId);

    if (!deletedFileRelation) {
      throw APIError.notFound('File not found');
    }

    return {
      data: deletedFileRelation,
    };
  }
);
