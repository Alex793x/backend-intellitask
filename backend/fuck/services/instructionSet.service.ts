import { BaseService } from '../../shared/base/baseService';
import { InstructionSet, InstructionSetRequest } from '../types';
import {
  InstructionSetRepository,
  instructionSetRepository,
} from '../repositories/instructionSet.repository';

export class InstructionSetService extends BaseService<InstructionSet, InstructionSetRequest> {
  private constructor(protected readonly repository: InstructionSetRepository) {
    super(repository);
  }

  async findAllPublic(): Promise<InstructionSet[]> {
    return this.repository.findAllPublic();
  }
}

export const instructionSetService =
  InstructionSetService.getInstance<InstructionSetService>(instructionSetRepository);
