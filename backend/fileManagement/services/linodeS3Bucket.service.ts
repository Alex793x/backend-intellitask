import Singleton from '../../shared/base/singleton';
import { Bucket } from 'encore.dev/storage/objects';
import { secret } from 'encore.dev/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { APIError } from 'encore.dev/api';

const LinodeS3AccessKey = secret('LinodeS3AccessKey');
const LinodeS3SecretKey = secret('LinodeS3SecretKey');

const LINODE_S3_CONFIG = {
  endpoint: 'https://eu-central-1.linodeobjects.com/',
  credentials: {
    accessKeyId: LinodeS3AccessKey(),
    secretAccessKey: LinodeS3SecretKey(),
  },
  region: 'us-east-1',
};

export class LinodeS3BucketService extends Singleton {
  constructor(private readonly s3BucketClient: S3Client) {
    super();
  }

  async getUploadedObject(bucketName: string, objectName: string): Promise<Buffer> {
    const getParams = {
      Bucket: bucketName,
      Key: objectName,
    };

    try {
      const data = await this.s3BucketClient.send(new GetObjectCommand(getParams));

      if (!data.$metadata.httpStatusCode || data.$metadata.httpStatusCode !== 200) {
        // eslint-disable-next-line no-console
        console.error(`Error getting ${objectName} from ${bucketName}`);
        throw APIError.internal(`Error getting ${objectName} from ${bucketName}`);
      }

      const dataByteArray = await data.Body?.transformToByteArray();
      return Buffer.from(dataByteArray || []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error getting ${objectName} from ${bucketName}:`, error);
      throw APIError.internal(`Error getting ${objectName} from ${bucketName}`);
    }
  }

  async uploadObject(
    bucketName: string,
    objectName: string,
    object: Buffer,
    isMedia: boolean
  ): Promise<string> {
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Body: object,
      Key: objectName,
      ACL: isMedia ? 'public-read' : 'private',
    });

    try {
      const result = await this.s3BucketClient.send(putObjectCommand);
      if (result.$metadata.httpStatusCode === 200) {
        // eslint-disable-next-line no-console
        console.log(`Successfully uploaded ${objectName} to ${bucketName}`);
      } else {
        // eslint-disable-next-line no-console
        console.error(`Error uploading ${objectName} to ${bucketName}`);
        throw APIError.internal(`Error uploading ${objectName} to ${bucketName}`);
      }

      const fileUrl = `https://${bucketName}.eu-central-1.linodeobjects.com/${objectName}`;

      // eslint-disable-next-line no-console
      console.log(`Successfully uploaded ${objectName} to ${bucketName}`);
      return fileUrl;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error uploading ${objectName} to ${bucketName}:`, error);
      throw APIError.internal(`Error uploading ${objectName} to ${bucketName}`);
    }
  }

  async deleteObject(bucketName: string, objectName: string): Promise<void> {
    const deleteParams = {
      Bucket: bucketName,
      Key: objectName,
    };

    try {
      const result = await this.s3BucketClient.send(new DeleteObjectCommand(deleteParams));
      if (result.$metadata.httpStatusCode !== 204) {
        // eslint-disable-next-line no-console
        console.error(`Error deleting ${objectName} from ${bucketName}`);
        throw APIError.internal(`Error deleting ${objectName} from ${bucketName}`);
      }

      // eslint-disable-next-line no-console
      console.log(`Successfully deleted ${objectName} from ${bucketName}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error deleting ${objectName} from ${bucketName}:`, error);
      throw APIError.internal(`Error deleting ${objectName} from ${bucketName}`);
    }
  }

  async deleteObjects(bucketName: string, objectNames: string[]): Promise<void> {
    const deleteObjCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: objectNames.map((objectName) => ({ Key: objectName })),
        Quiet: false,
      },
    });

    try {
      const result = await this.s3BucketClient.send(deleteObjCommand);

      if (result.Errors && result.Errors.length > 0) {
        // eslint-disable-next-line no-console
        console.error(`Error deleting some objects from ${bucketName}:`, result.Errors);
        throw APIError.internal(`Error deleting some objects from ${bucketName}`);
      }

      // eslint-disable-next-line no-console
      console.log(`Successfully deleted objects from ${bucketName}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error deleting objects from ${bucketName}:`, error);
      throw APIError.internal(`Error deleting objects from ${bucketName}`);
    }
  }
}

const linodeS3BucketService = LinodeS3BucketService.getInstance<LinodeS3BucketService>(
  new S3Client(LINODE_S3_CONFIG)
);
export default linodeS3BucketService;
