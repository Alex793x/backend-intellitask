import { Topic } from 'encore.dev/pubsub';
import {
  NotificationEvent,
  OrganizationInvitationNotification,
  OrganizationKickedMemberNotification,
} from '../../eventStreamer/types';

export interface OrganizationInvitationTopicProps {
  invitationId: string;
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  organizationName: string;
}

export interface UserVerificationTopicProps {
  email: string;
  otp: string;
}

export const UserVerificationTopic = new Topic<UserVerificationTopicProps>('user-verification', {
  deliveryGuarantee: 'exactly-once',
});

export const UserResetPasswordTopic = new Topic<UserVerificationTopicProps>('user-reset-password', {
  deliveryGuarantee: 'exactly-once',
});

export const OrganizationInvitationEmailTopic = new Topic<OrganizationInvitationTopicProps>(
  'organization-invitation',
  {
    deliveryGuarantee: 'exactly-once',
  }
);

export const OrganizationInvitationTopic = new Topic<
  NotificationEvent<OrganizationInvitationNotification | OrganizationKickedMemberNotification>
>('organization-accepted-invitation', {
  deliveryGuarantee: 'exactly-once',
});
