import {
  CoreAssistantMessage,
  CoreMessage,
  CoreSystemMessage,
  CoreUserMessage,
  createDataStream,
  LanguageModelV1,
  smoothStream,
} from 'ai';
import { IncomingMessage, ServerResponse } from 'http';
import { OpenAIProvider } from '@ai-sdk/openai';
import Singleton from '../../../shared/base/singleton';
import { AIProviderFactory, aiProviderFactory } from '../factories/aiProviderFactory';
import { streamText } from 'ai';
import { AgentChatRequest } from '../../types';

import { SupportedProvider } from '../../types';
import { MistralProvider } from '@ai-sdk/mistral';
import { AnthropicProvider } from '@ai-sdk/anthropic';
import { PerplexityProvider } from '@ai-sdk/perplexity';
import { TogetherAIProvider } from '@ai-sdk/togetherai';
import { DeepSeekProvider } from '@ai-sdk/deepseek';

export class AIResponseManager extends Singleton {
  constructor(private readonly factory: AIProviderFactory) {
    super();
  }

  public async getProvider(apiProvider: SupportedProvider) {
    return this.factory.getProvider(apiProvider);
  }

  public async generateResponse(
    chatRequest: AgentChatRequest,
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const mappedMessages: CoreMessage[] = this.mapMessages(chatRequest.messages, '');

    switch (chatRequest.apiProvider) {
      case 'openai':
        await this.generateOpenAIResponse(chatRequest.model, mappedMessages, resp);
        break;
      case 'perplexity':
        await this.generatePerplexityResponse(
          chatRequest.model,
          chatRequest.apiProvider,
          mappedMessages,
          resp
        );
        break;
      case 'deepseek':
        await this.generateDeepSeekResponse(
          chatRequest.model,
          chatRequest.apiProvider,
          mappedMessages,
          resp
        );
        break;
      case 'togetherai':
        console.log('generating meta response');
        await this.generateMetaResponse(
          chatRequest.model,
          chatRequest.apiProvider,
          mappedMessages,
          resp
        );
      default:
        await this.generateStandardResponse(
          chatRequest.apiProvider,
          chatRequest.model,
          mappedMessages,
          resp
        );
    }
  }

  private mapMessages(messages: any[], systemInstruction: string): CoreMessage[] {
    const mappedMessages: CoreMessage[] = messages.map((message) => {
      // Handle different message formats that might come from different parts of the app
      const content =
        typeof message === 'string' ? message : message.content || (message as any).message || '';

      return {
        role: message.isAiGenerated ? 'assistant' : 'user',
        content: content,
      } as CoreUserMessage | CoreAssistantMessage;
    });

    mappedMessages.unshift({
      role: 'system',
      content: systemInstruction || 'You are a helpful AI assistant.',
    } as CoreSystemMessage);

    return mappedMessages;
  }

  private async generateStandardResponse(
    apiProvider: SupportedProvider,
    model: string,
    messages: CoreMessage[],
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const ai = (await this.factory.getProvider(apiProvider)) as
      | AnthropicProvider
      | MistralProvider
      | OpenAIProvider;
    const stream = streamText({
      model: ai(model),
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
      }),
      providerOptions: {
        anthropic: {
          thinking:
            model === 'claude-3-7-sonnet-20250219'
              ? { type: 'enabled', budgetTokens: 20000 }
              : { type: 'disabled' },
        },
      },
    });

    stream.pipeDataStreamToResponse(resp, {
      sendReasoning: true,
      sendSources: true,
      sendUsage: true,
    });
  }

  private async generateOpenAIResponse(
    model: string,
    messages: CoreMessage[],
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const ai = (await this.factory.getProvider('openai')) as OpenAIProvider;
    const stream = streamText({
      model: ai.responses(model),
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
      }),
      providerOptions: {
        openai: { reasoningEffort: 'high' },
      },
      tools: {
        web_search_preview: ai.tools.webSearchPreview({
          searchContextSize: 'high',
        }),
      },
    });

    stream.pipeDataStreamToResponse(resp, {
      sendReasoning: true,
      sendSources: true,
      sendUsage: true,
    });
  }

  private async generatePerplexityResponse(
    model: string,
    apiProvider: SupportedProvider,
    messages: CoreMessage[],
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const ai = (await this.factory.getProvider(apiProvider)) as PerplexityProvider;
    const stream = streamText({
      model: ai(model) as LanguageModelV1,
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
      }),
      providerOptions: {
        perplexity: {
          web_search_options: {
            search_context_size: 'high',
          },
        },
      },
    });

    return stream.pipeDataStreamToResponse(resp, {
      sendReasoning: true,
      sendSources: true,
      sendUsage: true,
    });
  }

  private async generateMetaResponse(
    model: string,
    apiProvider: SupportedProvider,
    messages: CoreMessage[],
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const ai = (await this.factory.getProvider(apiProvider)) as TogetherAIProvider;

    const stream = streamText({
      model: ai(model) as LanguageModelV1,
      messages,
      experimental_transform: smoothStream({
        delayInMs: 500,
        chunking: 'line',
      }),
    });

    return stream.pipeDataStreamToResponse(resp, {
      sendReasoning: true,
      sendSources: true,
      sendUsage: true,
    });
  }

  private async generateDeepSeekResponse(
    model: string,
    apiProvider: SupportedProvider,
    messages: CoreMessage[],
    resp: ServerResponse<IncomingMessage>
  ): Promise<void> {
    const ai = (await this.factory.getProvider(apiProvider)) as DeepSeekProvider;
    const stream = streamText({
      model: ai(model) as LanguageModelV1,
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    });

    return stream.pipeDataStreamToResponse(resp, {
      sendReasoning: true,
      sendSources: true,
      sendUsage: true,
    });
  }
}

export const aiResponseManager =
  AIResponseManager.getInstance<AIResponseManager>(aiProviderFactory);
