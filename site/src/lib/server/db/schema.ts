import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Undervisere med adgang til quiz-host-delen (/quiz/host).
 * DTU-brugernavne (CAS). Seedes fra env SUPERUSERS ved opstart.
 */
export const superusers = pgTable('superusers', {
	username: text('username').primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

/** Login-sessioner (cookie-id -> DTU-brugernavn). */
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});

/** Én afvikling af en quiz (et Colyseus-rum). Skrives af realtime/persist.ts. */
export const quizRuns = pgTable('quiz_runs', {
	id: serial('id').primaryKey(),
	quizSlug: text('quiz_slug').notNull(),
	title: text('title').notNull(),
	joinCode: text('join_code').notNull(),
	host: text('host').notNull(),
	startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
	endedAt: timestamp('ended_at', { withTimezone: true })
});

/** Alle indsendte svar - gemmes naar hvert spoergsmaal afsloeres. */
export const quizAnswers = pgTable('quiz_answers', {
	id: serial('id').primaryKey(),
	runId: integer('run_id')
		.notNull()
		.references(() => quizRuns.id, { onDelete: 'cascade' }),
	questionId: text('question_id').notNull(),
	prompt: text('prompt').notNull(),
	nickname: text('nickname').notNull(),
	value: text('value').notNull(),
	isCorrect: boolean('is_correct').notNull(),
	answeredAt: timestamp('answered_at', { withTimezone: true }).notNull().defaultNow()
});
