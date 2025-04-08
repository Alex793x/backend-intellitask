import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { Project, ProjectRequest } from '../types';
import {
  projectPreparedStatements,
  ProjectPreparedStatements,
} from './project.repository.preparedStatements';
import { db } from '../db/db';
import { projects } from '../db/schema';
import { inArray } from 'drizzle-orm';
import { teamspaceRepository, TeamspaceRepository } from './teamspace.repository';

export class ProjectRepository extends BaseRepository<Project, ProjectRequest> {
  protected constructor(
    private readonly preparedStatements: ProjectPreparedStatements,
    private readonly teamspaceRepository: TeamspaceRepository
  ) {
    super();
  }

  findOne(id: string, organizationId?: string): Promise<Project> {
    return withErrorHandling(async () => {
      const project = await this.preparedStatements.findOne.execute({ id });
      if (!project) {
        throw APIError.notFound('Project not found');
      }

      // If organizationId is provided, verify the teamspace belongs to the organization
      if (organizationId) {
        // Get the teamspace repository

        // Check if teamspace belongs to the organization
        try {
          await this.teamspaceRepository.findOne(project.teamspaceId, organizationId);
        } catch (error) {
          throw APIError.notFound('Project not found in this organization');
        }
      }

      return project as Project;
    }, 'Error finding project');
  }

  findByIds(projectIds: string[], organizationId?: string): Promise<Project[]> {
    return withErrorHandling(async () => {
      const foundProjects = await db.query.projects.findMany({
        where: inArray(projects.id, projectIds),
        with: {
          members: true,
          chatrooms: {
            with: {
              members: true,
              organizations: true,
              files: true,
            },
          },
          files: true,
        },
      });

      // If organizationId is provided, filter projects by organization
      if (organizationId) {
        const orgTeamspaces = await this.teamspaceRepository.findByOrganizationId(organizationId);
        const orgTeamspaceIds = orgTeamspaces.map((teamspace: any) => teamspace.id);

        const filtered = foundProjects.filter((project) =>
          orgTeamspaceIds.includes(project.teamspaceId)
        );

        return filtered as Project[];
      }

      return foundProjects as Project[];
    }, 'Error finding projects by ids');
  }

  findAll(organizationId?: string): Promise<Project[]> {
    return withErrorHandling(async () => {
      const allProjects = await this.preparedStatements.findAll.execute();

      // If organizationId is provided, filter projects by organization
      if (organizationId) {
        const orgTeamspaces = await this.teamspaceRepository.findByOrganizationId(organizationId);
        const orgTeamspaceIds = orgTeamspaces.map((teamspace: any) => teamspace.id);

        const filtered = allProjects.filter((project) =>
          orgTeamspaceIds.includes(project.teamspaceId)
        );

        return filtered as Project[];
      }

      return allProjects as Project[];
    }, 'Error finding all projects');
  }

  findByTeamspaceId(teamspaceId: string, organizationId?: string): Promise<Project[]> {
    return withErrorHandling(async () => {
      // Check if teamspace belongs to organization if organizationId is provided
      if (organizationId) {
        try {
          await this.teamspaceRepository.findOne(teamspaceId, organizationId);
        } catch (error) {
          throw APIError.notFound('Teamspace not found in this organization');
        }
      }

      const projects = await this.preparedStatements.findByTeamspaceId.execute({
        teamspaceId,
      });
      return projects as Project[];
    }, 'Error finding projects by teamspace id');
  }

  createOne(item: ProjectRequest): Promise<Project> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        teamspaceId: item.teamspaceId,
        name: item.name,
        description: item.description || '',
        creatorId: item.creatorId,
        context: item.context || '',
        isPrivate: item.isPrivate || false,
      });

      if (!created) {
        throw new Error('Failed to create project');
      }

      return created as Project;
    }, 'Error creating project');
  }

  updateOne(id: string, item: Partial<ProjectRequest>): Promise<void | Project> {
    return withErrorHandling(async () => {
      const project = await this.findOne(id);

      if (!project) {
        throw APIError.notFound('Project not found');
      }

      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name || project.name,
        description: item.description || project.description,
        context: item.context || project.context,
        isPrivate: item.isPrivate !== undefined ? item.isPrivate : project.isPrivate,
      });

      const updatedProject = await this.findOne(id);
      return updatedProject as Project;
    }, 'Error updating project');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deleted] = await this.preparedStatements.deleteOne.execute({ id });
      if (!deleted) {
        throw APIError.notFound('Project not found');
      }
    }, 'Error deleting project');
  }

  findByUserId(userId: string, organizationId?: string): Promise<Project[]> {
    return withErrorHandling(async () => {
      // First, get projects where user is directly a member
      const directMemberships = await this.preparedStatements.findByUserIdDirect.execute({
        userId,
      });
      const directProjects = directMemberships.map((relation) => relation.project) as Project[];

      // Next, get non-private projects from teamspaces where user is a member
      const teamspaceMemberships = await this.preparedStatements.findByUserIdInTeamspaces.execute({
        userId,
      });

      // Extract and flatten all non-private projects from all teamspaces
      const teamspaceProjects = teamspaceMemberships.flatMap(
        (relation) => relation.teamspace.projects
      ) as Project[];

      // Combine and deduplicate projects (direct memberships take precedence)
      const projectMap = new Map<string, Project>();

      // Add teamspace projects first (will be overridden by direct projects if there's overlap)
      teamspaceProjects.forEach((project) => {
        projectMap.set(project.id, project);
      });

      // Add direct projects (overriding teamspace projects if there's overlap)
      directProjects.forEach((project) => {
        projectMap.set(project.id, project);
      });

      // Filter by organization if provided
      if (organizationId) {
        const orgTeamspaces = await this.teamspaceRepository.findByOrganizationId(organizationId);
        const orgTeamspaceIds = orgTeamspaces.map((teamspace: any) => teamspace.id);

        // Keep only projects from teamspaces in the organization
        const filtered = Array.from(projectMap.values()).filter((project) =>
          orgTeamspaceIds.includes(project.teamspaceId)
        );

        return filtered;
      }

      return Array.from(projectMap.values());
    }, 'Error finding projects by user id');
  }
}

export const projectRepository = ProjectRepository.getInstance<ProjectRepository>(
  projectPreparedStatements,
  teamspaceRepository
);
