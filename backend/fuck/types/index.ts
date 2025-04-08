

export enum SupportedProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  MISTRAL = 'mistral',
  PERPLEXITY = 'perplexity',
  DEEPSEEK = 'deepseek',
  TOGETHER = 'togetherai',
}

export enum AgentVoice {
  ALLOY = 'alloy',
  ECHO = 'echo',
  FABLE = 'fable',
  ONYX = 'onyx',
  NOVA = 'nova',
  SHIMMER = 'shimmer',
}

export enum AgentType {
  GENERAL = 'general',
  CUSTOM_AGENT = 'custom_agent',
}

export enum ModelType {
  LLM = 'llm',
  DIFFUSION = 'diffusion',
  AUDIO = 'audio',
  TOOL = 'tool',
}

export enum Provider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  ELEVENLABS = 'elevenlabs',
  GOOGLE = 'google',
  AZURE = 'azure',
  XAI = 'xai',
  META = 'meta',
  FAL = 'fal',
  MISTRAL = 'mistral',
  TOGETHER = 'together',
  STABLEDIFFUSION = 'stablediffusion',
  DEEPSEEK = 'deepseek',
}

export interface AgentChatRequest {
  apiProvider: SupportedProvider;
  model: string;
  messages: any[];
}

/**
 * Represents an AI model that can be used by agents
 */
export interface Model {
  /** Unique identifier for the model */
  id: string;
  /** Name of the model */
  name: string;
  /** Provider of the model */
  provider: Provider;
  /** Identifier used in API calls */
  apiIdentifier: string;
  /** Type of model */
  modelType: ModelType;
  /** Maximum tokens the model can process */
  maxTokens: number;
  /** Whether the model is active */
  isActive: boolean;
  /** When the model was created */
  createdAt: Date;
  /** When the model was last modified */
  updatedAt: Date;
}

/**
 * Request object for creating or updating a model
 */
export interface ModelRequest {
  name: string;
  provider: Provider;
  apiIdentifier: string;
  modelType: ModelType;
  maxTokens?: number;
  isActive?: boolean;
}

/**
 * Represents a voice profile for text-to-speech
 */
export interface VoiceProfile {
  /** Unique identifier for the voice profile */
  id: string;
  /** Name of the voice profile */
  name: string;
  /** Provider of the voice */
  provider: Provider;
  /** Provider-specific voice ID */
  voiceId: string;
  /** Additional provider-specific settings */
  settings: Record<string, any>;
  /** Whether the voice profile is active */
  isActive: boolean;
  /** When the voice profile was created */
  createdAt: Date;
  /** When the voice profile was last modified */
  updatedAt: Date;
}

/**
 * Request object for creating or updating a voice profile
 */
export interface VoiceProfileRequest {
  name: string;
  provider: Provider;
  voiceId: string;
  settings?: Record<string, any>;
  isActive?: boolean;
}

/**
 * Represents a configuration profile for model settings
 */
export interface ConfigProfile {
  /** Unique identifier for the config */
  id: string;
  /** Name of the configuration */
  name: string;
  /** Description of the configuration */
  description: string;
  /** Temperature setting (controls randomness) */
  temperature: number;
  /** Top P setting */
  topP: number;
  /** Presence penalty */
  presencePenalty: number;
  /** Frequency penalty */
  frequencyPenalty: number;
  /** Additional model-specific settings */
  additionalSettings: Record<string, any>;
  /** Reference to the user who created the config */
  creatorId: string;
  /** Whether the config is publicly accessible */
  isPublic: boolean;
  /** Whether the config is active */
  isActive: boolean;
  /** When the config was created */
  createdAt: Date;
  /** When the config was last modified */
  updatedAt: Date;
}

/**
 * Request object for creating or updating a configuration profile
 */
export interface ConfigProfileRequest {
  name: string;
  description?: string;
  temperature?: number;
  topP?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  additionalSettings?: Record<string, any>;
  creatorId: string;
  isPublic: boolean;
  isActive?: boolean;
}

/**
 * Represents a set of instructions for an agent
 */
