import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { index, pgEnum } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';

export const agentTypes = pgEnum('agent_types', ['general', 'custom_agent']);
export const modelTypes = pgEnum('model_types', ['llm', 'diffusion', 'audio', 'tool']);
// Enum for voice providers
export const providerEnum = pgEnum('provider', [
  'openai',
  'anthropic',
  'elevenlabs',
  'google',
  'azure',
  'xai',
  'meta',
  'fal',
  'mistral',
  'together',
  'stablediffusion',
  'deepseek',
]);

// Enum for openai voices
export const openaiVoiceEnum = pgEnum('openai_voice', [
  'alloy',
  'echo',
  'fable',
  'onyx',
  'nova',
  'shimmer',
]);

// Models table - store different AI models
export const models = p.pgTable('models', {
  id: p.uuid().defaultRandom().primaryKey(),
  name: p.text().notNull(),
  provider: providerEnum().default('openai').notNull(),
  apiIdentifier: p.text('api_identifier').notNull(), // The actual identifier used in API calls (e.g., "gpt-4")
  modelType: modelTypes('model_type').notNull(),
  maxTokens: p.integer('max_tokens').default(4096).notNull(),
  isActive: p.boolean('is_active').default(true).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Voice profiles table - reusable voice settings
export const voiceProfiles = p.pgTable('voice_profiles', {
  id: p.uuid().defaultRandom().primaryKey(),
  name: p.text().notNull(),
  provider: providerEnum().default('openai').notNull(),
  voiceId: p.text('voice_id').notNull(), // The provider-specific voice ID or name
  settings: p.jsonb().default({}).notNull(), // Additional provider-specific settings
  isActive: p.boolean('is_active').default(true).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Configuration profiles table - reusable model configurations
export const configProfiles = p.pgTable('config_profiles', {
  id: p.uuid().defaultRandom().primaryKey(),
  name: p.text().notNull(),
  description: p.text().default('').notNull(),
  temperature: p.real().default(0.7).notNull(),
  topP: p.real('top_p').default(1.0).notNull(),
  presencePenalty: p.real('presence_penalty').default(0.0).notNull(),
  frequencyPenalty: p.real('frequency_penalty').default(0.0).notNull(),
  additionalSettings: p.jsonb('additional_settings').default({}).notNull(), // For model-specific settings
  creatorId: p.text('creator_id').notNull(),
  isPublic: p.boolean('is_public').default(false).notNull(),
  isActive: p.boolean('is_active').default(true).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Instruction sets table - reusable instruction sets
export const instructionSets = p.pgTable('instruction_sets', {
  id: p.uuid().defaultRandom().primaryKey(),
  name: p.text().notNull(),
  instructions: p.text().default('You are a helpful assistant.').notNull(),
  creatorId: p.text('creator_id').notNull(),
  isPublic: p.boolean('is_public').default(false).notNull(),
  isActive: p.boolean('is_active').default(true).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p
    .timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Agents table - updated to reference the component tables
export const agents = p.pgTable(
  'agents',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    name: p.text().notNull(),
    description: p.text().default('').notNull(),
    creatorId: p.text('creator_id').notNull(),
    modelId: p
      .uuid('model_id')
      .notNull()
      .references(() => models.id),
    configId: p
      .uuid('config_id')
      .notNull()
      .references(() => configProfiles.id),
    instructionSetId: p
      .uuid('instruction_set_id')
      .notNull()
      .references(() => instructionSets.id),
    voiceId: p.uuid('voice_id').references(() => voiceProfiles.id), // Optional voice profile
    agentType: agentTypes('agent_type').default('general').notNull(),
    isPublic: p.boolean('is_public').default(false).notNull(),
    isActive: p.boolean('is_active').default(true).notNull(),
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('agents_model_id_idx').on(table.modelId),
    index('agents_config_id_idx').on(table.configId),
    index('agents_instruction_set_id_idx').on(table.instructionSetId),
    index('agents_voice_id_idx').on(table.voiceId),
  ]
);

// Agent functions table (mostly unchanged)
export const agentFunctions = p.pgTable(
  'agent_functions',
  {
    id: p.uuid().defaultRandom().primaryKey(),
    name: p.text().notNull(),
    description: p.text().notNull(),
    parameters: p.jsonb().notNull(),
    creatorId: p.text('creator_id').notNull(), // Added creator ID
    isPublic: p.boolean('is_public').default(false).notNull(),
    isActive: p.boolean('is_active').default(true).notNull(), // Added isActive flag
    createdAt: p.timestamp('created_at').defaultNow().notNull(),
    updatedAt: p
      .timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('agent_functions_creator_id_idx').on(table.creatorId)]
);

// Junction table for agent-function assignments (unchanged)
export const agentFunctionAssignments = p.pgTable(
  'agent_function_assignments',
  {
    agentId: p
      .uuid('agent_id')
      .notNull()
      .references(() => agents.id),
    functionId: p
      .uuid('function_id')
      .notNull()
      .references(() => agentFunctions.id),
  },
  (table) => [
    primaryKey({
      columns: [table.agentId, table.functionId],
    }),
    index('agent_function_assignments_agent_id_idx').on(table.agentId),
    index('agent_function_assignments_function_id_idx').on(table.functionId),
  ]
);

// Define relations

// Relations for models
export const modelsRelations = relations(models, ({ many }) => ({
  agents: many(agents),
}));

// Relations for voice profiles
export const voiceProfilesRelations = relations(voiceProfiles, ({ many }) => ({
  agents: many(agents),
}));

// Relations for config profiles
export const configProfilesRelations = relations(configProfiles, ({ many }) => ({
  agents: many(agents),
}));

// Relations for instruction sets
export const instructionSetsRelations = relations(instructionSets, ({ many }) => ({
  agents: many(agents),
}));

// Relations for agents
export const agentsRelations = relations(agents, ({ one, many }) => ({
  model: one(models, {
    fields: [agents.modelId],
    references: [models.id],
  }),
  config: one(configProfiles, {
    fields: [agents.configId],
    references: [configProfiles.id],
  }),
  instructionSet: one(instructionSets, {
    fields: [agents.instructionSetId],
    references: [instructionSets.id],
  }),
  voice: one(voiceProfiles, {
    fields: [agents.voiceId],
    references: [voiceProfiles.id],
  }),
  functionAssignments: many(agentFunctionAssignments),
}));

// Relations for agent functions
export const agentFunctionsRelations = relations(agentFunctions, ({ many }) => ({
  assignments: many(agentFunctionAssignments),
}));

// Relations for agent function assignments
export const agentFunctionAssignmentsRelations = relations(agentFunctionAssignments, ({ one }) => ({
  agent: one(agents, {
    fields: [agentFunctionAssignments.agentId],
    references: [agents.id],
  }),
  function: one(agentFunctions, {
    fields: [agentFunctionAssignments.functionId],
    references: [agentFunctions.id],
  }),
}));
