<script lang="ts">
	let { data } = $props();
	const pct = (c: number, t: number) => (t ? Math.round((100 * c) / t) : 0);
</script>

<svelte:head><title>Resultat #{data.run.id} · IT3E26</title></svelte:head>

<p><a href="/quiz/host/results">← Alle kørsler</a></p>
<h1>{data.run.title}</h1>
<p class="muted">Kode <code>{data.run.joinCode}</code> · host {data.run.host} · {new Date(data.run.startedAt).toLocaleString('da-DK')}</p>

<div class="markdown">
	<h2>Pr. spørgsmål</h2>
	<table>
		<thead><tr><th>Spørgsmål</th><th>Svar</th><th>Rigtige</th><th>Fordeling</th></tr></thead>
		<tbody>
			{#each data.questions as q}
				<tr>
					<td>{q.prompt}</td>
					<td>{q.total}</td>
					<td>{q.correct} ({pct(q.correct, q.total)} %)</td>
					<td>{#each q.values as [v, n], i}{i ? ', ' : ''}<code>{v}</code>×{n}{/each}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Pr. deltager</h2>
	<table>
		<thead><tr><th>Navn</th><th>Rigtige</th><th>Besvaret</th></tr></thead>
		<tbody>
			{#each data.people as p}
				<tr><td>{p.nickname}</td><td>{p.correct}</td><td>{p.total}</td></tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.muted { color: #57606a; }
</style>
