import { api, APIError } from 'encore.dev/api';
import log from 'encore.dev/log';
import { connectionManager } from '../services/ConnectionManager.service';
import { getAuthData } from '~encore/auth';
import { NotificationEvent, SpecificNotificationEvent } from '../types';


export const eventsStream = api.streamOut<NotificationEvent<SpecificNotificationEvent>>(
  { path: '/events', expose: true, auth: true },
  async (stream) => {
    const userId = getAuthData()?.session.userId;

    if (!userId) throw APIError.invalidArgument('UserId is not provided!');

    let connection;
    try {
      connection = connectionManager.addConnection(userId, stream);
    } catch (err) {
      log.error('Upload error:', err);
    } finally {
      if (connection) {
        // connectionManager.removeConnection(connection);
      }
    }
  }
);

// export const execute = api(
//   { path: '/execute/:userId', method: 'GET', expose: true },
//   async (params: { userId: string }) => {
//     connectionManager.broadcastEvents([params.userId], {
//       : EventType.ORGANIZATION_DELETED,
//       data: 'HEY NOJNOOO WOAPEEOFEO xDDDD',
//     });
//     return { data: 'OK' };
//   }
// );

export const stats = api(
  { path: '/stats/:userId', method: 'GET', expose: true },
  async (params: { userId: string }) => {
    return { data: connectionManager.getDetailedConnectionStats(params.userId) };
  }
);
