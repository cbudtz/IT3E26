import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

config({ path: '.env' });

let _db;

export function getDb() {
	if (_db) return _db;
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error('DATABASE_URL mangler');
	_db = drizzle({ client: neon(url), schema });
	return _db;
}

export { schema };
