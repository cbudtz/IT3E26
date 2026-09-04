const express = require('express');
const path = require('path');

const app = express();

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

if (!process.env.VERCEL) {
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
