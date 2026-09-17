import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

export default app;

if (!process.env.VERCEL) {
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
