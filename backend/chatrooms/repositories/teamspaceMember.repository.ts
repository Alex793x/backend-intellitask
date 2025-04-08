import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { TeamspaceMember, TeamspaceMemberRequest } from '../types';
import { db } from '../db/db';
import { teamspaceMembers } from '../db/schema';
import {
  teamspaceMemberPreparedStatements,
  TeamspaceMemberPreparedStatements,
} from './teamspaceMember.repository.preparedStatements';
import { eq } from 'drizzle-orm';

export class TeamspaceMemberRepository extends BaseRepository<
  TeamspaceMember,
  TeamspaceMemberRequest
> {
  protected constructor(private readonly preparedStatements: TeamspaceMemberPreparedStatements) {
    super();
  }

  findOne(id: string): Promise<TeamspaceMember> {
    return withErrorHandling(async () => {
      const [teamspaceMember] = await this.preparedStatements.findOne.execute({ id });
      if (!teamspaceMember) {
        throw APIError.notFound('Teamspace member not found');
      }
      return teamspaceMember as TeamspaceMember;
    }, 'Error finding teamspace member');
  }

  findAll(): Promise<TeamspaceMember[]> {
    return withErrorHandling(async () => {
      const teamspaceMembers = await this.preparedStatements.findAll.execute();
      return teamspaceMembers as TeamspaceMember[];
    }, 'Error finding all teamspace members');
  }

  findManyByTeamspaceId(teamspaceId: string): Promise<TeamspaceMember[]> {
    return withErrorHandling(async () => {
      const teamspaceMembers = await this.preparedStatements.findManyByTeamspaceId.execute({
        teamspaceId,
      });
      return teamspaceMembers as TeamspaceMember[];
    }, 'Error finding teamspace members by teamspace id');
  }

  findByUserAndTeamspace(userId: string, teamspaceId: string): Promise<TeamspaceMember | null> {
    return withErrorHandling(async () => {
      const [teamspaceMember] = await this.preparedStatements.findByUserAndTeamspace.execute({
        userId,
        teamspaceId,
      });
      return teamspaceMember as TeamspaceMember | null;
    }, 'Error finding teamspace member by user and teamspace');
  }

  createOne(item: TeamspaceMemberRequest): Promise<TeamspaceMember> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        teamspaceId: item.teamspaceId,
        userId: item.userId,
        role: item.role,
        invitedByUserId: item.invitedByUserId,
        hasAccepted: false,
      });

      if (!created) {
        throw new Error('Failed to create teamspace member');
      }

      return created as TeamspaceMember;
    }, 'Error creating teamspace member');
  }

  createMany(items: TeamspaceMemberRequest[]): Promise<TeamspaceMember[]> {
    return withErrorHandling(async () => {
      const createdTeamspaceMembers = await db
        .insert(teamspaceMembers)
        .values(
          items.map((item) => ({
            teamspaceId: item.teamspaceId,
            userId: item.userId,
            role: item.role,
            invitedByUserId: item.invitedByUserId,
            hasAccepted: false,
          }))
        )
        .returning()
        .execute();

      return createdTeamspaceMembers as TeamspaceMember[];
    }, 'Error creating teamspace members');
  }

  updateOne(id: string, item: Partial<TeamspaceMemberRequest>): Promise<void> {
    return withErrorHandling(async () => {
      const foundTeamspaceMember = await this.findOne(id);

      if (!foundTeamspaceMember) {
        throw APIError.notFound('Teamspace member not found');
      }

      await this.preparedStatements.updateOne.execute({
        id,
        role: item.role ?? foundTeamspaceMember.role,
        hasLeft: item.hasLeft ?? foundTeamspaceMember.hasLeft,
      });
    }, 'Error updating teamspace member');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const [deleted] = await this.preparedStatements.deleteOne.execute({ id });
      if (!deleted) {
        throw APIError.notFound('Teamspace member not found');
      }
    }, 'Error deleting teamspace member');
  }

  deleteManyByTeamspaceId(teamspaceId: string): Promise<void> {
    return withErrorHandling(async () => {
      await db
        .delete(teamspaceMembers)
        .where(eq(teamspaceMembers.teamspaceId, teamspaceId))
        .execute();
    }, 'Error deleting teamspace members by teamspace id');
  }
}

export const teamspaceMemberRepository =
  TeamspaceMemberRepository.getInstance<TeamspaceMemberRepository>(
    teamspaceMemberPreparedStatements
  );
