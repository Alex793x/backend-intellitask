import { auth, fileManagement } from '~encore/clients';
import { BaseService } from '../../shared/base/baseService';
import { projectRepository, ProjectRepository } from '../repositories/project.repository';
import { MemberRole, Project, ProjectDto, ProjectRequest } from '../types';
import { db } from '../db/db';
import { ProjectMemberService, projectMemberService } from './projectMember.service';
import { mapProjectMemberToMemberWithUserDto } from '../utils/teamspace.mapper';
import { chatroomService } from './chatroom.service';
import { APIError } from 'encore.dev/api';
import { chatroomMemberService } from './chatroomMember.service';
import { CustomSession } from '../../auth/types';
import { cleanFileData } from '../utils/files.mapper';

export class ProjectService extends BaseService<Project, ProjectRequest, ProjectDto> {
  constructor(
    protected readonly repository: ProjectRepository,
    public readonly projectMemberService: ProjectMemberService
  ) {
    super(repository);
  }

  protected override async transformEntity(project: Project): Promise<ProjectDto> {
    // Fetch user information for all members
    const userIds = project.members?.map((member) => member.userId) || [];
    const chatroomIds = project.chatrooms?.map((chatroom) => chatroom.id) || [];
    const chatroomsData = await chatroomService.findByIds(chatroomIds);
    const usersData = await auth.getUsersByIds({ userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    const fileIds = project.files?.map((file) => file.id) || [];

    let fileMap = new Map();
    if (fileIds.length > 0) {
      const filesData = await fileManagement.getFilesByIds({ fileIds });
      // Clean file data before mapping
      const cleanedFilesData = filesData.data.map((file) => cleanFileData(file));
      fileMap = new Map(cleanedFilesData.map((file) => [file.id, file]));
    }
    // Map members with user information
    const membersWithUsers = project.members
      ? project.members.map((member) =>
          mapProjectMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
        )
      : [];

    console.log('membersWithUsers ====>>>>>', membersWithUsers.length);

    return {
      ...project,
      members: membersWithUsers.filter((member) =>
        project.members?.some((m) => m.userId === member.user.id && member.projectId === project.id)
      ),
      chatrooms: chatroomsData,
      files: project.files?.map((file) => fileMap.get(file.id) || file) || [],
    } as ProjectDto;
  }

  protected override async transformEntities(projects: Project[]): Promise<ProjectDto[]> {
    const chatroomIds = projects.flatMap(
      (project) => project.chatrooms?.map((chatroom) => chatroom.id) || []
    );
    const userIds = projects.flatMap(
      (project) => project.members?.map((member) => member.userId) || []
    );
    const fileIds = projects.flatMap((project) => project.files?.map((file) => file.fileId) || []);
    const chatroomsData = await chatroomService.findByIds(chatroomIds);
    const usersData = await auth.getUsersByIds({ userIds });
    const userMap = new Map(usersData.data.map((user) => [user.id, user]));

    let fileMap = new Map();
    if (fileIds.length > 0) {
      const filesData = await fileManagement.getFilesByIds({ fileIds });
      // Clean file data before mapping
      const cleanedFilesData = filesData.data.map((file) => cleanFileData(file));
      fileMap = new Map(cleanedFilesData.map((file) => [file.id, file]));
    }

    const membersWithUsers = projects.flatMap(
      (project) =>
        project.members?.map((member) =>
          mapProjectMemberToMemberWithUserDto(member, userMap.get(member.userId)!)
        ) || []
    );

    console.log('membersWithUsers ====>>>>>', membersWithUsers.length);

    return projects.map((project) => ({
      ...project,
      members: membersWithUsers.filter((member) =>
        project.members?.some((m) => m.userId === member.user.id && member.projectId === project.id)
      ),
      chatrooms: chatroomsData.filter((chatroom) => chatroom.projectId === project.id),
      files: project.files?.map((file) => fileMap.get(file.fileId)) || [],
    }));
  }

  public override async findOne(id: string, organizationId?: string): Promise<ProjectDto> {
    const project = await this.repository.findOne(id, organizationId);
    return this.transformEntity(project);
  }

  public async findByUserId(userId: string, organizationId?: string): Promise<ProjectDto[]> {
    const projects = await this.repository.findByUserId(userId, organizationId);
    return this.transformEntities(projects);
  }

  public async findByIds(projectIds: string[], organizationId?: string): Promise<ProjectDto[]> {
    const projects = await this.repository.findByIds(projectIds, organizationId);
    return this.transformEntities(projects);
  }

  async findByTeamspaceId(teamspaceId: string, organizationId?: string): Promise<ProjectDto[]> {
    const projects = await this.repository.findByTeamspaceId(teamspaceId, organizationId);
    return this.transformEntities(projects);
  }

  override async createOne(item: ProjectRequest): Promise<ProjectDto> {
    return db.transaction(async () => {
      // Create the project
      const createdProject = await this.repository.createOne(item);

      // Create project members
      const createdProjectMembers = await this.projectMemberService.createMany(
        item.members.map((member) => ({
          ...member,
          projectId: createdProject.id,
        }))
      );

      // Add the members to the project
      createdProject.members = createdProjectMembers;

      // Transform and return the project DTO
      return this.transformEntity(createdProject);
    });
  }

  override async updateOne(
    id: string,
    item: Partial<ProjectRequest>,
    organizationId?: string
  ): Promise<ProjectDto> {
    // First check if the project exists in the organization
    if (organizationId) {
      await this.findOne(id, organizationId);
    }

    const updatedProject = await this.repository.updateOne(id, item);
    return this.transformEntity(updatedProject as Project);
  }

  async changeProjectMemberStatus(
    session: CustomSession,
    projectId: string,
    memberId: string,
    kickerId: string,
    kickStatus: boolean
  ): Promise<void> {
    await db.transaction(async () => {
      const project = await this.repository.findOne(projectId);
      if (!project) {
        throw APIError.notFound('Project not found');
      }

      const kickerHasKickerRights = project.members?.some(
        (member) =>
          member.userId === kickerId && [MemberRole.OWNER, MemberRole.ADMIN].includes(member.role)
      );

      if (!kickerHasKickerRights) {
        throw APIError.permissionDenied('You do not have permission to kick this project member');
      }

      await this.projectMemberService.changeProjectMemberStatus(projectId, memberId, kickStatus);

      // Find all chatrooms that are connected to the project
      const chatrooms = await chatroomService.findByProjectId(
        projectId,
        session.activeOrganizationId!
      );

      if (chatrooms.length > 0) {
        for (const chatroom of chatrooms) {
          await chatroomMemberService.kickChatroomMember(
            chatroom.id,
            chatroom.members.find((member) => member.user.id === memberId)!.id,
            chatroom.type,
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
}

export const projectService = ProjectService.getInstance<ProjectService>(
  projectRepository,
  projectMemberService
);
