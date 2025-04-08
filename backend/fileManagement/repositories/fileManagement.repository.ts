import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { FileEntity, FileRequest } from '../types';
import fileManagementPreparedStatements, {
  FileManagementPreparedStatements,
} from './fileManagement.repository.preparedStatements';
import { db } from '../db/db';

export class FileManagementRepository extends BaseRepository<FileEntity, FileRequest> {
  constructor(private readonly preparedStatements: FileManagementPreparedStatements) {
    super();
  }

  async findOne(id: string, organizationId?: string): Promise<FileEntity> {
    return withErrorHandling(async () => {
      const file = await this.preparedStatements.findOne.execute({ id, organizationId });
      if (!file) {
        throw APIError.notFound('File not found');
      }
      return file as FileEntity;
    }, 'File not found');
  }

  async findAll(): Promise<FileEntity[]> {
    return withErrorHandling(async () => {
      const files = await this.preparedStatements.findAll.execute();
      return files as FileEntity[];
    }, 'No files found');
  }

  async getFilesByIds(fileIds: string[], organizationId: string) {
    return withErrorHandling(async () => {
      const files = await db.query.files.findMany({
        where: (files, { inArray }) => inArray(files.id, fileIds),
        with: {
          allowedAccess: true,
        },
      });

      const filteredFiles = files.filter((file) => file.organizationId === organizationId);
      return filteredFiles as FileEntity[];
    }, 'No files found');
  }

  async createOne(item: FileRequest): Promise<FileEntity> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        organizationId: item.organizationId,
        uploadedByUserId: item.uploadedByUserId,
        uploadType: item.uploadType,
        fileType: item.fileType,
        fileName: item.fileName,
        fileUrl: item.fileUrl,
        fileSize: item.fileSize,
      });

      if (!created) {
        throw APIError.internal('Failed to create file');
      }
      return created as FileEntity;
    }, 'Failed to create file');
  }

  async updateOne(id: string, item: FileRequest): Promise<void | FileEntity> {
    throw APIError.internal('Method not implemented.');
  }

  async deleteOne(id: string, organizationId?: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id, organizationId });
    }, 'Failed to delete file');
  }
}

const fileManagementRepository = FileManagementRepository.getInstance<FileManagementRepository>(
  fileManagementPreparedStatements
);
export default fileManagementRepository;
