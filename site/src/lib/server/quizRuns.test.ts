import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseQuizRunId } from './quizRuns.ts';

test('parseQuizRunId accepts a positive integer string', () => {
	assert.equal(parseQuizRunId('42'), 42);
});

test('parseQuizRunId rejects empty, non-integer, and non-positive values', () => {
	assert.equal(parseQuizRunId(null), null);
	assert.equal(parseQuizRunId(''), null);
	assert.equal(parseQuizRunId('abc'), null);
	assert.equal(parseQuizRunId('1.5'), null);
	assert.equal(parseQuizRunId('0'), null);
	assert.equal(parseQuizRunId('-3'), null);
});
