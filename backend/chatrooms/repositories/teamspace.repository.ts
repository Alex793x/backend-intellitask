import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { Teamspace, TeamspaceRequest, TeamspaceNoUsersDto } from '../types';
import {
  teamspacePreparedStatements,
  TeamspacePreparedStatements,
} from './teamspace.repository.preparedStatements';

export class TeamspaceRepository extends BaseRepository<Teamspace, TeamspaceRequest> {
  protected constructor(private readonly preparedStatements: TeamspacePreparedStatements) {
    super();
  }

  findOne(id: string, organizationId?: string): Promise<Teamspace> {
    return withErrorHandling(async () => {
      const teamspace = await this.preparedStatements.findOne.execute({ id });
      if (!teamspace) {
        throw APIError.notFound('Teamspace not found');
      }

      // If organizationId is provided, verify the teamspace belongs to the organization
      if (organizationId) {
        const hasAccess = teamspace.organizations.organizationId === organizationId;

        if (!hasAccess) {
          throw APIError.notFound('Teamspace not found in this organization');
        }
      }

      return teamspace as Teamspace;
    }, 'Error finding teamspace');
  }

  findAll(organizationId?: string): Promise<Teamspace[]> {
    return withErrorHandling(async () => {
      // If organizationId is provided, use findByOrganizationId
      if (organizationId) {
        return this.findByOrganizationId(organizationId) as Promise<Teamspace[]>;
      }

      // Otherwise, return all teamspaces
      const teamspaces = await this.preparedStatements.findAll.execute();
      return teamspaces as Teamspace[];
    }, 'Error finding all teamspaces');
  }

  findByOrganizationId(organizationId: string): Promise<TeamspaceNoUsersDto[]> {
    return withErrorHandling(async () => {
      const relations = await this.preparedStatements.findByOrganizationId.execute({
        organizationId,
      });
      const teamspaces = relations.map((relation) => relation.teamspace) as TeamspaceNoUsersDto[];
      return teamspaces;
    }, 'Error finding teamspaces by organization id');
  }

  findByUserId(userId: string, organizationId?: string): Promise<Teamspace[]> {
    return withErrorHandling(async () => {
      const memberRelations = await this.preparedStatements.findByUserId.execute({
        userId,
      });

      // Filter out teamspaces where the user has left
      const activeTeamspaces = memberRelations
        .filter((relation) => {
          const teamspace = relation.teamspace as Teamspace;
          return teamspace.members?.some((member) => member.userId === userId && !member.hasLeft);
        })
        .map((relation) => relation.teamspace as Teamspace);

      // If organizationId is provided, filter teamspaces by organization
      if (organizationId) {
        return activeTeamspaces
          .filter((teamspace) => teamspace.organizations.organizationId === organizationId)
          .map((teamspace) => {
            // Filter out projects where the user has left
            if (teamspace.projects) {
              teamspace.projects = teamspace.projects.filter((project) =>
                project.members?.some((member) => member.userId === userId && !member.hasLeft)
              );
            }
            return teamspace;
          });
      }

      return activeTeamspaces;
    }, 'Error finding teamspaces by user id');
  }

  createOne(item: TeamspaceRequest): Promise<Teamspace> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        name: item.name,
        description: item.description || '',
        context: item.context || '',
        creatorId: item.creatorId,
      });

      if (!created) {
        throw new Error('Failed to create teamspace');
      }

      return created as Teamspace;
    }, 'Error creating teamspace');
  }

  createTeamspaceOrganizationRelation(teamspaceId: string, organizationId: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.createTeamspaceOrganizationRelation.execute({
        teamspaceId,
        organizationId,
      });
    }, 'Error creating teamspace organization relation');
  }

  updateOne(id: string, item: TeamspaceRequest): Promise<void> {
    return withErrorHandling(async () => {
      const teamspace = await this.findOne(id);

      if (!teamspace) {
        throw APIError.notFound('Teamspace not found');
      }

      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        description: item.description || '',
        context: item.context || '',
      });
    }, 'Error updating teamspace');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deleted] = await this.preparedStatements.deleteOne.execute({ id });
      if (!deleted) {
        throw APIError.notFound('Teamspace not found');
      }
    }, 'Error deleting teamspace');
  }
}

export const teamspaceRepository = TeamspaceRepository.getInstance<TeamspaceRepository>(
  teamspacePreparedStatements
);
