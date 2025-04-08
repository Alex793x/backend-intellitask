import { BaseRepository } from '../../shared/base/baseRepository';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { db } from '../db/db';
import { agentFunctions } from '../db/schema';
import { AgentFunction, AgentFunctionRequest } from '../types';
import {
  agentFunctionsPreparedStatements,
  AgentFunctionsPreparedStatements,
} from './agentFunction.repository.preparedStatements';

export class AgentFunctionRepository extends BaseRepository<AgentFunction, AgentFunctionRequest> {
  private constructor(private readonly preparedStatements: AgentFunctionsPreparedStatements) {
    super();
  }

  findOne(id: string): Promise<AgentFunction> {
    return withErrorHandling(async () => {
      const [agentFunction] = await this.preparedStatements.findOne.execute({ id });
      return agentFunction as AgentFunction;
    }, 'Error finding agent function');
  }

  findAll(): Promise<AgentFunction[]> {
    return withErrorHandling(async () => {
      const agentFunctions = await this.preparedStatements.findAll.execute();
      return agentFunctions as AgentFunction[];
    }, 'Error finding all agent functions');
  }

  findFunctionsByAgentId(agentId: string): Promise<AgentFunction[]> {
    return withErrorHandling(async () => {
      const agentFunctions = await this.preparedStatements.findOneByAgentId.execute({ agentId });
      return agentFunctions.map((item) => item.function as AgentFunction);
    }, 'Error finding agent functions by agent ID');
  }

  createOne(item: AgentFunctionRequest): Promise<AgentFunction> {
    return withErrorHandling(async () => {
      const [created] = await this.preparedStatements.createOne.execute({
        name: item.name,
        description: item.description,
        parameters: item.parameters,
        creatorId: item.creatorId || 'system',
        isPublic: item.isPublic,
      });

      if (!created) {
        throw new Error('Failed to create agent function');
      }

      return created as AgentFunction;
    }, 'Error creating agent function');
  }

  createMany(items: AgentFunctionRequest[]): Promise<AgentFunction[]> {
    return withErrorHandling(async () => {
      const values = items.map((item) => ({
        name: item.name,
        description: item.description,
        parameters: item.parameters,
        creatorId: item.creatorId || 'system',
        isPublic: item.isPublic,
      }));

      const createdAgentFunctions = await db
        .insert(agentFunctions)
        .values(values)
        .returning()
        .execute();
      return createdAgentFunctions as AgentFunction[];
    }, 'Error creating agent functions');
  }

  updateOne(id: string, item: AgentFunctionRequest): Promise<void> {
    return withErrorHandling(async () => {
      const foundAgentFunction = await this.findOne(id);

      if (!foundAgentFunction) {
        throw new Error('Agent function not found');
      }

      await this.preparedStatements.updateOne.execute({
        id,
        name: item.name,
        description: item.description,
        parameters: item.parameters,
        isPublic: item.isPublic,
      });
    }, 'Error updating agent function');
  }

  deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.deleteOne.execute({ id });
    }, 'Error deleting agent function');
  }

  assignFunctionToAgent(agentId: string, functionId: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.assignFunctionToAgent.execute({
        agent_id: agentId,
        function_id: functionId,
      });
    }, 'Error assigning function to agent');
  }

  removeFunctionFromAgentByAgentId(agentId: string, functionId: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.removeFunctionFromAgent.execute({
        agent_id: agentId,
        function_id: functionId,
      });
    }, 'Error unassigning agent functions by agent ID');
  }

  clearAgentFunctions(agentId: string): Promise<void> {
    return withErrorHandling(async () => {
      await this.preparedStatements.clearAgentFunctions.execute({ agent_id: agentId });
    }, 'Error clearing agent functions');
  }
}

export const agentFunctionRepository = AgentFunctionRepository.getInstance<AgentFunctionRepository>(
  agentFunctionsPreparedStatements
);
