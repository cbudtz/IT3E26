<script lang="ts">
	import { onMount } from 'svelte';
	import type { Room } from '@colyseus/sdk';
	import { connect, watch, EMPTY, type Snapshot } from '$lib/realtime/client';

	let { data } = $props();

	let room = $state<Room | null>(null);
	let snap = $state<Snapshot>(EMPTY);
	let error = $state('');
	let joinUrl = $state('');
	let isHost = $state(false);

	const q = $derived(snap.question);
	const players = $derived(Object.values(snap.players));
	const maxTally = $derived(Math.max(1, ...snap.tally));
	const leaderboard = $derived([...players].sort((a, b) => b.score - a.score).slice(0, 10));
	const isLast = $derived(snap.questionIndex >= snap.questionCount - 1);

	onMount(async () => {
		// Overlev en side-reload: genbrug kode/token og reconnect til SAMME rum.
		const key = 'it3e26_host:' + data.quiz.slug;
		const saved = JSON.parse(sessionStorage.getItem(key) ?? 'null') as
			| { joinCode: string; hostToken: string; reconnect?: string }
			| null;
		const joinCode = saved?.joinCode ?? data.joinCode;
		const hostToken = saved?.hostToken ?? data.hostToken;
		joinUrl = `${location.origin}/quiz?code=${joinCode}`;

		try {
			const client = connect(data.realtimeUrl);
			const options = {
				joinCode,
				hostToken,
				host: data.host,
				quizSlug: data.quiz.slug,
				title: data.quiz.title,
				questions: data.quiz.questions,
				nickname: '(host)'
			};
			// create() - ikke joinOrCreate() - saa host ALTID ejer rummet og
			// dermed kender hostToken. Ved reload forsoeges reconnect foerst.
			try {
				room = saved?.reconnect
					? await client.reconnect(saved.reconnect)
					: await client.create('quiz', options);
			} catch {
				room = await client.create('quiz', options);
			}
			sessionStorage.setItem(key, JSON.stringify({ joinCode, hostToken, reconnect: room.reconnectionToken }));

			room.onMessage('host:claimed', (m: { ok: boolean }) => {
				isHost = m.ok;
				if (!m.ok) error = 'Denne fane har ikke styringen over quizzen. Klik "Ny runde" for at starte et nyt rum.';
			});
			room.send('host:claim', { token: hostToken });
			watch(room, (s) => (snap = s));
			room.onLeave(() => (error = 'Forbindelsen til quiz-serveren blev lukket.'));
		} catch (e) {
			const msg = (e as { message?: string })?.message || String(e);
			error = 'Kunne ikke oprette quiz-rummet: ' + msg + '. Er WebSocket-support slaaet til paa serveren (CapRover: HTTP Settings -> Websocket Support)?';
		}
	});

	const send = (type: string) => room?.send(type);
	function restart() {
		sessionStorage.removeItem('it3e26_host:' + data.quiz.slug);
		location.reload();
	}
</script>

<svelte:head><title>Host: {data.quiz.title} · IT3E26</title></svelte:head>

