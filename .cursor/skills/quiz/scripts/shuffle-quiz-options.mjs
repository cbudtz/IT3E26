/**
 * Blander svarmuligheder i quiz-JSON, så det rigtige svar ikke ligger fast
 * på indeks 0 eller 1. Sand/falsk, fritekst og korte tekstsvar røres ikke.
 * Kør fra repo-roden, på én quiz-fil.
 *
 *   node .cursor/skills/quiz/scripts/shuffle-quiz-options.mjs lektion9/quiz-lektion9-tilstand.json
 */
import { readFile, writeFile } from 'node:fs/promises';
import { relative } from 'node:path';

const root = process.cwd();
const file = process.argv[2];
if (!file || process.argv.length !== 3) {
	console.error('Angiv én quiz-fil: node .cursor/skills/quiz/scripts/shuffle-quiz-options.mjs <quiz.json>');
	process.exit(1);
}

function shuffleInPlace(items) {
	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}
}

function canShuffle(q) {
	if (q.type !== 'mc') return false;
	if (!Array.isArray(q.options) || q.options.length < 3) return false;
	if (!Array.isArray(q.correct) || q.correct.length === 0) return false;
	return q.correct.every((n) => Number.isInteger(n) && n >= 0 && n < q.options.length);
}

function shuffleQuestion(q) {
	const order = q.options.map((_, i) => i);
	shuffleInPlace(order);
	const at = new Map(order.map((oldIndex, newIndex) => [oldIndex, newIndex]));
	const before = q.correct.map((i) => q.options[i]);
	const options = order.map((i) => q.options[i]);
	const correct = q.correct.map((i) => at.get(i)).sort((a, b) => a - b);
	const after = correct.map((i) => options[i]);
	if (before.slice().sort().join('\0') !== after.slice().sort().join('\0')) {
		throw new Error(`Svarmulighederne blev ændret i ${q.id}`);
	}
	return { ...q, options, correct };
}

function tally(questions) {
	const counts = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0 };
	for (const q of questions) {
		if (!canShuffle(q) || q.correct.length !== 1) continue;
		const i = q.correct[0];
		if (i in counts) counts[i]++;
		else counts.other++;
	}
	return counts;
}

let filesChanged = 0;
let questionsChanged = 0;
const before = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0 };
const after = { 0: 0, 1: 0, 2: 0, 3: 0, other: 0 };

{
	const raw = await readFile(file, 'utf8');
	const quiz = JSON.parse(raw);
	const questions = quiz.questions ?? [];
	const pre = tally(questions);
	for (const k of Object.keys(before)) before[k] += pre[k];

	let changed = 0;
	quiz.questions = questions.map((q) => {
		if (!canShuffle(q)) return q;
		changed++;
		return shuffleQuestion(q);
	});
	const post = tally(quiz.questions);
	for (const k of Object.keys(after)) after[k] += post[k];
	if (changed) {
		const nl = raw.includes('\r\n') ? '\r\n' : '\n';
		const text = JSON.stringify(quiz, null, 2).replace(/\n/g, nl) + nl;
		await writeFile(file, text);
		filesChanged++;
		questionsChanged += changed;
		console.log(`${relative(root, file)}  ${changed} multiple-choice`);
	}
}

console.log(`\nFiler: ${filesChanged}. Spørgsmål blandet: ${questionsChanged}.`);
console.log('Rigtigt indeks, ét svar:  før', before, ' efter', after);
