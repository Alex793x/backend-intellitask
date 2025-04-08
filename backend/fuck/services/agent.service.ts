import { BaseService } from '../../shared/base/baseService';
import { AgentRepository, agentRepository } from '../repositories/agent.respository';
import {
  agentFunctionRepository,
  AgentFunctionRepository,
} from '../repositories/agentFunction.repository';
import { AgentRequest, AgentWithRelationsDTO } from '../types';

export class AgentService extends BaseService<AgentWithRelationsDTO, AgentRequest> {
  private constructor(
    protected readonly agentRepository: AgentRepository,
    private readonly agentFunctionRepository: AgentFunctionRepository
  ) {
    super(agentRepository);
  }

  override async createOne(item: AgentRequest): Promise<AgentWithRelationsDTO> {
    // Create the agent first
    const createdAgent = await this.agentRepository.createOne(item);

    // If function IDs are provided, assign them to the agent
    if (item.functionIds && item.functionIds.length > 0) {
      await this.assignFunctionsToAgent(createdAgent.id, item.functionIds);
    }

    // Return the complete agent with relations
    return this.findOne(createdAgent.id);
  }

  override async updateOne(id: string, item: AgentRequest): Promise<void> {
    // Update the basic agent data
    await this.agentRepository.updateOne(id, item);

    // If function IDs are provided, update function assignments
    if (item.functionIds) {
      // First, remove all existing function assignments
      await this.clearAgentFunctions(id);

      // Then, assign the new functions
      if (item.functionIds.length > 0) {
        await this.assignFunctionsToAgent(id, item.functionIds);
      }
    }
  }

  /**
   * Assign multiple functions to an agent
   */
  async assignFunctionsToAgent(agentId: string, functionIds: string[]): Promise<void> {
    for (const functionId of functionIds) {
      await this.agentFunctionRepository.assignFunctionToAgent(agentId, functionId);
    }
  }

  /**
   * Remove a specific function from an agent
   */
  async removeFunctionFromAgent(agentId: string, functionId: string): Promise<void> {
    await this.agentFunctionRepository.removeFunctionFromAgentByAgentId(agentId, functionId);
  }

  /**
   * Clear all function assignments for an agent
   */
  async clearAgentFunctions(agentId: string): Promise<void> {
    await this.agentFunctionRepository.clearAgentFunctions(agentId);
  }
}

export const agentService = AgentService.getInstance<AgentService>(
  agentRepository,
  agentFunctionRepository
);
