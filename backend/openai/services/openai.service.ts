import { secret, Secret } from 'encore.dev/config';
import { IOpenAIService } from './openai.service.interface';

import { APIError } from 'encore.dev/api';
import { withErrorHandling } from '../../shared/utils/withErrorHandling';
import { AgentEphemeral, RealtimeSpeechRequest } from '../types';
import Singleton from '../../shared/base/singleton';

const openaiApiKey = secret('OpenaiApiKey');

export class OpenAIService extends Singleton implements IOpenAIService {
  constructor(private readonly openaiApiKey: Secret<'OpenaiApiKey'>) {
    super();
  }

  async startRealTimeSpeechConversation(
    speechModelRequest: RealtimeSpeechRequest,
    token?: string
  ): Promise<AgentEphemeral> {
    return withErrorHandling(async () => {
      const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${!token ? this.openaiApiKey() : token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(speechModelRequest),
      });

      if (!response.ok) {
        throw APIError.unavailable(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      return response.json() as Promise<AgentEphemeral>;
    }, 'Failed to start real-time speech conversation');
  }
}

export const openaiService = OpenAIService.getInstance<OpenAIService>(openaiApiKey);
