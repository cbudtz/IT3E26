import { randomBytes } from 'node:crypto';
import { error } from '@sveltejs/kit';
import { loadQuiz } from '$lib/server/quizzes';
import type { PageServerLoad } from './$types';

// Uden 0/O/1/I saa koden er let at laese fra tavlen.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const joinCode = () =>
	Array.from(randomBytes(4), (b) => ALPHABET[b % ALPHABET.length]).join('');

export const load: PageServerLoad = async ({ params, locals }) => {
	const quiz = await loadQuiz(params.slug);
	if (!quiz) error(404, `Ingen quiz "${params.slug}"`);
	return {
		quiz,
		host: locals.user!,
		joinCode: joinCode(),
		hostToken: randomBytes(24).toString('base64url')
	};
};
