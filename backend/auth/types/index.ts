// ==================================================
// USERS INTERFACES
// ==================================================

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: string;
  banned: boolean;
  banReason: string;
  banExpires: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  activeOrganizationId?: string | null | undefined;
  activeOrganizationMemberId?: string | null | undefined;
  activeOrganizationMemberRole?: string | null | undefined;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
}

export interface NewUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  activeOrganizationId?: string;
  impersonatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
}

export interface NewSession {
  id: string;
  token: string;
  userId: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
}

export interface Account {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
  scope?: string;
  idToken?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewAccount {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
  scope?: string;
  idToken?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewVerification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==================================================
// ORGANIZATIONS INTERFACES
// ==================================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string;
  metadata: string;
  createdAt: Date;
}

export interface NewOrganization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  metadata?: string;
  createdAt?: Date;
}

export interface Member {
  id: string;
  organizationId: string;
  teamId: string;
  userId: string;
  role: string;
  createdAt: Date;
}

export interface NewMember {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt?: Date;
}

export interface Team {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTeam {
  id: string;
  name: string;
  organizationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeamMemberRelation {
  id: string;
  teamId: string;
  memberId: string;
  hasLeft: boolean;
  joinedAt: Date;
}

export interface NewTeamMemberRelation {
  id: string;
  teamId: string;
  memberId: string;
  hasLeft?: boolean;
  joinedAt?: Date;
}

export interface Invitation {
  id: string;
  inviterId: string;
  organizationId: string;
  teamId?: string;
  email: string;
  status: string;
  role: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface NewInvitation {
  id: string;
  inviterId: string;
  organizationId: string;
  teamId?: string;
  email: string;
  status: string;
  role: string;
  expiresAt: Date;
  createdAt?: Date;
}

// ==================================================
// AI USAGE CONTROL INTERFACES
// ==================================================

export interface RestrictedAiProvider {
  id: string;
  organizationId: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewRestrictedAiProvider {
  id?: string;
  organizationId: string;
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestrictedAiBaseModel {
  id: string;
  organizationId: string;
  apiIdentifier: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewRestrictedAiBaseModel {
  id?: string;
  organizationId: string;
  apiIdentifier: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==================================================
// CUSTOM REQUEST INTERFACES
// ==================================================

export interface UserCreateRequest {
  name: string;
  email: string;
  image?: string;
  role?: string;
  password?: string;
}

export interface OrganizationCreateRequest {
  name: string;
  slug: string;
  logo?: string;
  metadata?: string;
  creatorId: string;
}

export interface TeamCreateRequest {
  name: string;
  organizationId: string;
}

export interface InvitationCreateRequest {
  inviterId: string;
  organizationId: string;
  teamId?: string;
  email: string;
  role: string;
  expiresInDays?: number;
}

export interface MemberCreateRequest {
  organizationId: string;
  userId: string;
  role: string;
}

export interface TeamMemberAddRequest {
  teamId: string;
  memberId: string;
}

export interface RestrictedAiProviderRequest {
  organizationId: string;
  provider: string;
}

export interface RestrictedAiBaseModelRequest {
  organizationId: string;
  apiIdentifier: string;
}

// ==================================================
// RESPONSE INTERFACES
// ==================================================

export interface AuthResponse {
  user: User;
  session: Session;
}

export interface OrganizationWithMembers extends Organization {
  members: Member[];
}

export interface TeamWithMembers extends Team {
  members: Member[];
}

// ==================================================
// DTO INTERFACES (FOR FRONTEND RESPONSES)
// ==================================================

/**
 * User DTO - excludes sensitive information when sending to frontend
 */
export interface UserDto {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: Date;
  // Banned fields and emailVerified are excluded
}

/**
 * Session DTO - Only expose necessary session data to frontend
 */
export interface SessionDto {
  id: string;
  userId: string;
  activeOrganizationId?: string;
  expiresAt: Date;
}

/**
 * Member DTO with user information
 */
export interface MemberDto {
  role: string;
  createdAt: Date;
  user: UserDto; // Include associated user data
}

/**
 * Team DTO for frontend
 */
export interface TeamDto extends Team {
  memberCount?: number; // Optional computed field
}

/**
 * Invitation DTO for frontend
 */
export interface InvitationDto {
  id: string;
  inviterId: string;
  organization: Organization;
  teamId?: string;
  email: string;
  status: string;
  role: string;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * DTO for team with its members
 */
export interface TeamWithMembersDto extends TeamDto {
  members: MemberDto[];
}

/**
 * DTO for organization with its members
 */
export interface OrganizationWithMembersDto extends Organization {
  members: MemberDto[];
}

/**
 * Full Auth Response DTO for frontend
 */
export interface AuthResponseDto {
  user: UserDto;
  session: SessionDto;
  organizations?: Organization[]; // User's organizations
  activeOrganization?: Organization; // Currently active organization
}
