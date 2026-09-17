import { pgTable, text } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
	cpr: text('cpr').primaryKey(),
	navn: text('navn').notNull(),
	passwordHash: text('password_hash').notNull()
});
