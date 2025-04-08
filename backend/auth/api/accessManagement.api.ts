import { api, APIError } from 'encore.dev/api';
import { accessManagementService } from '../services/accessManagement.service';
import { GenericResponse } from '../../shared/types';
import { InvitationDto, Organization, UserDto } from '../types';
import { getAuthData } from '~encore/auth';

// ==================================================
// Users
// ==================================================

export const getUserById = api<{ id: string }, GenericResponse<UserDto>>(
  { expose: false, method: 'GET', path: '/users/:id', auth: false },
  async (params: { id: string }): Promise<GenericResponse<UserDto>> => {
    return { data: await accessManagementService.findUserById(params.id) };
  }
);

export const getAllUsers = api<{}, GenericResponse<UserDto[]>>(
  { expose: false, method: 'GET', path: '/users', auth: false },
  async (): Promise<GenericResponse<UserDto[]>> => {
    return { data: await accessManagementService.findAllUsers() };
  }
);

export const getUsersByIds = api<{ userIds: string[] }, GenericResponse<UserDto[]>>(
  { expose: false, method: 'POST', path: '/users/by-ids', auth: false },
  async (req): Promise<GenericResponse<UserDto[]>> => {
    return { data: await accessManagementService.findManyUsersByIds(req.userIds) };
  }
);

// ==================================================
// Organizations
// ==================================================

export const getOrganizationById = api<{ id: string }, GenericResponse<Organization>>(
  { expose: false, method: 'GET', path: '/organizations/:id', auth: false },
  async (params: { id: string }): Promise<GenericResponse<Organization>> => {
    return { data: await accessManagementService.findOrganizationById(params.id) };
  }
);

export const getAllOrganizations = api<{}, GenericResponse<Organization[]>>(
  { expose: false, method: 'GET', path: '/organizations', auth: false },
  async (): Promise<GenericResponse<Organization[]>> => {
    return { data: await accessManagementService.findAllOrganizations() };
  }
);

export const getOrganizationsAttendedByUser = api<{}, GenericResponse<Organization[]>>(
  { expose: true, method: 'GET', path: '/organizations/attended-by-user', auth: true },
  async (): Promise<GenericResponse<Organization[]>> => {
    const userId = getAuthData()?.userID;
    if (!userId) throw APIError.invalidArgument('UserId is not provided!');
    return { data: await accessManagementService.findOrganizationsAttendedByUser(userId) };
  }
);

export const getIfUserHasActiveOrganization = api<
  {},
  GenericResponse<{ hasActiveOrganization: boolean }>
>(
  { expose: true, method: 'GET', path: '/organizations/has-active', auth: true },
  async (): Promise<GenericResponse<{ hasActiveOrganization: boolean }>> => {
    const session = getAuthData()!.session;
    if (!session) throw APIError.invalidArgument('UserId is not provided!');
    const activeOrganization = await accessManagementService.findActoveOrganizationByUserId(
      session.id
    );
    return { data: { hasActiveOrganization: activeOrganization.id ? true : false } };
  }
);

// export const getUserActiveOrganizationRole = api<{}, GenericResponse<{ member: Member }>>(
//   { expose: false, method: 'GET', path: '/organizations/active-member', auth: true },
//   async (): Promise<GenericResponse<{ member: Member }>> => {
//     const session = getAuthData()!.session;
//     console.log('SESSION', session);
//     if (!session) throw APIError.invalidArgument('UserId is not provided!');
//     const activeOrgMember = await accessManagementService.findOrganizationMemberByOrgIdAndUserId(
//       session.userId,
//       session
//     );
//     console.log('HEYO', activeOrgMember);
//     return { data: { member: activeOrgMember } };
//   }
// );

export const getOrganizationInvitationsByEmail = api<{}, GenericResponse<InvitationDto[]>>(
  { expose: true, method: 'GET', path: '/organizations/invitations', auth: true },
  async (): Promise<GenericResponse<InvitationDto[]>> => {
    const email = getAuthData()?.user.email;
    if (!email) throw APIError.invalidArgument('Email is not provided!');
    return {
      data: await accessManagementService.findOrganizationInvitationsByEmail(email),
    };
  }
);
