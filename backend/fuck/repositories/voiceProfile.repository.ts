import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { VoiceProfile, VoiceProfileRequest } from '../types';
import {
  voiceProfilePreparedStatements,
  VoiceProfilePreparedStatements,
} from './voiceProfile.repository.preparedStatements';

export class VoiceProfileRepository extends BaseRepository<VoiceProfile, VoiceProfileRequest> {
  private constructor(private readonly preparedStatements: VoiceProfilePreparedStatements) {
    super();
  }

  findOne(id: string): Promise<VoiceProfile> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.findOne.execute({ id });

      if (!result) {
        throw APIError.notFound('Voice profile not found');
      }

      return result as VoiceProfile;
    }, 'Error finding voice profile');
  }

  findAll(): Promise<VoiceProfile[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAll.execute();
      return results as VoiceProfile[];
    }, 'Error finding all voice profiles');
  }

  createOne(item: VoiceProfileRequest): Promise<VoiceProfile> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.createOne.execute({
        name: item.name,
        provider: item.provider,
        voice_id: item.voiceId,
        settings: item.settings || {},
        is_active: item.isActive !== undefined ? item.isActive : true,
      });

      if (!result) {
        throw APIError.internal('Failed to create voice profile');
      }

      return result as VoiceProfile;
    }, 'Error creating voice profile');
  }

  updateOne(id: string, item: VoiceProfileRequest): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        provider: item.provider,
        voice_id: item.voiceId,
        settings: item.settings || {},
        is_active: item.isActive !== undefined ? item.isActive : true,
      });
    }, 'Error updating voice profile');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id });
    }, 'Error deleting voice profile');
  }
}

export const voiceProfileRepository = VoiceProfileRepository.getInstance<VoiceProfileRepository>(
  voiceProfilePreparedStatements
);
