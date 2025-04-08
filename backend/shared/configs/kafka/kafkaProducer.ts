import { Kafka, Partitioners, Producer } from 'kafkajs';
import log from 'encore.dev/log';

export class ResilientProducer<T> {
  private producer: Producer;
  private topic: string;
  private connected = false;

  constructor(kafka: Kafka, topic: string) {
    this.topic = topic;
    this.producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
      allowAutoTopicCreation: true,
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
    });
  }

  // Establish a persistent connection.
  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      this.connected = true;
      log.info('Kafka producer connected successfully', { topic: this.topic });
    } catch (error) {
      log.error(error, 'Failed to connect Kafka producer');
      throw error;
    }
  }

  // Send a message of generic type T.
  async send(message: T, key?: string): Promise<void> {
    if (!this.connected) {
      await this.connect();
    }

    try {
      const payload = {
        topic: this.topic,
        messages: [
          {
            key: key || undefined,
            value: typeof message === 'string' ? message : JSON.stringify(message),
          },
        ],
        compression: 2, // GZIP compression
      };

      await this.producer.send(payload);
    } catch (error) {
      log.error(error, 'Failed to send message to Kafka');
      throw error;
    }
  }

  // Gracefully disconnect when needed.
  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.producer.disconnect();
      this.connected = false;
      log.info('Kafka producer disconnected', { topic: this.topic });
    }
  }
}
