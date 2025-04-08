CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" text,
	"refresh_token_expires_at" text,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"inviter_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"teamId" text,
	"email" text NOT NULL,
	"status" text NOT NULL,
	"role" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"team_id" text,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo" text DEFAULT '',
	"metadata" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "restricted_ai_base_models" (
	"id" uuid DEFAULT gen_random_uuid(),
	"organization_id" text NOT NULL,
	"api_identifier" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restricted_ai_providers" (
	"id" uuid DEFAULT gen_random_uuid(),
	"organization_id" text NOT NULL,
	"provider" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restricted_organization_members_ai_base_models" (
	"id" uuid DEFAULT gen_random_uuid(),
	"organization_id" text NOT NULL,
	"member_id" text NOT NULL,
	"api_identifier" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" text NOT NULL,
	"active_organization_id" text,
	"active_organization_member_id" text,
	"active_organization_member_role" text,
	"impersonated_by" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ipAddress" text NOT NULL,
	"userAgent" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members_relation_table" (
	"id" text PRIMARY KEY NOT NULL,
	"team_id" text NOT NULL,
	"member_id" text NOT NULL,
	"has_left" boolean DEFAULT false,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" text DEFAULT '',
	"role" text DEFAULT 'user',
	"banned" boolean DEFAULT false,
	"ban_reason" text DEFAULT '',
	"ban_expires" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_members_relation_table" ADD CONSTRAINT "team_members_relation_table_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_members_relation_table" ADD CONSTRAINT "team_members_relation_table_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "invitations_organization_id_idx" ON "invitations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invitations_email_idx" ON "invitations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "invitations_inviter_id_idx" ON "invitations" USING btree ("inviter_id");--> statement-breakpoint
CREATE INDEX "organizations_members_organization_id_idx" ON "members" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "organizations_members_usesr_id_idx" ON "members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "organizations_name_idx" ON "organizations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "restricted_ai_base_model_organization_id_idx" ON "restricted_ai_base_models" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "restricted_ai_provider_organization_id_idx" ON "restricted_ai_providers" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "restricted_organization_members_ai_base_models_organization_id_idx" ON "restricted_organization_members_ai_base_models" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "restricted_organization_members_ai_base_models_member_id_idx" ON "restricted_organization_members_ai_base_models" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_active_organization_id_idx" ON "sessions" USING btree ("active_organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "team_members_team_id_member_id_unique" ON "team_members_relation_table" USING btree ("team_id","member_id");--> statement-breakpoint
CREATE INDEX "team_members_team_id_idx" ON "team_members_relation_table" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "team_members_member_id_idx" ON "team_members_relation_table" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "teams_organization_id_idx" ON "teams" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "verifications" USING btree ("identifier");