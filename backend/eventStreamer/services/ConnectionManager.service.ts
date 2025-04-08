import { StreamOut } from 'encore.dev/api';
import Singleton from '../../shared/base/singleton';
import { NotificationEvent, SpecificNotificationEvent } from '../types';

interface ConnectionInfo {
  connectionId: string;
  userId: string;
  stream: StreamOut<NotificationEvent<SpecificNotificationEvent>>;
  connectedAt: Date;
}

interface ConnectionStreamHolder {
  connectionId: string;
  stream: StreamOut<NotificationEvent<SpecificNotificationEvent>>;
}

class ConnectionManager extends Singleton {
  // Make constructor private to enforce singleton
  constructor() {
    super();
    // Initialize maps
    this.streams = new Map();
  }

  // Map to hold all connected streams, organized by userId and its connections
  //              Map<userid,
  private streams: Map<string, ConnectionStreamHolder[]>;
  // Counter for generating unique connection IDs
  private connectionCounter = 0;
  // Store all active connections for debugging
  private activeConnections: Map<string, ConnectionInfo> = new Map();

  // Add a new connection
  addConnection(
    userId: string,
    stream: StreamOut<NotificationEvent<SpecificNotificationEvent>>
  ): ConnectionInfo {
    // Generate a unique connection ID
    const connectionId = `conn_${++this.connectionCounter}_${Date.now()}`;

    if (this.streams.has(userId)) {
      const userStreams = this.streams.get(userId);
      if (userStreams) {
        userStreams.push({ connectionId, stream });
      }
    } else {
      this.streams.set(userId, [{ connectionId, stream }]);
    }

    const connection: ConnectionInfo = {
      connectionId,
      userId,
      stream,
      connectedAt: new Date(),
    };

    // Store in active connections
    this.activeConnections.set(connectionId, connection);
    return connection;
  }

  removeConnection(connection: ConnectionInfo): void {
    const { userId, connectionId, stream } = connection;

    this.activeConnections.delete(connectionId);

    if (this.streams.has(userId)) {
      const userStreams = this.streams.get(userId);

      if (userStreams) {
        const streamIndex = userStreams.findIndex((stream) => stream.connectionId === connectionId);
        if (streamIndex !== -1) {
          userStreams.splice(streamIndex, 1);
        }

        if (userStreams.length === 0) {
          this.streams.delete(userId);
        }
      }
    }
  }

  getDetailedConnectionStats(userId: string): {
    userCount: number;
    totalStreams: number;
    userDetails: Record<string, number>;
  } {
    const stats = {
      userCount: 0,
      totalStreams: 0,
      userDetails: {} as Record<string, number>,
    };

    const userStreams = this.streams.get(userId);

    if (!userStreams) {
      return stats;
    }

    stats.userCount = userStreams.length;

    for (const [userId, userStreams] of this.streams.entries()) {
      const streamCount = userStreams.length;
      stats.totalStreams += streamCount;
      stats.userDetails[userId] = streamCount;
    }

    return stats;
  }

  async broadcastEvents(
    notificationEvent: NotificationEvent<SpecificNotificationEvent>
  ): Promise<void> {
    if (!notificationEvent.receiverIds || notificationEvent.receiverIds.length === 0) {
      return;
    }

    const failedStreams: { userId: string; connectionId: string }[] = [];

    notificationEvent.receiverIds.forEach(async (userId) => {
      const userStreams = this.streams.get(userId);
      if (userStreams) {
        userStreams.forEach(async ({ connectionId, stream }) => {
          try {
            await stream.send(notificationEvent);
          } catch (err) {
            console.error('AN ERROR HAPPENED WHILE EMITTING', err);
            failedStreams.push({ userId, connectionId });
          }
        });
      }
    });

    if (failedStreams.length > 0) {
      this.removeFailedStreams(failedStreams);
    }
  }

  private removeFailedStreams(failedStreams: { userId: string; connectionId: string }[]): void {
    const usersWithFailedConnectionIds = new Map<string, string[]>();

    failedStreams.forEach(({ userId, connectionId }) => {
      if (!usersWithFailedConnectionIds.has(userId)) {
        usersWithFailedConnectionIds.set(userId, [connectionId]);
      } else {
        usersWithFailedConnectionIds.get(userId)?.push(connectionId);
      }
    });

    usersWithFailedConnectionIds.forEach((connectionIds, userId) => {
      const userSteams = this.streams.get(userId);

      if (userSteams) {
        connectionIds.forEach((connectionId) => {
          const indexToDelete = userSteams.findIndex(
            (iterStream) => iterStream.connectionId === connectionId
          );
          if (indexToDelete !== -1) {
            userSteams.splice(indexToDelete, 1);
          }
        });

        if (userSteams.length === 0) {
          this.streams.delete(userId);
        }
      }
    });
  }

  getConnectionCount(userId: string): number {
    const userStream = this.streams.get(userId);
    if (!userStream) {
      return 0;
    }
    return userStream.length;
  }
}

export const connectionManager = ConnectionManager.getInstance<ConnectionManager>();
