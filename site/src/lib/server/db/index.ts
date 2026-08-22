import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

export type Db = PostgresJsDatabase<typeof schema>;

let _sql: ReturnType<typeof postgres> | null = null;
let _db: Db | null = null;

/**
 * Lazy: klienten oprettes foerst ved foerste brug - ikke ved import.
 * SvelteKits build-analyse importerer server-moduler uden env, saa vi maa
 * ikke kaste her. Manglende DATABASE_URL fanges i stedet ved opstart (bootstrap).
 */
export function getDb(): Db {
	if (_db) return _db;
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL mangler (sæt den i site/.env eller som env-var)');
	_sql = postgres(env.DATABASE_URL, { max: 10 });
	_db = drizzle(_sql, { schema });
	return _db;
}

/** Bekvem proxy saa eksisterende kode kan skrive `db.select()...` som foer. */
export const db: Db = new Proxy({} as Db, {
	get: (_t, prop) => Reflect.get(getDb() as object, prop)
});

export { schema };
