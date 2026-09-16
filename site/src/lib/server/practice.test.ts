import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isCorrect } from './grading.ts';
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
