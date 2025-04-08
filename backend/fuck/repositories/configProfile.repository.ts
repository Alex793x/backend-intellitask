import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { ConfigProfile, ConfigProfileRequest } from '../types';
import {
  configProfilePreparedStatements,
  ConfigProfilePreparedStatements,
} from './configProfile.repository.preparedStatements';

export class ConfigProfileRepository extends BaseRepository<ConfigProfile, ConfigProfileRequest> {
  private constructor(private readonly preparedStatements: ConfigProfilePreparedStatements) {
    super();
  }

  findOne(id: string): Promise<ConfigProfile> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.findOne.execute({ id });

      if (!result) {
        throw APIError.notFound('Config profile not found');
      }

      return result as ConfigProfile;
    }, 'Error finding config profile');
  }

  findAll(): Promise<ConfigProfile[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAll.execute();
      return results as ConfigProfile[];
    }, 'Error finding all config profiles');
  }

  findAllPublic(): Promise<ConfigProfile[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAllPublic.execute();
      return results as ConfigProfile[];
    }, 'Error finding all public config profiles');
  }

  createOne(item: ConfigProfileRequest): Promise<ConfigProfile> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.createOne.execute({
        name: item.name,
        description: item.description || '',
        temperature: item.temperature || 0.7,
        top_p: item.topP || 1.0,
        presence_penalty: item.presencePenalty || 0.0,
        frequency_penalty: item.frequencyPenalty || 0.0,
        additional_settings: item.additionalSettings || {},
        creator_id: item.creatorId,
        is_public: item.isPublic,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });

      if (!result) {
        throw APIError.internal('Failed to create config profile');
      }

      return result as ConfigProfile;
    }, 'Error creating config profile');
  }

  updateOne(id: string, item: ConfigProfileRequest): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        description: item.description || '',
        temperature: item.temperature || 0.7,
        top_p: item.topP || 1.0,
        presence_penalty: item.presencePenalty || 0.0,
        frequency_penalty: item.frequencyPenalty || 0.0,
        additional_settings: item.additionalSettings || {},
        is_public: item.isPublic,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });
    }, 'Error updating config profile');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id });
    }, 'Error deleting config profile');
  }
}

export const configProfileRepository = ConfigProfileRepository.getInstance<ConfigProfileRepository>(
  configProfilePreparedStatements
);
