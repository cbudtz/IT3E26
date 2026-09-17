import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

config({ path: '.env' });

const url = process.env.DATABASE_URL;
if (!url) {
	throw new Error('DATABASE_URL mangler');
}

const sql = neon(url);
export const db = drizzle({ client: sql, schema });
export { schema };
