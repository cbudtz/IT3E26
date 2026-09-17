import { getDb, schema } from './db.js';

export async function listPatients() {
	const rows = await getDb().select({
		cpr: schema.patients.cpr,
		navn: schema.patients.navn
	}).from(schema.patients);
	return rows;
}
