import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

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
