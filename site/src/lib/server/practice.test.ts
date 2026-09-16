import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isCorrect } from './grading.ts';
import { stripCorrect, selectPublic, parsePublishForm, parseAnswerForm } from './practice.ts';
import type { QuestionDef } from './realtime/QuizRoom.ts';

const mc: QuestionDef = { id: 'q1', type: 'mc', prompt: 'Hvad er 2+2?', options: ['3', '4', '5'], correct: [1] };
const short: QuestionDef = { id: 'q2', type: 'short', prompt: 'Hovedstad i DK?', options: [], correct: ['København'] };

test('isCorrect: rigtigt mc-svar', () => {
	assert.equal(isCorrect(mc, '1'), true);
});

test('isCorrect: forkert mc-svar', () => {
	assert.equal(isCorrect(mc, '0'), false);
	assert.equal(isCorrect(mc, 'abc'), false);
});

test('isCorrect: short er case-insensitive og trimmet', () => {
	assert.equal(isCorrect(short, '  københavn '), true);
	assert.equal(isCorrect(short, 'Aarhus'), false);
});

test('stripCorrect fjerner facit men beholder resten', () => {
	const out = stripCorrect([mc, short]);
	assert.equal(out.length, 2);
	for (const q of out) assert.equal('correct' in q, false);
	assert.deepEqual(out[0], { id: 'q1', type: 'mc', prompt: 'Hvad er 2+2?', options: ['3', '4', '5'] });
});

test('selectPublic beholder kun offentlige slugs i oprindelig rækkefølge', () => {
	const all = [
		{ slug: 'lektion1/quiz-a', title: 'A' },
		{ slug: 'lektion3/quiz-b', title: 'B' },
		{ slug: 'lektion5/quiz-c', title: 'C' }
	];
	assert.deepEqual(selectPublic(all, new Set(['lektion5/quiz-c', 'lektion1/quiz-a', 'ukendt'])), [all[0], all[2]]);
	assert.deepEqual(selectPublic(all, []), []);
});

test('parsePublishForm: publicér og afpublicér', () => {
	const on = new FormData();
	on.set('slug', 'lektion1/quiz-a');
	on.set('on', '1');
	assert.deepEqual(parsePublishForm(on), { slug: 'lektion1/quiz-a', on: true });

	const off = new FormData();
	off.set('slug', 'lektion1/quiz-a');
	assert.deepEqual(parsePublishForm(off), { slug: 'lektion1/quiz-a', on: false });

	assert.equal(parsePublishForm(new FormData()), null);
});

test('parseAnswerForm kræver questionId og value, afkorter value', () => {
	const fd = new FormData();
	fd.set('questionId', 'q1');
	fd.set('value', 'x'.repeat(300));
	const r = parseAnswerForm(fd);
	assert.equal(r?.questionId, 'q1');
	assert.equal(r?.value.length, 200);

	const missing = new FormData();
	missing.set('questionId', 'q1');
	assert.equal(parseAnswerForm(missing), null);
});
