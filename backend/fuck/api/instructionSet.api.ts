import { api } from 'encore.dev/api';
import { instructionSetService } from '../services/instructionSet.service';
import { InstructionSet, InstructionSetRequest } from '../types';
import { GenericResponse } from '../../shared/types';

export const getPublicInstructionSets = api(
  { expose: true, method: 'GET', path: '/instruction-sets' },
  async (): Promise<GenericResponse<InstructionSet[]>> => {
    return { data: await instructionSetService.findAllPublic() };
  }
);

export const getInstructionSet = api(
  { expose: true, method: 'GET', path: '/instruction-set/:id' },
  async (params: { id: string }): Promise<GenericResponse<InstructionSet>> => {
    return { data: await instructionSetService.findOne(params.id) };
  }
);

export const createInstructionSet = api(
  { expose: true, method: 'POST', path: '/instruction-set', auth: true },
  async (instructionSet: InstructionSetRequest): Promise<GenericResponse<InstructionSet>> => {
    return { data: await instructionSetService.createOne(instructionSet) };
  }
);

export const updateInstructionSet = api<InstructionSetRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/instruction-set/:id', auth: true },
  async ({ id, ...instructionSet }): Promise<void> => {
    return instructionSetService.updateOne(id, instructionSet);
  }
);

export const deleteInstructionSet = api(
  { expose: true, method: 'DELETE', path: '/instruction-set/:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    return instructionSetService.deleteOne(params.id);
  }
);
