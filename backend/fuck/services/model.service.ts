import { BaseService } from '../../shared/base/baseService';
import { Model, ModelRequest, Provider } from '../types';
import { ModelRepository, modelRepository } from '../repositories/model.repository';

export class ModelService extends BaseService<Model, ModelRequest> {
  private constructor(protected readonly repository: ModelRepository) {
    super(repository);
  }

  async findByProvider(provider: Provider): Promise<Model[]> {
    return this.repository.findByProvider(provider);
  }
}

export const modelService = ModelService.getInstance<ModelService>(modelRepository);
