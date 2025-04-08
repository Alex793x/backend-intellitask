import { AnthropicProvider, createAnthropic } from '@ai-sdk/anthropic';
import { createMistral, MistralProvider } from '@ai-sdk/mistral';
import { createOpenAI, OpenAIProvider } from '@ai-sdk/openai';
import { createPerplexity, PerplexityProvider } from '@ai-sdk/perplexity';
import { createDeepSeek, DeepSeekProvider } from '@ai-sdk/deepseek';
import Singleton from '../../../shared/base/singleton';
import { SupportedProvider } from '../../types';
import { secret } from 'encore.dev/config';
import { createTogetherAI, TogetherAIProvider } from '@ai-sdk/togetherai';


const openaiApiKey = secret('OpenaiApiKey');
const anthropicApiKey = secret('AnthropicApiKey');
const perplexityApiKey = secret('PerplexityApiKey');
const mistralApiKey = secret('MistralApiKey');
const togetheraiApiKey = secret('TogetherAiApiKey');
const deepseekApiKey = secret('DeepseekApiKey');

export class AIProviderFactory extends Singleton {
  private providers: Record<
    string,
    | OpenAIProvider
    | AnthropicProvider
    | MistralProvider
    | PerplexityProvider
    | TogetherAIProvider
    | DeepSeekProvider
  >;

  constructor() {
    super();
    this.providers = {
      openai: createOpenAI({ apiKey: openaiApiKey(), compatibility: 'strict' }) as OpenAIProvider,
      anthropic: createAnthropic({ apiKey: anthropicApiKey() }) as AnthropicProvider,
      mistral: createMistral({ apiKey: mistralApiKey() }) as MistralProvider,
      perplexity: createPerplexity({ apiKey: perplexityApiKey() }) as PerplexityProvider,
      togetherai: createTogetherAI({ apiKey: togetheraiApiKey() }) as TogetherAIProvider,
      deepseek: createDeepSeek({ apiKey: deepseekApiKey() }) as DeepSeekProvider,
    };
  }

  public async getProvider(apiIdentifier: string) {
    const providerKey = apiIdentifier.toLowerCase() as SupportedProvider;
    const provider = this.providers[providerKey];
    if (!provider) {
      throw new Error(`Unsupported provider identifier: ${apiIdentifier}`);
    }
    return provider;
  }

  public isSupported(apiIdentifier: string): boolean {
    const providerKey = apiIdentifier.toLowerCase() as SupportedProvider;
    return !!this.providers[providerKey];
  }
}

export const aiProviderFactory = AIProviderFactory.getInstance<AIProviderFactory>();
