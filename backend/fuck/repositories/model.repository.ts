import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { Model, ModelRequest, Provider } from '../types';
import {
  modelPreparedStatements,
  ModelPreparedStatements,
} from './model.repository.preparedStatements';

export class ModelRepository extends BaseRepository<Model, ModelRequest> {
  private constructor(private readonly preparedStatements: ModelPreparedStatements) {
    super();
  }

  findOne(id: string): Promise<Model> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.findOne.execute({ id });

      if (!result) {
        throw APIError.notFound('Model not found');
      }

      return result as Model;
    }, 'Error finding model');
  }

  findAll(): Promise<Model[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAll.execute();
      return results as Model[];
    }, 'Error finding all models');
  }

  findByProvider(provider: Provider): Promise<Model[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findByProvider.execute({ provider });
      return results as Model[];
    }, 'Error finding models by provider');
  }

  createOne(item: ModelRequest): Promise<Model> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.createOne.execute({
        name: item.name,
        provider: item.provider,
        api_identifier: item.apiIdentifier,
        model_type: item.modelType,
        max_tokens: item.maxTokens || 4096,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });

      if (!result) {
        throw APIError.internal('Failed to create model');
      }

      return result as Model;
    }, 'Error creating model');
  }

  updateOne(id: string, item: ModelRequest): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        provider: item.provider,
        api_identifier: item.apiIdentifier,
        model_type: item.modelType,
        max_tokens: item.maxTokens || 4096,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });
    }, 'Error updating model');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id });
    }, 'Error deleting model');
  }
}

export const modelRepository =
  ModelRepository.getInstance<ModelRepository>(modelPreparedStatements);
