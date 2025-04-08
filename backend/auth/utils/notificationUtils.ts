import { organization } from 'better-auth/plugins';
import {
  NotificationHandling,
  NotificationType,
  OrganizationInvitationNotification,
  OrganizationKickedMemberNotification,
  SpecificNotificationEvent,
} from '../../eventStreamer/types';
import { OrganizationInvitationTopic } from '../api/auth.messaging';
import { accessManagementService } from '../services/accessManagement.service';

export async function publishInvitationEvent(
  path: string,
  invitationId: string,
  userId: string,
  memberName: string
) {
  const organization = await accessManagementService.findOrganizationByInvitationId(invitationId);

  if (path === '/organization/accept-invitation') {
    const acceptInvNotication = getInivationNotification(
      NotificationHandling.ACCEPTED,
      memberName,
      organization.id
    );

    publishEvent(
      userId,
      acceptInvNotication,
      organization.id,
      organization.members.map((mem) => mem.userId)
    );
  } else if (path === '/organization/cancel-invitation') {
    const canceledInvitedUser = await accessManagementService.findUserByInvitationId(invitationId);
    if (!canceledInvitedUser) return;

    const canceledInvitationNotification = getInivationNotification(
      NotificationHandling.CANCELED,
      memberName,
      organization.name
    );
    publishEvent(userId, canceledInvitationNotification, organization.id, [canceledInvitedUser.id]);
  } else if (path === '/organization/reject-invitation') {
  }
}

export async function publishOrganizationEvent(
  path: string,
  userId: string,
  kickedMemberIdOrEmail: string,
  organizationId: string
) {
  const organization = await accessManagementService.findOrganizationById(organizationId);
  const kickedMemberUser = await accessManagementService.findUserByEmail(kickedMemberIdOrEmail);

  if (path === '/organization/remove-member' && organization && kickedMemberUser) {
    const orgKickedMemberNoti: OrganizationKickedMemberNotification = {
      notificationType: NotificationType.ORGANIZATION,
      notificationHandling: NotificationHandling.KICKED,
      kickedMemberUserId: kickedMemberUser.id,
      organizationName: organization.name,
    };

    publishEvent(userId, orgKickedMemberNoti, organization.id, [
      ...organization.members.map((mem) => mem.userId),
      kickedMemberUser.id,
    ]);
  }
}

function getInivationNotification(
  notificationHandling: NotificationHandling,
  memberName: string,
  organizationName: string
): OrganizationInvitationNotification {
  return {
    notificationType: NotificationType.ORGANIZATION_INVITATION,
    notificationHandling,
    memberName: memberName ?? 'unkown name',
    organizationName: organizationName,
  };
}

function publishEvent(
  userId: string,
  notification: OrganizationInvitationNotification | OrganizationKickedMemberNotification,
  organizationId: string,
  receiverIds: string[]
) {
  OrganizationInvitationTopic.publish({
    initializerId: userId ?? '',
    notification,
    organizationId: organizationId,
    receiverIds: receiverIds,
  });
}
