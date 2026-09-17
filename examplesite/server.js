import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { seedPatients } from './src/seed.js';
import { listPatients } from './src/patients.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api/patients', async (_req, res) => {
	try {
		await seedPatients();
		const body = await listPatients();
		res.json(body);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'serverfejl' });
	}
});

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

export default app;

const isMain =
	Boolean(process.argv[1]) &&
	import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (!process.env.VERCEL && isMain) {
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
