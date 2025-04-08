import { BaseService } from '../../shared/base/baseService';
import fileManagementRepository, {
  FileManagementRepository,
} from '../repositories/fileManagement.repository';
import { FileDto, FileEntity, FileRequest, UploadType } from '../types';
import { auth, chatrooms } from '~encore/clients';
import linodeS3BucketService, { LinodeS3BucketService } from './linodeS3Bucket.service';
import { APIError } from 'encore.dev/api';

export class FileManagementService extends BaseService<FileEntity, FileRequest, FileDto> {
  constructor(
    protected readonly repository: FileManagementRepository,
    private readonly linodeS3BucketService: LinodeS3BucketService
  ) {
    super(repository);
  }

  protected override async transformEntity(entity: FileEntity): Promise<FileDto> {
    const userIds = entity.allowedUserAccess?.map((access) => access.userId) || [];
    const usersData = await auth.getUsersByIds({ userIds: userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));
    const allowedUserAccess = entity.allowedUserAccess?.map((access) => ({
      ...access,
      user: userMap.get(access.userId)!,
    }));

    const uploadedByUser = await auth.getUserById({ id: entity.uploadedByUserId });

    return {
      ...entity,
      uploadedByUser: uploadedByUser.data,
      allowedUsers: allowedUserAccess ?? [],
    };
  }

  protected override async transformEntities(entities: FileEntity[]): Promise<FileDto[]> {
    const userIdsMap = new Map(
      entities.map((entity) => [
        entity.id,
        entity.allowedUserAccess?.map((access) => access.userId) || [],
      ])
    );
    const usersData = await auth.getUsersByIds({ userIds: [...userIdsMap.values()].flat() });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));
    const allowedUserAccessMap = new Map(
      entities.map((entity) => [
        entity.id,
        entity.allowedUserAccess?.map((access) => ({
          ...access,
          user: userMap.get(access.userId)!,
        })) ?? [],
      ])
    );
    const uploadedByUserMap = new Map(
      entities.map((entity) => [entity.id, entity.uploadedByUserId])
    );
    const uploadedByUsersData = await auth.getUsersByIds({
      userIds: [...uploadedByUserMap.values()],
    });
    const userDetailsMap = new Map(uploadedByUsersData.data.map((user) => [user.id, user]));
    return entities.map((entity) => ({
      ...entity,
      uploadedByUser: userDetailsMap.get(entity.uploadedByUserId)!,
      allowedUsers: allowedUserAccessMap.get(entity.id) ?? [],
    }));
  }

  public async getFilesByIds(fileIds: string[], organizationId: string): Promise<FileDto[]> {
    const files = await this.repository.getFilesByIds(fileIds, organizationId);
    return this.transformEntities(files);
  }

  public override async createOne(item: FileRequest): Promise<FileDto> {
    try {
      // Convert the file data array to a Buffer
      if (!item.data) {
        throw APIError.aborted('No file data provided');
      }
      const fileBuffer = Buffer.concat(item.data);

      // Determine the appropriate path based on available context
      let objectPath = item.organizationId;

      // Case 1: File belongs to a chatroom directly (organization/chatroomId)
      if (item.chatroomId && !item.teamspaceId) {
        objectPath = `${objectPath}/chats/${item.chatroomId}`;
      }
      // Case 2: File belongs to a team but not a specific project (organization/teamId)
      else if (item.teamspaceId && !item.projectId) {
        objectPath = `${objectPath}/teams/${item.teamspaceId}`;
      }
      // Case 3: File belongs to a specific project (organization/teamId/projectId)
      else if (item.teamspaceId && item.projectId) {
        objectPath = `${objectPath}/teams/${item.teamspaceId}/projects/${item.projectId}`;
      }

      const objectName = `${objectPath}/${Date.now()}-${item.fileName}`;
      const bucketName = 'file-uploads';

      // Upload to S3 bucket
      const fileUrl = await this.linodeS3BucketService.uploadObject(
        bucketName,
        objectName,
        fileBuffer,
        item.uploadType === UploadType.MEDIA
      );

      // Create the database entity (we've uploaded the file to S3, so we don't need the raw data anymore)
      // We need to structure this to match what the repository expects
      const fileEntity = {
        uploadedByUserId: item.uploadedByUserId,
        teamspaceId: item.teamspaceId,
        projectId: item.projectId,
        chatroomId: item.chatroomId,
        organizationId: item.organizationId,
        uploadType: item.uploadType,
        fileType: item.fileType,
        fileName: objectName,
        fileUrl, // Add the S3 URL here for storage in database
        fileSize: item.fileSize,
        allowedUsers: item.allowedUsers,
      };

      // Use the repository to create the file record in the database
      const createdFile = await this.repository.createOne(fileEntity as FileRequest);
      if (item.teamspaceId) {
        await chatrooms.createOneTeamspaceFile({
          fileId: createdFile.id,
          teamspaceId: item.teamspaceId,
        });
      }

      if (item.projectId) {
        await chatrooms.createOneProjectFile({ fileId: createdFile.id, projectId: item.projectId });
      }

      if (item.chatroomId) {
        await chatrooms.createOneChatroomFile({
          fileId: createdFile.id,
          chatroomId: item.chatroomId,
        });
      }
      // Transform the entity to a DTO before returning
      return this.transformEntity(createdFile);
    } catch (error) {
      console.error('Error in file upload:', error);
      throw error;
    }
  }

  public async deleteOne(fileId: string, organizationId?: string): Promise<void> {
    const file = await this.repository.findOne(fileId, organizationId);
    if (!file) {
      throw APIError.notFound('File not found');
    }
    await this.linodeS3BucketService.deleteObject('file-uploads', file.fileName);
    await this.repository.deleteOne(fileId, organizationId);
  }
}

const fileManagementService = FileManagementService.getInstance<FileManagementService>(
  fileManagementRepository,
  linodeS3BucketService
);

export default fileManagementService;
