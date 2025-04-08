import { BaseService } from '../../shared/base/baseService';
import {
  agentFunctionRepository,
  AgentFunctionRepository,
} from '../repositories/agentFunction.repository';
import { AgentFunction, AgentFunctionRequest } from '../types';

export class AgentFunctionService extends BaseService<AgentFunction, AgentFunctionRequest> {
  private constructor(protected readonly repository: AgentFunctionRepository) {
    super(repository);
  }
}

export const agentFunctionService =
  AgentFunctionService.getInstance<AgentFunctionService>(agentFunctionRepository);
