import { Kafka, Consumer } from 'kafkajs';
import log from 'encore.dev/log';

export class ResilientConsumer<T> {
  private consumer: Consumer;
  private topic: string;
  private connected = false;

  constructor(kafka: Kafka, topic: string, groupId: string) {
    this.topic = topic;
    this.consumer = kafka.consumer({
      groupId,
      retry: {
        initialRetryTime: 300,
        retries: 10,
        maxRetryTime: 30000,
      },
    });
  }

  // Establish a persistent connection and subscribe to the topic.
  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: this.topic,
        fromBeginning: true,
      });
      this.connected = true;
      log.info('Kafka consumer connected successfully', {
        topic: this.topic,
      });
    } catch (error) {
      log.error(error, 'Failed to connect Kafka consumer');
      throw error;
    }
  }

  // Run the consumer with a provided callback to process each message.
  async run(processMessage: (message: T, key?: string) => Promise<void>): Promise<void> {
    if (!this.connected) {
      await this.connect();
    }

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const key = message.key?.toString();
          const value = message.value?.toString();

          if (value) {
            let parsedMessage: T;

            try {
              // Try to parse as JSON first
              parsedMessage = JSON.parse(value) as T;
            } catch (error) {
              // If JSON parsing fails, treat the message as a plain string
              parsedMessage = value as unknown as T;
            }

            await processMessage(parsedMessage, key);
          }
        } catch (error) {
          log.error(error, 'Error processing Kafka message');
        }
      },
    });
  }

  // Gracefully disconnect when needed.
  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.consumer.disconnect();
      this.connected = false;
      log.info('Kafka consumer disconnected', { topic: this.topic });
    }
  }
}
