import { api } from 'encore.dev/api';
import { configProfileService } from '../services/configProfile.service';
import { ConfigProfile, ConfigProfileRequest } from '../types';

import { GenericResponse } from '../../shared/types';

export const getPublicConfigProfiles = api(
  { expose: true, method: 'GET', path: '/config-profiles' },
  async (): Promise<GenericResponse<ConfigProfile[]>> => {
    return { data: await configProfileService.findAllPublic() };
  }
);

export const getConfigProfile = api(
  { expose: true, method: 'GET', path: '/config-profile/:id' },
  async (params: { id: string }): Promise<GenericResponse<ConfigProfile>> => {
    return { data: await configProfileService.findOne(params.id) };
  }
);

export const createConfigProfile = api(
  { expose: true, method: 'POST', path: '/config-profile', auth: true },
  async (profile: ConfigProfileRequest): Promise<GenericResponse<ConfigProfile>> => {
    return { data: await configProfileService.createOne(profile) };
  }
);

export const updateConfigProfile = api<ConfigProfileRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/config-profile/:id', auth: true },
  async ({ id, ...profile }): Promise<void> => {
    return configProfileService.updateOne(id, profile);
  }
);

export const deleteConfigProfile = api(
  { expose: true, method: 'DELETE', path: '/config-profile/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    return configProfileService.deleteOne(params.id);
  }
);
