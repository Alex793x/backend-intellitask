import { APIError } from 'encore.dev/api';
import { BaseService } from '../../shared/base/baseService';
import {
  projectMemberRepository,
  ProjectMemberRepository,
} from '../repositories/projectMember.repository';
import { MemberRole, ProjectMember, ProjectMemberRequest } from '../types';
import log from 'encore.dev/log';

export class ProjectMemberService extends BaseService<ProjectMember, ProjectMemberRequest> {
  protected constructor(protected readonly repository: ProjectMemberRepository) {
    super(repository);
  }

  public async createMany(items: ProjectMemberRequest[]): Promise<ProjectMember[]> {
    return this.repository.createMany(items);
  }

  public async findManyByProjectId(projectId: string): Promise<ProjectMember[]> {
    return this.repository.findManyByProjectId(projectId);
  }

  public async findByUserAndProject(
    userId: string,
    projectId: string
  ): Promise<ProjectMember | null> {
    const projectMember = await this.repository.findByUserAndProject(userId, projectId);
    return projectMember;
  }

  override async updateOne(
    id: string,
    item: Partial<ProjectMemberRequest>,
    requesterUserId?: string
  ): Promise<void> {
    if (requesterUserId) {
      // Check if the requester has permissions to update the project member
      const projectMember = await this.repository.findOne(id);
      const requesterMember = await this.repository.findByUserAndProject(
        requesterUserId,
        projectMember.projectId
      );

      if (!requesterMember) {
        throw APIError.permissionDenied('You are not a member of this project');
      }

      if (![MemberRole.OWNER, MemberRole.ADMIN].includes(requesterMember.role)) {
        throw APIError.permissionDenied('You do not have permission to update this project member');
      }
    }

    await this.repository.updateOne(id, item);
  }

  public async changeProjectMemberStatus(
    projectId: string,
    memberId: string,
    kickStatus: boolean
  ): Promise<void> {
    await this.repository.updateOne(memberId, {
      hasLeft: kickStatus,
      projectId,
    });
  }

  public async deleteManyByProjectId(projectId: string): Promise<void> {
    return this.repository.deleteManyByProjectId(projectId);
  }
}

export const projectMemberService =
  ProjectMemberService.getInstance<ProjectMemberService>(projectMemberRepository);