export interface InstructionSet {
  /** Unique identifier for the instruction set */
  id: string;
  /** Name of the instruction set */
  name: string;
  /** The actual instructions text */
  instructions: string;
  /** Reference to the user who created the instruction set */
  creatorId: string;
  /** Whether the instruction set is publicly accessible */
  isPublic: boolean;
  /** Whether the instruction set is active */
  isActive: boolean;
  /** When the instruction set was created */
  createdAt: Date;
  /** When the instruction set was last modified */
  updatedAt: Date;
}

/**
 * Request object for creating or updating an instruction set
 */
export interface InstructionSetRequest {
  name: string;
  instructions: string;
  creatorId: string;
  isPublic: boolean;
  isActive?: boolean;
}

/**
 * Represents a function that can be called by an agent.
 * Defines the interface and metadata for agent-callable functions.
 */
export interface AgentFunction {
  /** Unique identifier for the function */
  id: string;
  /** Name of the function used for invocation */
  name: string;
  /** Human-readable description of the function's purpose */
  description: string;
  /** Schema defining the function's parameters */
  parameters: Record<string, any>;
  /** Reference to the creator of this function */
  creatorId: string;
  /** Indicates if the function is available for public use */
  isPublic: boolean;
  /** Indicates if the function is currently active */
  isActive: boolean;
  /** When the function was created */
  createdAt: Date;
  /** When the function was last modified */
  updatedAt: Date;
}

/**
 * Represents a request for creating or updating an agent function.
 * Contains the necessary parameters for function configuration.
 */
export interface AgentFunctionRequest {
  /** Name of the function */
  name: string;
  /** Description of the function's purpose */
  description: string;
  /** Schema defining the function's parameters */
  parameters: Record<string, any>;
  /** Reference to the creator of this function */
  creatorId?: string;
  /** Indicates if the function is available for public use */
  isPublic: boolean;
}

/**
 * Represents a persistent agent configuration.
 * Contains all settings and metadata for a long-lived agent.
 */
export interface Agent {
  /** Unique identifier for the agent */
  id: string;
  /** Display name of the agent */
  name: string;
  /** Optional description of the agent's purpose */
  description: string;
  /** Reference to the user who created the agent */
  creatorId: string;
  /** Reference to the model used by this agent */
  modelId: string;
  /** Reference to the configuration profile */
  configId: string;
  /** Reference to the instruction set */
  instructionSetId: string;
  /** Optional reference to the voice profile */
  voiceId: string | null;
  /** Type of agent */
  agentType: AgentType;
  /** Whether the agent is publicly accessible */
  isPublic: boolean;
  /** Whether the agent is active */
  isActive: boolean;
  /** When the agent was created */
  createdAt: Date;
  /** When the agent was last modified */
  updatedAt: Date;
}

/**
 * Represents a request for creating or updating an agent.
 * Contains the necessary parameters for agent configuration.
 */
export interface AgentRequest {
  /** Reference to the creator of this agent */
  creatorId: string;
  /** Display name of the agent */
  name: string;
  /** Optional description of the agent's purpose */
  description?: string;
  /** Reference to the model to be used */
  modelId: string;
  /** Reference to the configuration profile */
  configId: string;
  /** Reference to the instruction set */
  instructionSetId: string;
  /** Optional reference to the voice profile */
  voiceId?: string;
  /** Type of agent */
  agentType?: AgentType;
  /** Whether the agent is publicly accessible */
  isPublic: boolean;
  /** Whether the agent is active */
  isActive?: boolean;
  /** IDs of functions to associate with this agent */
  functionIds?: string[];
}

/**
 * Represents an agent along with its related data.
 * This is used to return a complete view of an agent's configuration and capabilities.
 */
export interface AgentWithRelationsDTO extends Agent {
  /** Model used by this agent */
  model: Model;
  /** Configuration profile */
  config: ConfigProfile;
  /** Instruction set */
  instructionSet: InstructionSet;
  /** Optional voice profile */
  voice?: VoiceProfile;
  /** List of functions that the agent can call */
  functions: AgentFunction[];
}
