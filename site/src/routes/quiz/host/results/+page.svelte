<script lang="ts">
	let { data } = $props();
	const fmt = (d: Date | string | null) =>
		d ? new Date(d).toLocaleString('da-DK', { dateStyle: 'short', timeStyle: 'short' }) : '–';
</script>

<svelte:head><title>Quiz-resultater · IT3E26</title></svelte:head>

<p><a href="/quiz/host">← Quiz-host</a></p>
<h1>Gemte quiz-kørsler</h1>

{#if data.runs.length === 0}
	<p>Ingen kørsler endnu.</p>
{:else}
	<div class="markdown">
		<table>
			<thead><tr><th>Startet</th><th>Quiz</th><th>Kode</th><th>Host</th><th>Deltagere</th><th>Svar</th><th>Afsluttet</th></tr></thead>
			<tbody>
				{#each data.runs as r}
					<tr>
						<td><a href="/quiz/host/results/{r.id}">{fmt(r.startedAt)}</a></td>
						<td>{r.title}</td>
						<td><code>{r.joinCode}</code></td>
						<td>{r.host}</td>
						<td>{r.participants}</td>
						<td>{r.answers}</td>
						<td>{fmt(r.endedAt)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
