import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import {
  InvitationDto,
  Member,
  Organization,
  OrganizationCreateRequest,
  OrganizationWithMembers,
} from '../types';
import {
  organizationPreparedStatement,
  OrganizationPreparedStatement,
} from './organization.reposiroty.preparedStatement';

export class OrganizationRepository extends BaseRepository<
  Organization,
  OrganizationCreateRequest
> {
  constructor(private readonly preparedStatement: OrganizationPreparedStatement) {
    super();
  }

  findOne(id: string): Promise<OrganizationWithMembers> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findOne.execute({ id });
      const members = Array.isArray(result[0].members)
        ? result[0].members
        : result[0].members
        ? [{ ...result[0].members, teamId: result[0].members.teamId ?? '' }]
        : [];

      const organization: OrganizationWithMembers = {
        ...result[0].organizations,
        logo: result[0].organizations.logo ?? '',
        metadata: result[0].organizations.metadata ?? '',
        members,
      };
      return organization as OrganizationWithMembers;
    }, 'Error finding organization');
  }

  findActiveOrganizationBySessionId(sessionId: string): Promise<Organization> {
    return withErrorHandling(async () => {
      const [sessionResult] =
        await this.preparedStatement.findActiveOrganizationBySessionId.execute({ sessionId });
      if (!sessionResult.activeOrganizationId) {
        console.log('No active organization found');
        return {} as Organization;
      }

      return await this.findOne(sessionResult.activeOrganizationId);
    }, 'Error finding active organization');
  }

  findAll(): Promise<Organization[]> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findAll.execute();
      return result as Organization[];
    }, 'Error retrieving organizations');
  }

  findOrganizationsAttendedByUser(userId: string): Promise<Organization[]> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findOrganizationsAttendedByUser.execute({
        userId,
      });
      return result as Organization[];
    }, 'Error retrieving organizations attended by user');
  }

  findOrganizationInvitationsByEmail(email: string): Promise<InvitationDto[]> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findOrganizationInvitationsByEmail.execute({
        email,
      });
      return result as InvitationDto[];
    }, 'Error retrieving organization invitations by users email');
  }

  createOne(item: OrganizationCreateRequest): Promise<Organization> {
    throw new Error('Better Auth manages creational.');
  }
  updateOne(id: string, item: OrganizationCreateRequest): Promise<void> {
    throw new Error('Better Auth manages updates.');
  }
  deleteOne(id: string): Promise<void> {
    throw new Error('Better Auth manages deletions.');
  }

  findOrganizationMemberByOrgIdAndUserId(userId: string, organizationId: string): Promise<Member> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findOrganizationMemberByOrgIdAndUserId.execute({
        organizationId,
        userId,
      });
      return result[0] as Member;
    }, 'Error retrieving organization invitations by users email');
  }

  findOrganizationByInvitationId(invitationId: string): Promise<OrganizationWithMembers> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findOrganizationByInvitationId.execute({
        invitationId,
      });

      const members = Array.isArray(result[0].members)
        ? result[0].members
        : result[0].members
        ? [{ ...result[0].members, teamId: result[0].members.teamId ?? '' }]
        : [];

      const organization: OrganizationWithMembers = {
        ...result[0].organization,
        logo: result[0].organization.logo ?? '',
        metadata: result[0].organization.metadata ?? '',
        members,
      };
      return organization as OrganizationWithMembers;
    }, 'Error retrieving organization by invitationId email');
  }
}

export const organizationRepository = OrganizationRepository.getInstance<OrganizationRepository>(
  organizationPreparedStatement
);
