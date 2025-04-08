import { api } from 'encore.dev/api';
import { voiceProfileService } from '../services/voiceProfile.service';
import { VoiceProfile, VoiceProfileRequest } from '../types';

import { GenericResponse } from '../../shared/types';

export const getVoiceProfiles = api(
  { expose: true, method: 'GET', path: '/voice-profiles' },
  async (): Promise<GenericResponse<VoiceProfile[]>> => {
    return { data: await voiceProfileService.findAll() };
  }
);

export const getVoiceProfile = api(
  { expose: true, method: 'GET', path: '/voice-profile/:id' },
  async (params: { id: string }): Promise<GenericResponse<VoiceProfile>> => {
    return { data: await voiceProfileService.findOne(params.id) };
  }
);

export const createVoiceProfile = api(
  { expose: true, method: 'POST', path: '/voice-profile', auth: true },
  async (profile: VoiceProfileRequest): Promise<GenericResponse<VoiceProfile>> => {
    return { data: await voiceProfileService.createOne(profile) };
  }
);

export const updateVoiceProfile = api<VoiceProfileRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/voice-profile/:id', auth: true },
  async ({ id, ...profile }): Promise<void> => {
    return voiceProfileService.updateOne(id, profile);
  }
);

export const deleteVoiceProfile = api(
  { expose: true, method: 'DELETE', path: '/voice-profile/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    return voiceProfileService.deleteOne(params.id);
  }
);
