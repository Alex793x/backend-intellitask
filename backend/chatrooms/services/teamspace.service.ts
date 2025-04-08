import { auth, fileManagement } from '~encore/clients';
import { BaseService } from '../../shared/base/baseService';
import { teamspaceRepository, TeamspaceRepository } from '../repositories/teamspace.repository';
import {
  Teamspace,
  TeamspaceDto,
  TeamspaceRequest,
  TeamspaceNoUsersDto,
  MemberRole,
} from '../types';
import { db } from '../db/db';
import { TeamspaceMemberService, teamspaceMemberService } from './teamspaceMember.service';
import {
  mapProjectToProjectDto,
  mapTeamspaceMemberToMemberWithUserDto,
} from '../utils/teamspace.mapper';
import { projectService } from './project.service';
import { CustomSession } from '../../auth/types';
import { APIError } from 'encore.dev/api';
export class TeamspaceService extends BaseService<Teamspace, TeamspaceRequest, TeamspaceDto> {
  protected constructor(
    protected readonly repository: TeamspaceRepository,
    public readonly teamspaceMemberService: TeamspaceMemberService
  ) {
    super(repository);
  }

  protected override async transformEntity(teamspace: Teamspace): Promise<TeamspaceDto> {
    // Fetch user information for all members
    const userIds = teamspace.members?.map((member) => member.userId) || [];
    const projectIds = teamspace.projects?.map((project) => project.id) || [];
    const projectsData = await projectService.findByIds(projectIds);
    const usersData = await auth.getUsersByIds({ userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    // Map members with user information
    const membersWithUsers = teamspace.members
      ? teamspace.members.map((member) =>
          mapTeamspaceMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
        )
      : [];

    // Return teamspace DTO with transformed members
    return {
      ...teamspace,
      members: membersWithUsers,
      files: [], // Return empty arrays for now until the file functionality is implemented
      projects: projectsData,
    } as TeamspaceDto;
  }

  protected override async transformEntities(teamspaces: Teamspace[]): Promise<TeamspaceDto[]> {
    const userIds = teamspaces.flatMap(
      (teamspace) => teamspace.members?.map((member) => member.userId) || []
    );
    const projectIds = teamspaces.flatMap(
      (teamspace) => teamspace.projects?.map((project) => project.id) || []
    );
    const projectsData = await projectService.findByIds(projectIds);
    const projectMap = new Map(projectsData.map((project) => [project.id, project]));
    const usersData = await auth.getUsersByIds({ userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));
    console.log('teamspaces =======>>>>', teamspaces);

    const filesIds = teamspaces?.flatMap(
      (teamspace) => teamspace.files?.map((file) => file.id) || []
    );

    // Only fetch files if there are any file IDs to fetch
    let fileMap = new Map();
    if (filesIds.length > 0) {
      const filesData = await fileManagement.getFilesByIds({ fileIds: filesIds });
      fileMap = new Map(filesData.data.map((file) => [file.id, file]));
    }

    const membersWithUsers = teamspaces.map((teamspace) =>
      teamspace.members?.map((member) =>
        mapTeamspaceMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
      )
    );

    return teamspaces.map((teamspace, index) => {
      // Get only the projects that belong to this teamspace
      const { organizations, ...teamspaceWithoutOrganizations } = teamspace;
      const teamspaceProjects =
        teamspace.projects?.map((project) => projectMap.get(project.id)).filter(Boolean) || [];

      return {
        ...teamspaceWithoutOrganizations,
        members:
          membersWithUsers[index]?.filter((member) => member.teamspaceId === teamspace.id) || [],
        files: teamspace.files?.map((file) => fileMap.get(file.id) || file) || [],
        projects: teamspaceProjects.map((project) => ({
          ...project!,
          members: project!.members?.map((member) => ({
            ...member,
            user: userMap.get(member.user.id) || member.user,
          })),
        })),
      };
    });
  }

  protected async transformTeamspaceNoUsersDto(
    teamspace: TeamspaceNoUsersDto
  ): Promise<TeamspaceDto> {
    const teamspaceUserIds = teamspace.members?.map((member) => member.userId) || [];

    const projectUserIds =
      teamspace.projects?.flatMap(
        (project) => project.members?.map((member) => member.userId) || []
      ) || [];

    const usersData = await auth.getUsersByIds({
      userIds: [...teamspaceUserIds, ...projectUserIds],
    });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    const membersWithUsers = teamspace.members
      ? teamspace.members.map((member) =>
          mapTeamspaceMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
        )
      : [];

    const projectsWithUsers = teamspace.projects
      ? teamspace.projects.map((project) =>
          mapProjectToProjectDto(project, userMap.get(project.creatorId)!)
        )
      : [];

    return {
      ...teamspace,
      members: membersWithUsers,
      files: [],
      projects: projectsWithUsers,
    } as TeamspaceDto;
  }

  override async createOne(item: TeamspaceRequest): Promise<TeamspaceDto> {
    return db.transaction(async () => {
      // Create the teamspace
      const createdTeamspace = await this.repository.createOne(item);

      // Create teamspace members
      const createdTeamspaceMembers = await this.teamspaceMemberService.createMany(
        item.members.map((member) => ({
          ...member,
          teamspaceId: createdTeamspace.id,
        }))
      );

      // Add the members to the teamspace
      createdTeamspace.members = createdTeamspaceMembers;

      // Transform and return the teamspace DTO
      return this.transformEntity(createdTeamspace);
    });
  }

  public async createTeamspaceOrganizationRelation(
    teamspaceId: string,
    organizationId: string
  ): Promise<void> {
    await this.repository.createTeamspaceOrganizationRelation(teamspaceId, organizationId);
  }

  public async findByOrganizationId(organizationId: string): Promise<TeamspaceDto[]> {
    const teamspaces = await this.repository.findByOrganizationId(organizationId);
    return Promise.all(teamspaces.map((teamspace) => this.transformTeamspaceNoUsersDto(teamspace)));
  }

  public async findByUserId(userId: string, organizationId?: string): Promise<TeamspaceDto[]> {
    const teamspaces = await this.repository.findByUserId(userId, organizationId);
    return this.transformEntities(teamspaces);
  }

  public async changeTeamspaceMemberStatus(
    session: CustomSession,
    teamspaceId: string,
    memberId: string,
    kickerId: string,
    kickStatus: boolean
  ): Promise<void> {
    await db.transaction(async () => {
      const teamspace = await this.repository.findOne(teamspaceId);
      if (!teamspace) {
        throw APIError.notFound('Teamspace not found');
      }

      const kickerHasKickerRights = teamspace.members?.some(
        (member) =>
          member.userId === kickerId && [MemberRole.OWNER, MemberRole.ADMIN].includes(member.role)
      );

      if (!kickerHasKickerRights) {
        throw APIError.permissionDenied('You do not have permission to kick this teamspace member');
      }

      const teamspaceMember = teamspace.members?.find((member) => member.userId === memberId);

      await this.teamspaceMemberService.changeTeamspaceMemberStatus(
        teamspaceId,
        memberId,
        kickStatus
      );

      const projects = await projectService.findByTeamspaceId(teamspaceId);
      for (const project of projects) {
        const projectMember = project.members?.find(
          (member) => member.user.id === teamspaceMember?.userId
        );
        if (projectMember) {
          await projectService.changeProjectMemberStatus(
            session,
            project.id,
            projectMember.id,
            kickerId,
            kickStatus
          );
        }
      }
    });
  }

  override async deleteOne(id: string): Promise<void> {
    await db.transaction(async () => {
      await this.repository.deleteOne(id);
    });
  }

  public override async findOne(id: string, organizationId?: string): Promise<TeamspaceDto> {
    const teamspace = await this.repository.findOne(id, organizationId);
    return this.transformEntity(teamspace);
  }
}

export const teamspaceService = TeamspaceService.getInstance<TeamspaceService>(
  teamspaceRepository,
  teamspaceMemberService
);
