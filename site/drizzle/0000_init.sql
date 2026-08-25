CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "superusers" (
	"username" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
