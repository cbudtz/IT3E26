<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { Room } from '@colyseus/sdk';
	import { connect, watch, EMPTY, type Snapshot } from '$lib/realtime/client';

	let { data } = $props();

	let room = $state<Room | null>(null);
	let snap = $state<Snapshot>(EMPTY);
	let mySessionId = $state('');
	let error = $state('');
	let myAnswer = $state<string | null>(null);
	let shortText = $state('');
	let answeredFor = $state('');

	const me = $derived(snap.players[mySessionId]);
	const q = $derived(snap.question);
	const answered = $derived(answeredFor === q.id && q.id !== '');

	onMount(async () => {
		const code = page.url.searchParams.get('code')?.toUpperCase() ?? '';
		const nickname = sessionStorage.getItem('it3e26_nick') || '';
		if (!code) { error = 'Mangler kode.'; return; }
		try {
			const client = connect(data.realtimeUrl);
			const saved = sessionStorage.getItem('it3e26_reconnect:' + code);
			try {
				room = saved ? await client.reconnect(saved) : await client.join('quiz', { joinCode: code, nickname });
			} catch {
				room = await client.join('quiz', { joinCode: code, nickname });
			}
			sessionStorage.setItem('it3e26_reconnect:' + code, room.reconnectionToken);
			mySessionId = room.sessionId;
			watch(room, (s) => (snap = s));
			room.onLeave(() => (error = 'Forbindelsen blev lukket.'));
		} catch (e) {
			error = 'Kunne ikke finde en quiz med koden ' + code + '. Tjek koden og prøv igen.';
		}
	});

	function answer(value: string) {
		if (!room || answered || snap.phase !== 'question') return;
		room.send('answer', { value });
		myAnswer = value;
		answeredFor = q.id;
	}

	function submitShort(e: SubmitEvent) {
		e.preventDefault();
		if (shortText.trim()) answer(shortText.trim());
	}

	const isCorrectOption = (i: number) => snap.correctOptions.includes(i);
	const myShortCorrect = $derived(
		q.type === 'short' && myAnswer !== null &&
		snap.correctText.some((c) => c.trim().toLowerCase() === myAnswer!.trim().toLowerCase())
	);
</script>

<svelte:head><title>Quiz {snap.joinCode} · IT3E26</title></svelte:head>

{#if error}
	<p class="error">{error}</p>
	<p><a href="/quiz">Tilbage</a></p>
{:else if snap.phase === 'lobby'}
	<section class="center">
		<h1>{snap.title || 'Quiz'}</h1>
		<p class="big">Du er med{me ? ` som ${me.nickname}` : ''} 👍</p>
		<p class="muted">Venter på at underviseren starter… ({Object.keys(snap.players).length} deltagere)</p>
	</section>
{:else if snap.phase === 'question' || snap.phase === 'reveal'}
	<section>
		<p class="muted">Spørgsmål {snap.questionIndex + 1} af {snap.questionCount}</p>
		<h1 class="prompt">{q.prompt}</h1>

		{#if q.type === 'short'}
			{#if snap.phase === 'reveal'}
				<p class="result {myShortCorrect ? 'ok' : 'nope'}">
					{myAnswer === null ? 'Du svarede ikke.' : myShortCorrect ? 'Rigtigt!' : `Du svarede "${myAnswer}".`}
				</p>
				<p>Facit: <strong>{snap.correctText.join(' / ')}</strong></p>
			{:else if answered}
				<p class="result">Svar sendt: <strong>{myAnswer}</strong>. Vent på afsløring…</p>
			{:else}
				<form onsubmit={submitShort} class="short">
					<input bind:value={shortText} placeholder="Skriv dit svar" maxlength="200" autocomplete="off" />
					<button type="submit">Send</button>
				</form>
			{/if}
		{:else}
			<div class="options">
				{#each q.options as opt, i}
					<button
						class="opt"
						class:mine={myAnswer === String(i)}
						class:correct={snap.phase === 'reveal' && isCorrectOption(i)}
						class:wrong={snap.phase === 'reveal' && myAnswer === String(i) && !isCorrectOption(i)}
						disabled={answered || snap.phase !== 'question'}
						onclick={() => answer(String(i))}
					>
						<span class="letter">{String.fromCharCode(65 + i)}</span> {opt}
					</button>
				{/each}
			</div>
			{#if snap.phase === 'question' && answered}
				<p class="result">Svar registreret. Vent på afsløring…</p>
			{:else if snap.phase === 'reveal'}
				<p class="result {myAnswer !== null && isCorrectOption(Number(myAnswer)) ? 'ok' : 'nope'}">
					{myAnswer === null ? 'Du svarede ikke.' : isCorrectOption(Number(myAnswer)) ? 'Rigtigt!' : 'Desværre.'}
				</p>
			{/if}
		{/if}
		{#if me}<p class="muted">Din score: {me.score}</p>{/if}
	</section>
{:else}
	<section class="center">
		<h1>Quizzen er slut</h1>
		{#if me}<p class="big">Du fik {me.score} af {snap.questionCount} rigtige</p>{/if}
		<p><a href="/">Til forsiden</a></p>
	</section>
{/if}

<style>
	.center { text-align: center; margin-top: 3rem; }
	.big { font-size: 1.5rem; }
	.muted { color: #57606a; }
	.error { color: #cf222e; }
	.prompt { font-size: 1.6rem; margin: 0.2rem 0 1.2rem; }
	.options { display: grid; gap: 0.7rem; }
	.opt {
		text-align: left; font-size: 1.15rem; padding: 0.9rem 1rem; border-radius: 10px;
		border: 2px solid #d0d7de; background: #fff; cursor: pointer;
	}
	.opt:disabled { cursor: default; opacity: 0.9; }
	.opt.mine { border-color: #0969da; background: #ddf4ff; }
	.opt.correct { border-color: #1a7f37; background: #dafbe1; }
	.opt.wrong { border-color: #cf222e; background: #ffebe9; }
	.letter { display: inline-block; width: 1.6em; font-weight: 700; color: #57606a; }
	.short { display: flex; gap: 0.5rem; }
	.short input { flex: 1; font-size: 1.2rem; padding: 0.6rem 0.8rem; border: 1px solid #d0d7de; border-radius: 8px; }
	.short button, .result { font-size: 1.1rem; }
	.short button { padding: 0.6rem 1rem; border: 0; border-radius: 8px; background: #0969da; color: #fff; }
	.result { margin-top: 1rem; font-weight: 600; }
	.result.ok { color: #1a7f37; }
	.result.nope { color: #cf222e; }
</style>
