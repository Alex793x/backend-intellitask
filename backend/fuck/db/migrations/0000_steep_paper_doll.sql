CREATE TYPE "public"."agent_types" AS ENUM('general', 'custom_agent');--> statement-breakpoint
CREATE TYPE "public"."model_types" AS ENUM('llm', 'diffusion', 'audio', 'tool');--> statement-breakpoint
CREATE TYPE "public"."openai_voice" AS ENUM('alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer');--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('openai', 'anthropic', 'elevenlabs', 'google', 'azure', 'xai', 'meta', 'fal', 'mistral', 'together', 'stablediffusion', 'deepseek');--> statement-breakpoint
CREATE TABLE "agent_function_assignments" (
	"agent_id" uuid NOT NULL,
	"function_id" uuid NOT NULL,
	CONSTRAINT "agent_function_assignments_agent_id_function_id_pk" PRIMARY KEY("agent_id","function_id")
);
--> statement-breakpoint
CREATE TABLE "agent_functions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"parameters" jsonb NOT NULL,
	"creator_id" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"creator_id" text NOT NULL,
	"model_id" uuid NOT NULL,
	"config_id" uuid NOT NULL,
	"instruction_set_id" uuid NOT NULL,
	"voice_id" uuid,
	"type" "agent_types" DEFAULT 'general' NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "config_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"temperature" real DEFAULT 0.7 NOT NULL,
	"top_p" real DEFAULT 1 NOT NULL,
	"presence_penalty" real DEFAULT 0 NOT NULL,
	"frequency_penalty" real DEFAULT 0 NOT NULL,
	"additional_settings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"creator_id" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instruction_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"instructions" text DEFAULT 'You are a helpful assistant.' NOT NULL,
	"creator_id" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"provider" "provider" DEFAULT 'openai' NOT NULL,
	"api_identifier" text NOT NULL,
	"model_type" "model_types" NOT NULL,
	"max_tokens" integer DEFAULT 4096 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"provider" "provider" DEFAULT 'openai' NOT NULL,
	"voice_id" text NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agent_function_assignments" ADD CONSTRAINT "agent_function_assignments_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agent_function_assignments" ADD CONSTRAINT "agent_function_assignments_function_id_agent_functions_id_fk" FOREIGN KEY ("function_id") REFERENCES "public"."agent_functions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_config_id_config_profiles_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."config_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_instruction_set_id_instruction_sets_id_fk" FOREIGN KEY ("instruction_set_id") REFERENCES "public"."instruction_sets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_voice_id_voice_profiles_id_fk" FOREIGN KEY ("voice_id") REFERENCES "public"."voice_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agent_function_assignments_agent_id_idx" ON "agent_function_assignments" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "agent_function_assignments_function_id_idx" ON "agent_function_assignments" USING btree ("function_id");--> statement-breakpoint
CREATE INDEX "agent_functions_creator_id_idx" ON "agent_functions" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "agents_model_id_idx" ON "agents" USING btree ("model_id");--> statement-breakpoint
CREATE INDEX "agents_config_id_idx" ON "agents" USING btree ("config_id");--> statement-breakpoint
CREATE INDEX "agents_instruction_set_id_idx" ON "agents" USING btree ("instruction_set_id");--> statement-breakpoint
CREATE INDEX "agents_voice_id_idx" ON "agents" USING btree ("voice_id");