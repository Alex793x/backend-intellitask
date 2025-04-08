import { api } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { teamspaceService } from '../services/teamspace.service';
import { GenericResponse } from '../../shared/types';
import { TeamspaceMember, TeamspaceMemberRequest } from '../types';

/**
 * This API endpoint is used to get all members for a teamspace.
 */
export const getTeamspaceMembers = api(
  { expose: true, method: 'GET', path: '/teamspaces/:teamspaceId/members', auth: true },
  async (params: { teamspaceId: string }): Promise<GenericResponse<TeamspaceMember[]>> => {
    return {
      data: await teamspaceService.teamspaceMemberService.findManyByTeamspaceId(params.teamspaceId),
    };
  }
);

/**
 * This API endpoint is used to add a member to a teamspace.
 */
export const addTeamspaceMember = api<TeamspaceMemberRequest>(
  { expose: true, method: 'POST', path: '/teamspaces/:teamspaceId/members', auth: true },
  async (req): Promise<GenericResponse<TeamspaceMember>> => {
    const { userID } = getAuthData()!;

    // Include the inviter information
    const memberRequest = {
      ...req,
      invitedBy: userID,
    };

    return { data: await teamspaceService.teamspaceMemberService.createOne(memberRequest) };
  }
);

/**
 * This API endpoint is used to update a teamspace member.
 */
export const updateTeamspaceMember = api<Partial<TeamspaceMemberRequest> & { id: string }>(
  { expose: true, method: 'PATCH', path: '/teamspaces/members/:id', auth: true },
  async ({ id, ...data }): Promise<void> => {
    const { userID } = getAuthData()!;
    await teamspaceService.teamspaceMemberService.updateOne(id, data, userID);
  }
);

/**
 * This API endpoint is used to remove a member from a teamspace.
 */
export const removeTeamspaceMember = api(
  { expose: true, method: 'DELETE', path: '/teamspaces/members/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    const { userID } = getAuthData()!;
    // First verify that the current user has permission to remove members
    const member = await teamspaceService.teamspaceMemberService.findOne(params.id);
    const requesterMember = await teamspaceService.teamspaceMemberService.findByUserAndTeamspace(
      userID,
      member.teamspaceId
    );

    if (!requesterMember || !['OWNER', 'ADMIN'].includes(requesterMember.role)) {
      throw new Error('You do not have permission to remove members from this teamspace');
    }

    await teamspaceService.teamspaceMemberService.deleteOne(params.id);
  }
);
