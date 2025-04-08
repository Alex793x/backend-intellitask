import { Subscription } from 'encore.dev/pubsub';

import { connectionManager } from '../services/ConnectionManager.service';
import { NotificationEvent, OrganizationInvitationNotification } from '../types';
import { OrganizationInvitationTopic } from '../../auth/api/auth.messaging';

new Subscription(OrganizationInvitationTopic, 'organization-invitation-events', {
  handler: async (event: NotificationEvent<OrganizationInvitationNotification>) => {
    connectionManager.broadcastEvents(event);
  },
});
