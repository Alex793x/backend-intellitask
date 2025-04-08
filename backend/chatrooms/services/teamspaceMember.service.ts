import { APIError } from 'encore.dev/api';
import { BaseService } from '../../shared/base/baseService';
import {
  teamspaceMemberRepository,
  TeamspaceMemberRepository,
} from '../repositories/teamspaceMember.repository';
import { MemberRole, TeamspaceMember, TeamspaceMemberRequest } from '../types';

export class TeamspaceMemberService extends BaseService<TeamspaceMember, TeamspaceMemberRequest> {
  protected constructor(protected readonly repository: TeamspaceMemberRepository) {
    super(repository);
  }

  public async createMany(items: TeamspaceMemberRequest[]): Promise<TeamspaceMember[]> {
    return this.repository.createMany(items);
  }

  public async findManyByTeamspaceId(teamspaceId: string): Promise<TeamspaceMember[]> {
    return this.repository.findManyByTeamspaceId(teamspaceId);
  }

  public async findByUserAndTeamspace(
    userId: string,
    teamspaceId: string
  ): Promise<TeamspaceMember | null> {
    return this.repository.findByUserAndTeamspace(userId, teamspaceId);
  }

  override async updateOne(
    id: string,
    item: Partial<TeamspaceMemberRequest>,
    requesterUserId?: string
  ): Promise<void> {
    if (requesterUserId) {
      // Check if the requester has permissions to update the teamspace member
      const teamspace = await this.repository.findOne(id);
      const requesterMember = await this.repository.findByUserAndTeamspace(
        requesterUserId,
        teamspace.teamspaceId
      );

      if (!requesterMember) {
        throw APIError.permissionDenied('You are not a member of this teamspace');
      }

      if (![MemberRole.OWNER, MemberRole.ADMIN].includes(requesterMember.role)) {
        throw APIError.permissionDenied(
          'You do not have permission to update this teamspace member'
        );
      }
    }

    await this.repository.updateOne(id, item);
  }

  public async changeTeamspaceMemberStatus(
    teamspaceId: string,
    memberId: string,
    kickStatus: boolean
  ): Promise<void> {
    await this.repository.updateOne(memberId, {
      teamspaceId,
      hasLeft: kickStatus,
    });
  }

  public async deleteManyByTeamspaceId(teamspaceId: string): Promise<void> {
    return this.repository.deleteManyByTeamspaceId(teamspaceId);
  }
}

export const teamspaceMemberService =
  TeamspaceMemberService.getInstance<TeamspaceMemberService>(teamspaceMemberRepository);
