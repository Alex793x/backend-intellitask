CREATE TYPE "public"."chatroom_roles" AS ENUM('ADMIN', 'MANAGER', 'PROMPT_AIS', 'WRITE', 'READ');--> statement-breakpoint
CREATE TYPE "public"."chatroom_types" AS ENUM('CHATROOM', 'PROJECT_CHATROOM', 'AGENT_CONFIG_SPACE');--> statement-breakpoint
CREATE TYPE "public"."member_roles" AS ENUM('OWNER', 'ADMIN', 'CONTRIBUTOR', 'VIEWER');--> statement-breakpoint
CREATE TABLE "chatroom_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatroom_id" uuid,
	"file_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chatroom_files_chatroom_id_file_id_unique" UNIQUE("chatroom_id","file_id")
);
--> statement-breakpoint
CREATE TABLE "chatroom_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatroom_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "chatroom_roles" DEFAULT 'WRITE' NOT NULL,
	"has_left" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chatrooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "chatroom_types" DEFAULT 'CHATROOM' NOT NULL,
	"chatroom_creator_id" text NOT NULL,
	"name" text NOT NULL,
	"project_id" uuid,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_chatrooms_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatroom_id" uuid,
	"organization_id" text
);
--> statement-breakpoint
CREATE TABLE "organization_teamspaces_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teamspace_id" uuid,
	"organization_id" text
);
--> statement-breakpoint
CREATE TABLE "project_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_files_project_id_file_id_unique" UNIQUE("project_id","file_id")
);
--> statement-breakpoint
CREATE TABLE "project_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "member_roles" DEFAULT 'CONTRIBUTOR' NOT NULL,
	"invited_by_user_id" text NOT NULL,
	"has_left" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_members_project_id_user_id_unique" UNIQUE("project_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teamspace_id" uuid NOT NULL,
	"name" text NOT NULL,
	"context" text DEFAULT '',
	"description" text DEFAULT '',
	"creator_id" text NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_teamspace_id_name_unique" UNIQUE("teamspace_id","name")
);
--> statement-breakpoint
CREATE TABLE "teamspace_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teamspace_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teamspace_files_teamspace_id_file_id_unique" UNIQUE("teamspace_id","file_id")
);
--> statement-breakpoint
CREATE TABLE "teamspace_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teamspace_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "member_roles" DEFAULT 'CONTRIBUTOR' NOT NULL,
	"invited_by" text NOT NULL,
	"has_left" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teamspace_members_teamspace_id_user_id_unique" UNIQUE("teamspace_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "teamspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"context" text DEFAULT '',
	"creator_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chatroom_files" ADD CONSTRAINT "chatroom_files_chatroom_id_chatrooms_id_fk" FOREIGN KEY ("chatroom_id") REFERENCES "public"."chatrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatroom_members" ADD CONSTRAINT "chatroom_members_chatroom_id_chatrooms_id_fk" FOREIGN KEY ("chatroom_id") REFERENCES "public"."chatrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatrooms" ADD CONSTRAINT "chatrooms_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_chatrooms_relations" ADD CONSTRAINT "organization_chatrooms_relations_chatroom_id_chatrooms_id_fk" FOREIGN KEY ("chatroom_id") REFERENCES "public"."chatrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_teamspaces_relations" ADD CONSTRAINT "organization_teamspaces_relations_teamspace_id_teamspaces_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "public"."teamspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_files" ADD CONSTRAINT "project_files_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_teamspace_id_teamspaces_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "public"."teamspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teamspace_files" ADD CONSTRAINT "teamspace_files_teamspace_id_teamspaces_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "public"."teamspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teamspace_members" ADD CONSTRAINT "teamspace_members_teamspace_id_teamspaces_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "public"."teamspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chatroom_files_chatroom_idx" ON "chatroom_files" USING btree ("chatroom_id");--> statement-breakpoint
CREATE INDEX "chatroom_id_idx" ON "chatroom_members" USING btree ("chatroom_id");--> statement-breakpoint
CREATE INDEX "organization_chatrooms_relation_id_idx" ON "organization_chatrooms_relations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "organization_teamspaces_relation_id_idx" ON "organization_teamspaces_relations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "project_files_project_idx" ON "project_files" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "project_member_project_idx" ON "project_members" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "project_member_user_idx" ON "project_members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "project_teamspace_idx" ON "projects" USING btree ("teamspace_id");--> statement-breakpoint
CREATE INDEX "teamspace_files_teamspace_idx" ON "teamspace_files" USING btree ("teamspace_id");--> statement-breakpoint
CREATE INDEX "teamspace_member_teamspace_idx" ON "teamspace_members" USING btree ("teamspace_id");--> statement-breakpoint
CREATE INDEX "teamspace_member_user_idx" ON "teamspace_members" USING btree ("user_id");