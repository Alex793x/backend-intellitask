import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { ProjectMember, ProjectMemberRequest } from '../types';
import { db } from '../db/db';
import { projectMembers } from '../db/schema';
import {
  projectMemberPreparedStatements,
  ProjectMemberPreparedStatements,
} from './projectMember.repository.preparedStatements';
import { eq } from 'drizzle-orm';

export class ProjectMemberRepository extends BaseRepository<ProjectMember, ProjectMemberRequest> {
  protected constructor(private readonly preparedStatements: ProjectMemberPreparedStatements) {
    super();
  }

  findOne(id: string): Promise<ProjectMember> {
    return withErrorHandling(async () => {
      const [projectMember] = await this.preparedStatements.findOne.execute({ id });
      if (!projectMember) {
        throw APIError.notFound('Project member not found');
      }
      return projectMember as ProjectMember;
    }, 'Error finding project member');
  }

  findAll(): Promise<ProjectMember[]> {
    return withErrorHandling(async () => {
      const projectMembers = await this.preparedStatements.findAll.execute();
      return projectMembers as ProjectMember[];
    }, 'Error finding all project members');
  }

  findManyByProjectId(projectId: string): Promise<ProjectMember[]> {
    return withErrorHandling(async () => {
      const projectMembers = await this.preparedStatements.findManyByProjectId.execute({
        projectId,
      });
      return projectMembers as ProjectMember[];
    }, 'Error finding project members by project id');
  }

  findByUserAndProject(userId: string, projectId: string): Promise<ProjectMember | null> {
    return withErrorHandling(async () => {
      const [projectMember] = await this.preparedStatements.findByUserAndProject.execute({
        userId,
        projectId,
      });
      return projectMember as ProjectMember | null;
    }, 'Error finding project member by user and project');
  }

  createOne(item: ProjectMemberRequest): Promise<ProjectMember> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        projectId: item.projectId,
        userId: item.userId,
        role: item.role,
        invitedByUserId: item.invitedByUserId,
      });

      if (!created) {
        throw new Error('Failed to create project member');
      }

      return created as ProjectMember;
    }, 'Error creating project member');
  }

  createMany(items: ProjectMemberRequest[]): Promise<ProjectMember[]> {
    return withErrorHandling(async () => {
      const createdProjectMembers = await db
        .insert(projectMembers)
        .values(
          items.map((item) => ({
            projectId: item.projectId,
            userId: item.userId,
            role: item.role,
            invitedByUserId: item.invitedByUserId,
          }))
        )
        .returning()
        .execute();

      return createdProjectMembers as ProjectMember[];
    }, 'Error creating project members');
  }

  updateOne(memberId: string, item: Partial<ProjectMemberRequest>): Promise<void | ProjectMember> {
    return withErrorHandling(async () => {
      const foundProjectMember = await this.findOne(memberId);

      if (!foundProjectMember) {
        throw APIError.notFound('Project member not found');
      }

      const [updatedProjectMember] = await this.preparedStatements.updateOne.execute({
        id: memberId,
        projectId: item.projectId ?? foundProjectMember.projectId,
        role: item.role ?? foundProjectMember.role,
        hasLeft: item.hasLeft ?? foundProjectMember.hasLeft,
      });

      return updatedProjectMember as ProjectMember;
    }, 'Error updating project member');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deleted] = await this.preparedStatements.deleteOne.execute({ id });
      if (!deleted) {
        throw APIError.notFound('Project member not found');
      }
    }, 'Error deleting project member');
  }

  deleteManyByProjectId(projectId: string): Promise<void> {
    return withErrorHandling(async () => {
      await db.delete(projectMembers).where(eq(projectMembers.projectId, projectId)).execute();
    }, 'Error deleting project members by project id');
  }
}

export const projectMemberRepository = ProjectMemberRepository.getInstance<ProjectMemberRepository>(
  projectMemberPreparedStatements
);
