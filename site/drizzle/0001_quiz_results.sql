CREATE TABLE "quiz_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"run_id" integer NOT NULL,
	"question_id" text NOT NULL,
	"prompt" text NOT NULL,
	"nickname" text NOT NULL,
	"value" text NOT NULL,
	"is_correct" boolean NOT NULL,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_slug" text NOT NULL,
	"title" text NOT NULL,
	"join_code" text NOT NULL,
	"host" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_run_id_quiz_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."quiz_runs"("id") ON DELETE cascade ON UPDATE no action;