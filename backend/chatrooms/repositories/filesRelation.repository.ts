import Singleton from '../../shared/base/singleton';
import {
  FilesRelationPreparedStatements,
  filesRelationPreparedStatements,
} from './filesRelation.repository.preparedStatements';
import { FileRelation } from '../types';
export class FilesRelationRepository extends Singleton {
  private constructor(private readonly preparedStatements: FilesRelationPreparedStatements) {
    super();
  }

  public async createOneTeamspaceFile(fileId: string, teamspaceId: string): Promise<FileRelation> {
    const [fileRelation] = await this.preparedStatements.createOneTeamspaceFile.execute({
      fileId,
      teamspaceId,
    });
    return fileRelation as FileRelation;
  }

  public async createOneProjectFile(fileId: string, projectId: string) {
    const [fileRelation] = await this.preparedStatements.createOneProjectFile.execute({
      fileId,
      projectId,
    });
    return fileRelation as FileRelation;
  }

  public async createOneChatroomFile(fileId: string, chatroomId: string) {
    const [fileRelation] = await this.preparedStatements.createOneChatroomFile.execute({
      fileId,
      chatroomId,
    });
    return fileRelation as FileRelation;
  }

  public async findOneTeamspaceFileByFileId(fileId: string) {
    const [fileRelation] = await this.preparedStatements.findOneTeamspaceFileByFileId.execute({
      fileId,
    });
    return fileRelation as FileRelation;
  }

  public async findAllByTeamspaceId(teamspaceId: string) {
    const fileRelations = await this.preparedStatements.findAllByTeamspaceId.execute({
      teamspaceId,
    });
    return fileRelations as FileRelation[];
  }

  public async findOneProjectFileByFileId(fileId: string) {
    const [fileRelation] = await this.preparedStatements.findOneProjectFileByFileId.execute({
      fileId,
    });
    return fileRelation as FileRelation;
  }

  public async findAllByProjectId(projectId: string) {
    const fileRelations = await this.preparedStatements.findAllByProjectId.execute({
      projectId,
    });
    return fileRelations as FileRelation[];
  }

  public async findOneChatroomFileByFileId(fileId: string) {
    const [fileRelation] = await this.preparedStatements.findOneChatroomFileByFileId.execute({
      fileId,
    });
    return fileRelation as FileRelation;
  }

  public async findAllByChatroomId(chatroomId: string) {
    const fileRelations = await this.preparedStatements.findAllByChatroomId.execute({
      chatroomId,
    });
    return fileRelations as FileRelation[];
  }

  public async deleteOneTeamspaceFile(fileId: string) {
    const [deletedFileRelation] = await this.preparedStatements.deleteOneTeamspaceFile.execute({
      fileId,
    });
    return deletedFileRelation as FileRelation;
  }

  public async deleteOneProjectFile(fileId: string) {
    const [deletedFileRelation] = await this.preparedStatements.deleteOneProjectFile.execute({
      fileId,
    });
    return deletedFileRelation as FileRelation;
  }

  public async deleteOneChatroomFile(fileId: string) {
    const [deletedFileRelation] = await this.preparedStatements.deleteOneChatroomFile.execute({
      fileId,
    });
    return deletedFileRelation as FileRelation;
  }
}

export const filesRelationRepository = FilesRelationRepository.getInstance<FilesRelationRepository>(
  filesRelationPreparedStatements
);
