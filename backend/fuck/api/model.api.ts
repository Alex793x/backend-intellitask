import { api, APIError } from 'encore.dev/api';
import { modelService } from '../services/model.service';
import { Model, ModelRequest, Provider } from '../types';

import { GenericResponse } from '../../shared/types';

export const getModels = api(
  { expose: true, method: 'GET', path: '/models' },
  async (): Promise<GenericResponse<Model[]>> => {
    return { data: await modelService.findAll() };
  }
);

export const getModelsByProvider = api(
  { expose: true, method: 'GET', path: '/models/provider/:provider' },
  async (params: { provider: string }): Promise<GenericResponse<Model[]>> => {
    // Convert string to Provider enum
    const providerEnum = params.provider as Provider;

    // Check if the provider is valid
    if (!Object.values(Provider).includes(providerEnum)) {
      throw APIError.invalidArgument(`Invalid provider: ${params.provider}`);
    }
    return { data: await modelService.findByProvider(providerEnum) };
  }
);

export const getModel = api(
  { expose: true, method: 'GET', path: '/model/:id' },
  async (params: { id: string }): Promise<GenericResponse<Model>> => {
    return { data: await modelService.findOne(params.id) };
  }
);

export const createModel = api(
  { expose: true, method: 'POST', path: '/model', auth: true },
  async (model: ModelRequest): Promise<GenericResponse<Model>> => {
    return { data: await modelService.createOne(model) };
  }
);

export const updateModel = api<ModelRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/model/:id', auth: true },
  async ({ id, ...model }): Promise<void> => {
    return modelService.updateOne(id, model);
  }
);

export const deleteModel = api(
  { expose: true, method: 'DELETE', path: '/model/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    return modelService.deleteOne(params.id);
  }
);
