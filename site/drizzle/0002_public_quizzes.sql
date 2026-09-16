CREATE TABLE "public_quizzes" (
	"quiz_slug" text PRIMARY KEY NOT NULL,
	"published_by" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
