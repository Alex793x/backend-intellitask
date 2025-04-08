import { Kafka } from 'kafkajs';
import Singleton from '../../base/singleton';

/**
 * TypeScript interface for Kafka configuration
 */
export interface KafkaConfigOptions {
  'bootstrap.servers': string;
  'security.protocol': 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl' | undefined;
  'sasl.mechanisms': 'plain' | 'scram-sha-256' | 'scram-sha-512' | 'oauthbearer';
  'sasl.username': string;
  'sasl.password': string;
  'session.timeout.ms'?: number;
  'client.id'?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Creates a Kafka configuration object with provided credentials
 */
export function loadKafkaConfig(apiKey: string, apiSecret: string): KafkaConfigOptions {
  if (!apiKey || !apiSecret) {
    throw new Error(
      'Missing Kafka credentials in environment variables: KAFKA_API_KEY, KAFKA_API_SECRET'
    );
  }

  return {
    'bootstrap.servers': 'pkc-z1o60.europe-west1.gcp.confluent.cloud:9092',
    'security.protocol': 'sasl_ssl',
    'sasl.mechanisms': 'plain',
    'sasl.username': apiKey,
    'sasl.password': apiSecret,
    'session.timeout.ms': 45000,
    'client.id': 'ccloud-nodejs-client-b8cfe008-d331-4e1f-b7ab-fee635194c9e',
  };
}

/**
 * Singleton class for managing Kafka configuration and client instances
 */
export abstract class KafkaConfigManager extends Singleton {
  protected config: KafkaConfigOptions;
  protected kafkaClient: Kafka;

  protected constructor(
    protected readonly kafkaApiKey: string,
    protected readonly kafkaApiSecret: string
  ) {
    super();
    this.config = loadKafkaConfig(kafkaApiKey, kafkaApiSecret);
    this.kafkaClient = this.createKafkaClient();
  }

  /**
   * Creates a KafkaJS client instance with the current configuration
   */
  protected createKafkaClient(): Kafka {
    return new Kafka({
      brokers: [this.config['bootstrap.servers'] as string],
      ssl: this.config['security.protocol'] === 'sasl_ssl',
      sasl: {
        mechanism: 'plain',
        username: this.config['sasl.username'] as string,
        password: this.config['sasl.password'] as string,
      },
      connectionTimeout: this.config['session.timeout.ms'] as number,
      clientId: this.config['client.id'] as string,
    });
  }

  /**
   * Gets the configured Kafka client instance
   */
  public getKafkaClient(): Kafka {
    return this.kafkaClient;
  }
}
