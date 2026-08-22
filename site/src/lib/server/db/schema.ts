import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/** Undervisere med adgang til quiz-host-delen. Seedes fra SUPERUSERS ved opstart. */
export const superusers = pgTable('superusers', {
	username: text('username').primaryKey(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

/** Login-sessioner (cookie-id -> bruger). */
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	username: text('username')
		.notNull()
		.references(() => superusers.username, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});
