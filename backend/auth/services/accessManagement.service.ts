// IMPLEMENT SERVICE LAYER FOR ACCESS MANAGEMENT USING CLERK AND AI RESTRICTIONS ETC.
import { userRepository } from '../repositories/user.repository';
import { organizationRepository } from '../repositories/organization.repository';
import { userMapper } from '../mapper/users.mapper';

import Singleton from '../../shared/base/singleton';
import { UserDto } from '../types';

export class AccessManagementService extends Singleton {
  constructor() {
    super();
  }

  // ==================================================
  // Users
  // ==================================================

  public async findUserById(userId: string): Promise<UserDto> {
    const user = await userRepository.findOne(userId);
    return userMapper.mapUser(user);
  }

  public async findUserByEmail(email: string): Promise<UserDto> {
    const user = await userRepository.findByEmail(email);
    return userMapper.mapUser(user);
  }

  public async findUserByInvitationId(invitationId: string): Promise<UserDto> {
    const user = await userRepository.findUserByInvitationId(invitationId);
    return userMapper.mapUser(user);
  }

  public async findAllUsers(): Promise<UserDto[]> {
    const users = await userRepository.findAll();
    return users.map((user) => userMapper.mapUser(user));
  }

  public async findManyUsersByIds(userIds: string[]): Promise<UserDto[]> {
    const foundUsers = await userRepository.findManyByUserIds(userIds);
    return foundUsers.map((user) => userMapper.mapUser(user));
  }

  // ==================================================
  // Organizations
  // ==================================================

  public async findActoveOrganizationByUserId(sessionId: string) {
    const organization = await organizationRepository.findActiveOrganizationBySessionId(sessionId);
    return organization;
  }

  public async findOrganizationById(organizationId: string) {
    const organization = await organizationRepository.findOne(organizationId);
    return organization;
  }

  public async findAllOrganizations() {
    const organizations = await organizationRepository.findAll();
    return organizations;
  }

  public async findOrganizationsAttendedByUser(userId: string) {
    const organizations = await organizationRepository.findOrganizationsAttendedByUser(userId);
    return organizations;
  }

  public async findOrganizationInvitationsByEmail(email: string) {
    const organizations = await organizationRepository.findOrganizationInvitationsByEmail(email);
    return organizations;
  }

  public async findOrganizationMemberByOrgIdAndUserId(userId: string, organizationId: string) {
    const member = await organizationRepository.findOrganizationMemberByOrgIdAndUserId(
      userId,
      organizationId
    );
    return member;
  }

  public async findOrganizationByInvitationId(invitationId: string) {
    const organization = await organizationRepository.findOrganizationByInvitationId(invitationId);
    return organization;
  }
}

export const accessManagementService =
  AccessManagementService.getInstance<AccessManagementService>();
