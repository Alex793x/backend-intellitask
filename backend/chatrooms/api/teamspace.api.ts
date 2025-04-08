import { api, APIError } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { teamspaceService } from '../services/teamspace.service';
import { TeamspaceDto, TeamspaceRequest, MemberRole } from '../types';
import { GenericResponse } from '../../shared/types';

/**
 * This API endpoint is used to create a teamspace.
 */
export const createTeamspace = api<TeamspaceRequest>(
  { expose: true, method: 'POST', path: '/teamspaces', auth: true },
  async (req): Promise<GenericResponse<TeamspaceDto>> => {
    const { session, userID } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    // Check if creator is already in members list
    const creatorAlreadyInMembers = req.members.some((member) => member.userId === userID);

    const teamspaceRequest = {
      ...req,
      creatorId: userID,
      members: [
        ...req.members,
        // Ensure creator is an owner of the teamspace, only if not already in members list
        ...(creatorAlreadyInMembers
          ? []
          : [
              {
                userId: userID,
                teamspaceId: '', // Will be filled in by service
                role: MemberRole.OWNER,
                invitedByUserId: userID,
                hasAccepted: true,
              },
            ]),
      ],
    };

    const createdTeamspace = await teamspaceService.createOne(teamspaceRequest);
    await teamspaceService.createTeamspaceOrganizationRelation(
      createdTeamspace.id,
      session.activeOrganizationId
    );

    return { data: createdTeamspace };
  }
);

/**
 * This API endpoint is used to get all teamspaces for the current organization.
 */
export const getTeamspaces = api(
  { expose: true, method: 'GET', path: '/teamspaces', auth: true },
  async (): Promise<GenericResponse<TeamspaceDto[]>> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return { data: await teamspaceService.findByOrganizationId(session.activeOrganizationId) };
  }
);

/**
 * This API endpoint is used to get a teamspace by ID.
 */
export const getTeamspace = api(
  { expose: true, method: 'GET', path: '/teamspaces/:id', auth: true },
  async (params: { id: string }): Promise<GenericResponse<TeamspaceDto>> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return { data: await teamspaceService.findOne(params.id, session.activeOrganizationId) };
  }
);

export const getParticipatingTeamspaces = api(
  { expose: true, method: 'GET', path: '/teamspaces/participating', auth: true },
  async (): Promise<GenericResponse<TeamspaceDto[]>> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return { data: await teamspaceService.findByUserId(userID, session.activeOrganizationId) };
  }
);

/**
 * This API endpoint is used to update a teamspace.
 */
export const updateTeamspace = api<TeamspaceRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/teamspaces/:id', auth: true },
  async ({ id, ...data }): Promise<void> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    await teamspaceService.updateOne(id, data);
  }
);

export const changeTeamspaceMemberStatus = api<
  { kickStatus: boolean } & { id: string; memberId: string }
>(
  { expose: true, method: 'PATCH', path: '/teamspaces/:id/kick-member/:memberId', auth: true },
  async ({ kickStatus, id, memberId }): Promise<void> => {
    const { session } = getAuthData()!;

    const kickerId = session.userId;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    await teamspaceService.changeTeamspaceMemberStatus(session, id, memberId, kickerId, kickStatus);
  }
);

/**
 * This API endpoint is used to delete a teamspace.
 */
export const deleteTeamspace = api(
  { expose: true, method: 'DELETE', path: '/teamspaces/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    await teamspaceService.deleteOne(params.id);
  }
);
