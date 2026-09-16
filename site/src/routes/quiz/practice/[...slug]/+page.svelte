<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let index = $state(0);
	let score = $state(0);
	let shortText = $state('');
	let chosen = $state<string | null>(null);
	let pending = $state(false);
	let answeredIndex = $state(-1);
	let netError = $state('');

	const total = $derived(data.questions.length);
	const q = $derived(data.questions[index]);
	const done = $derived(index >= total);
	const result = $derived(
		form && 'questionId' in form && q && form.questionId === q.id && answeredIndex === index ? form : null
	);
	const answered = $derived(result !== null);
	const correct = $derived(result?.correct ?? []);

	function next() {
		index += 1;
		shortText = '';
		chosen = null;
		answeredIndex = -1;
		netError = '';
	}

	// Komponenten genbruges ved skift mellem to øvelses-URL'er; score må ikke følge med.
	$effect(() => {
		void data.slug;
		index = 0;
		score = 0;
		shortText = '';
		chosen = null;
		answeredIndex = -1;
		netError = '';
	});
</script>

<svelte:head><title>{data.title} · IT3E26</title></svelte:head>

{#if total === 0}
	<section class="center">
		<h1>{data.title}</h1>
		<p>Denne quiz har ingen spørgsmål endnu.</p>
		<p><a href="/quiz">Tilbage til quiz</a></p>
	</section>
{:else if done}
	<section class="center">
		<h1>{data.title}</h1>
		<p class="big">Du fik {score} af {total} rigtige</p>
		<p><a href="/quiz">Tilbage til quiz</a></p>
	</section>
{:else}
	<section>
		<p class="muted">{data.title} · Spørgsmål {index + 1} af {total}</p>
		<h1 class="prompt">{q.prompt}</h1>

		<form
			method="POST"
			action="?/answer"
			use:enhance={({ cancel }) => {
				if (pending || answered) {
					cancel();
					return;
				}
				pending = true;
				answeredIndex = index;
				netError = '';
				return async ({ result, update }) => {
					try {
						if (result.type === 'error') {
							netError = 'Kunne ikke sende svaret. Prøv igen.';
							chosen = null;
							answeredIndex = -1;
							return;
						}
						if (result.type === 'success' && result.data?.isCorrect) score += 1;
						if (result.type !== 'success') chosen = null;
						await update({ reset: false, invalidateAll: false });
					} finally {
						pending = false;
					}
				};
			}}
		>
			<input type="hidden" name="questionId" value={q.id} />

			{#if q.type === 'short'}
				<div class="short">
					<input name="value" bind:value={shortText} placeholder="Skriv dit svar" maxlength="200" autocomplete="off" disabled={answered || pending} required />
					<button type="submit" disabled={answered || pending}>Svar</button>
				</div>
				{#if result}
					<p class="result {result.isCorrect ? 'ok' : 'nope'}">{result.isCorrect ? 'Rigtigt!' : 'Forkert.'}</p>
					<p>Facit: <strong>{(correct as string[]).join(' / ')}</strong></p>
				{/if}
			{:else}
				<div class="options">
					{#each q.options as opt, i (i)}
						<button
							type="submit"
							name="value"
							value={String(i)}
							class="opt"
							class:mine={chosen === String(i)}
							class:correct={answered && (correct as number[]).includes(i)}
							class:wrong={answered && chosen === String(i) && !(correct as number[]).includes(i)}
							disabled={answered || pending}
							onclick={() => (chosen = String(i))}
						>
							<span class="letter">{String.fromCharCode(65 + i)}</span> {opt}
						</button>
					{/each}
				</div>
				{#if result}
					<p class="result {result.isCorrect ? 'ok' : 'nope'}">{result.isCorrect ? 'Rigtigt!' : 'Forkert.'}</p>
				{/if}
			{/if}
		</form>

		{#if form && 'error' in form && !answered}
			<p class="error">{form.error}</p>
		{/if}
		{#if netError}
			<p class="error">{netError}</p>
		{/if}

		{#if answered}
			<button class="next" onclick={next}>{index + 1 === total ? 'Se resultat' : 'Næste'}</button>
		{/if}
		<p class="muted">Din score: {score}</p>
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
	.short button, .next { font-size: 1.1rem; padding: 0.6rem 1rem; border: 0; border-radius: 8px; background: #0969da; color: #fff; cursor: pointer; }
	.next { margin-top: 1.2rem; }
	.result { margin-top: 1rem; font-weight: 600; font-size: 1.1rem; }
	.result.ok { color: #1a7f37; }
	.result.nope { color: #cf222e; }
</style>
