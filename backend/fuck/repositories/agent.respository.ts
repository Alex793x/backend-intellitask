import { APIError } from 'encore.dev/api';
import {
  agentPreparedStatements,
  AgentPreparedStatements,
} from './agent.repository.preparedStatements';

import { Agent, AgentRequest, AgentWithRelationsDTO } from '../types';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { BaseRepository } from '../../shared/base/baseRepository';

export class AgentRepository extends BaseRepository<AgentWithRelationsDTO, AgentRequest> {
  private constructor(private readonly preparedStatements: AgentPreparedStatements) {
    super();
  }

  private async findAgent(id: string): Promise<Agent> {
    return withErrorHandling(async () => {
      const [agentResult] = await this.preparedStatements.findAgent.execute({ id });
      return agentResult as Agent;
    }, 'Error finding agent');
  }

  async findOne(id: string): Promise<AgentWithRelationsDTO> {
    return withErrorHandling(async () => {
      const agent = await this.preparedStatements.findAgentWithRelations.execute({ id });

      if (!agent) {
        throw APIError.notFound('Agent not found');
      }

      return {
        ...agent,
        model: agent.model,
        config: agent.config,
        instructionSet: agent.instructionSet,
        voice: agent.voice || undefined,
        functions:
          agent.functionAssignments?.map((assignment) => ({
            ...assignment.function,
            parameters: assignment.function.parameters as Record<string, any>,
          })) || [],
      } as AgentWithRelationsDTO;
    }, 'Error finding agent with relations');
  }

  async findAll(): Promise<AgentWithRelationsDTO[]> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatements.findAllPublicAgentsWithRelations.execute();
      return result.map((agent) => ({
        ...agent,
        model: agent.model,
        config: agent.config,
        instructionSet: agent.instructionSet,
        voice: agent.voice || undefined,
        functions:
          agent.functionAssignments?.map((assignment) => ({
            ...assignment.function,
            parameters: assignment.function.parameters as Record<string, any>,
          })) || [],
      })) as AgentWithRelationsDTO[];
    }, 'Error retrieving agents with relations');
  }

  async createOne(agentData: AgentRequest): Promise<AgentWithRelationsDTO> {
    return withErrorHandling(async () => {
      const [result] = await this.preparedStatements.createAgent.execute({
        creatorId: agentData.creatorId,
        name: agentData.name,
        description: agentData.description || '',
        modelId: agentData.modelId,
        configId: agentData.configId,
        instructionSetId: agentData.instructionSetId,
        voiceId: agentData.voiceId,
        agentType: agentData.agentType || 'general',
        isPublic: agentData.isPublic,
        isActive: agentData.isActive !== undefined ? agentData.isActive : true,
      });

      if (!result) {
        throw APIError.internal('Failed to create agent');
      }

      // Return basic agent data without relations initially
      // The service layer will handle adding functions and fetching complete relations
      return {
        ...result,
        model: {} as any,
        config: {} as any,
        instructionSet: {} as any,
        functions: [],
      } as AgentWithRelationsDTO;
    }, 'Error creating agent');
  }

  async updateOne(id: string, agentData: AgentRequest): Promise<void> {
    return withErrorHandling(async () => {
      const existingAgent = await this.findAgent(id);
      if (!existingAgent) {
        throw APIError.notFound('Agent not found');
      }

      const updateData = {
        name: agentData.name,
        description: agentData.description || '',
        modelId: agentData.modelId,
        configId: agentData.configId,
        instructionSetId: agentData.instructionSetId,
        voiceId: agentData.voiceId,
        agentType: agentData.agentType || existingAgent.agentType,
        isPublic: agentData.isPublic,
        isActive: agentData.isActive !== undefined ? agentData.isActive : existingAgent.isActive,
      };

      await this.preparedStatements.updateAgent.execute({
        id,
        agentData: updateData,
      });
    }, 'Error updating agent');
  }

  async deleteOne(id: string): Promise<void> {
    return withErrorHandling(async () => {
      const existingAgent = await this.findAgent(id);
      if (!existingAgent) {
        throw APIError.notFound('Agent not found');
      }
      await this.preparedStatements.deleteAgent.execute({ id });
    }, 'Error deleting agent');
  }
}

export const agentRepository = AgentRepository.getInstance(agentPreparedStatements);
