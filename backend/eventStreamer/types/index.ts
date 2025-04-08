export enum NotificationType {
  // INVITATIONS
  ORGANIZATION_INVITATION = 'ORGANIZATION_INVITATION',

  // ORGANIZATION
  ORGANIZATION = 'ORGANIZATION',
}

export enum NotificationHandling {
  ACCEPTED = 'ACCEPTED',
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  KICKED = 'KICKED',
  REJECTED = 'REJECTED',
  RECEIVED = 'RECEIVED',
}

export interface Notification {
  notificationType: NotificationType;
  notificationHandling: NotificationHandling;
}

export interface NotificationEvent<T extends Notification> {
  receiverIds: string[];
  notification: T;
  initializerId: string;
  organizationId: string;
}

export type SpecificNotificationEvent = OrganizationKickedMemberNotification | OrganizationInvitationNotification;

// ===========================================
//      SPECIFIC NOTIFICAITON EVENTS
// ===========================================

// ORGANIZATON NOTIFICAION EVENTS
export interface OrganizationInvitationNotification extends Notification {
  memberName: string;
  organizationName: string;
}

// ORGANIZATON EVENTS
export interface OrganizationKickedMemberNotification extends Notification {
  kickedMemberUserId: string;
  organizationName: string;
}
