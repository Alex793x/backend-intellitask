import { api, APIError } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { projectService } from '../services/project.service';
import { ProjectDto, ProjectRequest, MemberRole } from '../types';
import { GenericResponse } from '../../shared/types';
import { teamspaceService } from '../services/teamspace.service';
import { chatroomService } from '../services/chatroom.service';
import { chatroomMemberService } from '../services/chatroomMember.service';

/**
 * This API endpoint is used to create a project.
 */
export const createProject = api<ProjectRequest>(
  { expose: true, method: 'POST', path: '/projects', auth: true },
  async (req): Promise<GenericResponse<ProjectDto>> => {
    const { userID } = getAuthData()!;

    // Check if user is a member of the teamspace
    const teamspaceMember = await teamspaceService.teamspaceMemberService.findByUserAndTeamspace(
      userID,
      req.teamspaceId
    );

    if (!teamspaceMember) {
      throw new Error('You must be a member of the teamspace to create a project');
    }

    // Check if creator is already in members list
    const creatorAlreadyInMembers = req.members.some((member) => member.userId === userID);

    // Include the creator as an owner of the project
    const projectRequest = {
      ...req,
      creatorId: userID,
      members: [
        ...req.members,
        // Add creator as owner only if not already in members list
        ...(creatorAlreadyInMembers
          ? []
          : [
              {
                userId: userID,
                projectId: '', // Will be filled in by service
                role: MemberRole.OWNER,
                invitedByUserId: userID,
                hasAccepted: true,
              },
            ]),
      ],
    };

    return { data: await projectService.createOne(projectRequest) };
  }
);

export const changeProjectMemberStatus = api<{ kickStatus: boolean } & { id: string; memberId: string }>(
  { expose: true, method: 'PATCH', path: '/projects/:id/kick-member/:memberId', auth: true },
  async ({ kickStatus, id, memberId }): Promise<void> => {
    const { session } = getAuthData()!;

    const kickerId = session.userId;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }


    await projectService.changeProjectMemberStatus(session, id, memberId, kickerId, kickStatus);
  }
);

/**
 * This API endpoint is used to get all projects for a teamspace.
 */
export const getProjects = api(
  { expose: true, method: 'GET', path: '/teamspaces/:teamspaceId/projects', auth: true },
  async (params: { teamspaceId: string }): Promise<GenericResponse<ProjectDto[]>> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return {
      data: await projectService.findByTeamspaceId(
        params.teamspaceId,
        session.activeOrganizationId
      ),
    };
  }
);

/**
 * This API endpoint is used to get a project by ID.
 */
export const getProject = api(
  { expose: true, method: 'GET', path: '/projects/:id', auth: true },
  async (params: { id: string }): Promise<GenericResponse<ProjectDto>> => {
    const { session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return { data: await projectService.findOne(params.id, session.activeOrganizationId) };
  }
);

/**
 * This API endpoint is used to update a project.
 */
export const updateProject = api<Partial<ProjectRequest> & { id: string }>(
  { expose: true, method: 'PATCH', path: '/projects/:id', auth: true },
  async ({ id, ...data }): Promise<GenericResponse<ProjectDto>> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    // Verify the user has rights to update this project
    const project = await projectService.findOne(id, session.activeOrganizationId);
    if (!project) {
      throw APIError.notFound('Project not found');
    }
    const projectMember = await projectService.projectMemberService.findByUserAndProject(
      userID,
      project.id
    );

    if (!projectMember || !['OWNER', 'ADMIN'].includes(projectMember.role)) {
      throw APIError.permissionDenied('You do not have permission to update this project');
    }

    return { data: await projectService.updateOne(id, data, session.activeOrganizationId) };
  }
);

/**
 * This API endpoint is used to delete a project.
 */
export const deleteProject = api(
  { expose: true, method: 'DELETE', path: '/projects/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    // First check if project exists in the organization
    await projectService.findOne(params.id, session.activeOrganizationId);

    // Verify the user has rights to delete this project
    const projectMember = await projectService.projectMemberService.findByUserAndProject(
      userID,
      params.id
    );

    if (!projectMember || projectMember.role !== MemberRole.OWNER) {
      throw new Error('You must be the owner to delete this project');
    }

    await projectService.deleteOne(params.id);
  }
);

/**
 * This API endpoint is used to get all projects the current user has access to.
 */
export const getUserProjects = api(
  { expose: true, method: 'GET', path: '/user/projects', auth: true },
  async (): Promise<GenericResponse<ProjectDto[]>> => {
    const { userID, session } = getAuthData()!;

    if (!session.activeOrganizationId) {
      throw APIError.permissionDenied;
    }

    return { data: await projectService.findByUserId(userID, session.activeOrganizationId) };
  }
);
