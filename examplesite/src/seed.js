import { getDb, schema } from './db.js';
import { hashPassword } from './passwords.js';

export const SEED_PATIENTS = [
	{ cpr: '2512489996', navn: 'Nancy Ann Test Berggren', password: 'password' },
	{ cpr: '2911829996', navn: 'Kirsten Test Berggren', password: '12345678' },
	{ cpr: '0107729995', navn: 'Max Test Berggren', password: 'qwertyui' },
	{ cpr: '1509819996', navn: 'Brita Test Berggren', password: 'p@ssw0rd' },
	{ cpr: '3103979995', navn: 'Anders Test Jensen', password: 'password' }
];

let seeded = false;

export async function seedPatients() {
	if (seeded) return;
	const values = [];
	for (const patient of SEED_PATIENTS) {
		values.push({
			cpr: patient.cpr,
			navn: patient.navn,
			passwordHash: await hashPassword(patient.password)
		});
	}
	await getDb()
		.insert(schema.patients)
		.values(values)
		.onConflictDoNothing({ target: schema.patients.cpr });
	seeded = true;
}
