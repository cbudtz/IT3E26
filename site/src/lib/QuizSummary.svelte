<script lang="ts">
	import type { QuestionResultSnap } from '$lib/realtime/client';

	let { results }: { results: QuestionResultSnap[] } = $props();

	const letter = (i: number) => String.fromCharCode(65 + i);

	function freq(answers: string[]) {
		const m: Record<string, number> = {};
		for (const a of answers) m[a] = (m[a] ?? 0) + 1;
		return Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'da'));
	}

	function maxN(r: QuestionResultSnap) {
		return Math.max(1, ...(r.tally ?? []), r.unanswered ?? 0, ...freq(r.shortAnswers ?? []).map(([, n]) => n));
	}

	function isShortCorrect(r: QuestionResultSnap, value: string) {
		return (r.correctText ?? []).some((c) => c.trim().toLowerCase() === value.trim().toLowerCase());
	}
</script>

<section class="summary">
	<h2>Svar pr. spørgsmål</h2>
	{#if results.length === 0}
		<p class="muted">Ingen spørgsmål blev afsløret.</p>
	{/if}
	{#each results as r, n (r.id || n)}
		<article class="q">
			<p class="muted">Spørgsmål {n + 1}</p>
			<h3>{r.prompt}</h3>
			{#if r.type === 'short'}
				<div class="bars">
					{#each freq(r.shortAnswers ?? []) as [text, count] (text)}
						<div class="row" class:correct={isShortCorrect(r, text)}>
							<div class="label">{text}</div>
							<div class="track"><div class="fill" style="width:{(count / maxN(r)) * 100}%"></div></div>
							<div class="n">{count}</div>
						</div>
					{/each}
					<div class="row none">
						<div class="label">Intet svar</div>
						<div class="track"><div class="fill" style="width:{((r.unanswered ?? 0) / maxN(r)) * 100}%"></div></div>
						<div class="n">{r.unanswered ?? 0}</div>
					</div>
				</div>
			{:else}
				<div class="bars">
					{#each r.options ?? [] as opt, i (i)}
						<div class="row" class:correct={(r.correctOptions ?? []).includes(i)}>
							<div class="label"><span class="letter">{letter(i)}</span> {opt}</div>
							<div class="track"><div class="fill" style="width:{((r.tally[i] ?? 0) / maxN(r)) * 100}%"></div></div>
							<div class="n">{r.tally[i] ?? 0}</div>
						</div>
					{/each}
					<div class="row none">
						<div class="label">Intet svar</div>
						<div class="track"><div class="fill" style="width:{((r.unanswered ?? 0) / maxN(r)) * 100}%"></div></div>
						<div class="n">{r.unanswered ?? 0}</div>
					</div>
				</div>
			{/if}
		</article>
	{/each}
</section>

<style>
	.summary { margin-top: 1.5rem; text-align: left; }
	.q { margin: 1.4rem 0 2rem; }
	.q h3 { font-size: 1.25rem; margin: 0.15rem 0 0.8rem; font-weight: 650; }
	.muted { color: #57606a; margin: 0; }
	.bars { display: grid; gap: 0.55rem; }
	.row { display: grid; grid-template-columns: minmax(10rem, 1fr) 3fr 3rem; align-items: center; gap: 0.8rem; font-size: 1.05rem; }
	.row.correct .label { color: #1a7f37; font-weight: 700; }
	.row.correct .fill { background: #1a7f37; }
	.row.none .label { color: #57606a; font-style: italic; }
	.row.none .fill { background: #8c959f; }
	.letter { display: inline-block; width: 1.6em; font-weight: 700; color: #57606a; }
	.track { background: #eaeef2; border-radius: 6px; height: 1.6rem; overflow: hidden; }
	.fill { height: 100%; background: #0969da; }
	.n { text-align: right; font-weight: 700; }
</style>
