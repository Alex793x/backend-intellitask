import { APIError } from 'encore.dev/api';
import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { InstructionSet, InstructionSetRequest } from '../types';
import {
  instructionSetPreparedStatements,
  InstructionSetPreparedStatements,
} from './instructionSet.repository.preparedStatements';

export class InstructionSetRepository extends BaseRepository<
  InstructionSet,
  InstructionSetRequest
> {
  private constructor(private readonly preparedStatements: InstructionSetPreparedStatements) {
    super();
  }

  findOne(id: string): Promise<InstructionSet> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.findOne.execute({ id });

      if (!result) {
        throw APIError.notFound('Instruction set not found');
      }

      return result as InstructionSet;
    }, 'Error finding instruction set');
  }

  findAll(): Promise<InstructionSet[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAll.execute();
      return results as InstructionSet[];
    }, 'Error finding all instruction sets');
  }

  findAllPublic(): Promise<InstructionSet[]> {
    return withErrorHandling(async () => {
      const results = await this.preparedStatements.findAllPublic.execute();
      return results as InstructionSet[];
    }, 'Error finding all public instruction sets');
  }

  createOne(item: InstructionSetRequest): Promise<InstructionSet> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.createOne.execute({
        name: item.name,
        instructions: item.instructions,
        creator_id: item.creatorId,
        is_public: item.isPublic,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });

      if (!result) {
        throw APIError.internal('Failed to create instruction set');
      }

      return result as InstructionSet;
    }, 'Error creating instruction set');
  }

  updateOne(id: string, item: InstructionSetRequest): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        instructions: item.instructions,
        is_public: item.isPublic,
        is_active: item.isActive !== undefined ? item.isActive : true,
      });
    }, 'Error updating instruction set');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id });
    }, 'Error deleting instruction set');
  }
}

export const instructionSetRepository =
  InstructionSetRepository.getInstance<InstructionSetRepository>(instructionSetPreparedStatements);