{#if error}
	<p class="error">{error}</p>
{/if}

<header class="bar">
	<div>
		<div class="muted">Deltag på <strong>{joinUrl}</strong></div>
		<div class="code">{snap.joinCode || data.joinCode}</div>
	</div>
	<div class="status">
		<div>{players.length} deltagere</div>
		{#if snap.phase !== 'lobby' && snap.phase !== 'ended'}
			<div>{snap.answerCount} / {players.length} har svaret</div>
		{/if}
	</div>
	<div class="controls">
		{#if snap.phase === 'lobby'}
			<button class="primary" onclick={() => send('host:next')} disabled={!isHost}>{isHost ? 'Start quiz' : 'Forbinder…'}</button>
		{:else if snap.phase === 'question'}
			<button class="primary" onclick={() => send('host:reveal')}>Afslør svar</button>
		{:else if snap.phase === 'reveal'}
			<button class="primary" onclick={() => send('host:next')}>{isLast ? 'Afslut' : 'Næste spørgsmål'}</button>
		{/if}
		{#if snap.phase !== 'ended' && snap.phase !== 'lobby'}
			<button onclick={() => send('host:end')}>Afslut</button>
		{/if}
		{#if snap.phase === 'ended'}
			<button onclick={restart}>Ny runde</button>
		{/if}
	</div>
</header>

{#if snap.phase === 'lobby'}
	<section class="lobby">
		<h1>{data.quiz.title}</h1>
		<p class="muted">{data.quiz.questions.length} spørgsmål. Venter på deltagere…</p>
		<ul class="chips">
			{#each players as p}<li>{p.nickname}</li>{/each}
		</ul>
	</section>
{:else if snap.phase === 'question' || snap.phase === 'reveal'}
	<section>
		<p class="muted">Spørgsmål {snap.questionIndex + 1} af {snap.questionCount}</p>
		<h1 class="prompt">{q.prompt}</h1>

		{#if q.type === 'short'}
			{#if snap.phase === 'reveal'}
				<p>Facit: <strong>{snap.correctText.join(' / ')}</strong></p>
			{/if}
			<ul class="chips answers">
				{#each snap.shortAnswers as a}
					<li class:correct={snap.phase === 'reveal' && snap.correctText.some((c) => c.trim().toLowerCase() === a.trim().toLowerCase())}>{a}</li>
				{/each}
			</ul>
			{#if snap.shortAnswers.length === 0}<p class="muted">Ingen svar endnu.</p>{/if}
		{:else}
			<div class="bars">
				{#each q.options as opt, i}
					<div class="row" class:correct={snap.phase === 'reveal' && snap.correctOptions.includes(i)}>
						<div class="label"><span class="letter">{String.fromCharCode(65 + i)}</span> {opt}</div>
						<div class="track"><div class="fill" style="width:{(snap.tally[i] ?? 0) / maxTally * 100}%"></div></div>
						<div class="n">{snap.tally[i] ?? 0}</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
{:else}
	<section>
		<h1>Resultat</h1>
		<ol class="board">
			{#each leaderboard as p}
				<li><span>{p.nickname}</span><strong>{p.score} / {snap.questionCount}</strong></li>
			{/each}
		</ol>
		<p><a href="/quiz/host/results">Se alle gemte resultater →</a></p>
	</section>
{/if}

<style>
	.bar { display: flex; gap: 2rem; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 1rem 1.25rem; background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 12px; margin-bottom: 1.5rem; }
	.code { font-size: 3rem; font-weight: 800; letter-spacing: 0.15em; font-family: ui-monospace, monospace; }
	.status { font-size: 1.2rem; }
	.controls { display: flex; gap: 0.5rem; }
	button { font-size: 1.1rem; padding: 0.7rem 1.2rem; border: 1px solid #d0d7de; border-radius: 8px; background: #fff; cursor: pointer; }
	button.primary { background: #0969da; color: #fff; border-color: #0969da; }
	button:disabled { opacity: 0.5; cursor: default; }
	.muted { color: #57606a; }
	.error { color: #cf222e; }
	.prompt { font-size: 2.2rem; margin: 0.2rem 0 1.5rem; }
	.bars { display: grid; gap: 0.8rem; }
	.row { display: grid; grid-template-columns: minmax(12rem, 1fr) 3fr 3rem; align-items: center; gap: 1rem; font-size: 1.4rem; }
	.row.correct .label { color: #1a7f37; font-weight: 700; }
	.row.correct .fill { background: #1a7f37; }
	.letter { display: inline-block; width: 1.6em; font-weight: 700; color: #57606a; }
	.track { background: #eaeef2; border-radius: 6px; height: 2rem; overflow: hidden; }
	.fill { height: 100%; background: #0969da; transition: width 0.3s; }
	.n { text-align: right; font-weight: 700; }
	.chips { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.chips li { padding: 0.3rem 0.8rem; border-radius: 999px; background: #eaeef2; font-size: 1.1rem; }
	.chips li.correct { background: #dafbe1; color: #1a7f37; font-weight: 600; }
	.answers li { font-size: 1.4rem; }
	.board { font-size: 1.4rem; padding-left: 2rem; }
	.board li { display: flex; justify-content: space-between; max-width: 30rem; padding: 0.3rem 0; border-bottom: 1px solid #eaeef2; }
	.lobby h1 { font-size: 2.4rem; }
</style>
