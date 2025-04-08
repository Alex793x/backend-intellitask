import { BaseService } from '../../shared/base/baseService';
import { ConfigProfile, ConfigProfileRequest } from '../types';
import {
  ConfigProfileRepository,
  configProfileRepository,
} from '../repositories/configProfile.repository';

export class ConfigProfileService extends BaseService<ConfigProfile, ConfigProfileRequest> {
  private constructor(protected readonly repository: ConfigProfileRepository) {
    super(repository);
  }

  async findAllPublic(): Promise<ConfigProfile[]> {
    return this.repository.findAllPublic();
  }
}

export const configProfileService =
  ConfigProfileService.getInstance<ConfigProfileService>(configProfileRepository);
