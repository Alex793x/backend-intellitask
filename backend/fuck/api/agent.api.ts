import { api } from 'encore.dev/api';
import { agentService } from '../services/agent.service';
import { AgentRequest, AgentWithRelationsDTO } from '../types';
import { GenericResponse } from '../../shared/types';
import { getRawRequestBody } from '../../shared/utils/getRawRequestBody';
import { aiResponseManager } from '../utils/managers/aiResponseManager';

export const getPublicAgents = api(
  { expose: true, method: 'GET', path: '/agents' },
  async (): Promise<GenericResponse<AgentWithRelationsDTO[]>> => {
    return { data: await agentService.findAll() };
  }
);

export const getAgent = api(
  { expose: true, method: 'GET', path: '/agents:id' },
  async (params: { id: string }): Promise<GenericResponse<AgentWithRelationsDTO>> => {
    return { data: await agentService.findOne(params.id) };
  }
);

export const createAgent = api(
  { expose: true, method: 'POST', path: '/agents', auth: true },
  async (agent: AgentRequest): Promise<GenericResponse<AgentWithRelationsDTO>> => {
    return { data: await agentService.createOne(agent) };
  }
);

export const updateAgent = api<AgentRequest & { id: string }>(
  { expose: true, method: 'PATCH', path: '/agents:id', auth: true },
  async ({ id, ...agent }): Promise<void> => {
    return agentService.updateOne(id, agent);
  }
);

export const deleteAgent = api(
  { expose: true, method: 'DELETE', path: '/agents:id', auth: true },
  async (params: { id: string }): Promise<void> => {
    return agentService.deleteOne(params.id);
  }
);

export const chatAgent = api.raw(
  { expose: false, method: 'POST', path: '/agents/chat' },
  async (req, resp) => {
    const bodyStr = await getRawRequestBody(req);
    const body = JSON.parse(bodyStr);
    await aiResponseManager.generateResponse(body, resp);
  }
);
