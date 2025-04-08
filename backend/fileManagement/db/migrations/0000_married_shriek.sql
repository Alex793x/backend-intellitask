CREATE TYPE "public"."access" AS ENUM('NONE', 'VIEW', 'EDIT');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('AUDIO', 'CODE', 'DOCUMENT', 'FILE', 'HTML', 'JSON', 'IMAGE', 'MARKDOWN', 'PDF', 'PRESENTATION', 'SPREADSHEET', 'VIDEO', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."upload_type" AS ENUM('DOCUMENT', 'MEDIA');--> statement-breakpoint
CREATE TABLE "allowed_user_access" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"access" "access" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uploaded_by_user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"upload_type" "upload_type" NOT NULL,
	"file_type" "file_type" NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(2048) NOT NULL,
	"file_size" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "allowed_user_access" ADD CONSTRAINT "allowed_user_access_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "file_id_idx" ON "allowed_user_access" USING btree ("file_id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "allowed_user_access" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_file_access_unique" ON "allowed_user_access" USING btree ("file_id","user_id");--> statement-breakpoint
CREATE INDEX "organization_idx" ON "files" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "org_filename_idx" ON "files" USING btree ("organization_id","file_name");