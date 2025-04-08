import { BaseService } from '../../shared/base/baseService';
import { VoiceProfile, VoiceProfileRequest } from '../types';
import {
  VoiceProfileRepository,
  voiceProfileRepository,
} from '../repositories/voiceProfile.repository';

export class VoiceProfileService extends BaseService<VoiceProfile, VoiceProfileRequest> {
  private constructor(protected readonly repository: VoiceProfileRepository) {
    super(repository);
  }
}

export const voiceProfileService =
  VoiceProfileService.getInstance<VoiceProfileService>(voiceProfileRepository);
