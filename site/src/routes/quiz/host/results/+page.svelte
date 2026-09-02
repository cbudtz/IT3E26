<script lang="ts">
	let { data } = $props();
	const fmt = (d: Date | string | null) =>
		d ? new Date(d).toLocaleString('da-DK', { dateStyle: 'short', timeStyle: 'short' }) : '–';
	const confirmDelete = (title: string, joinCode: string, e: SubmitEvent) => {
		if (!confirm(`Slet «${title}» (kode ${joinCode})? Dette kan ikke fortrydes.`)) {
			e.preventDefault();
		}
	};
</script>

<svelte:head><title>Quiz-resultater · IT3E26</title></svelte:head>

<p><a href="/quiz/host">← Quiz-host</a></p>
<h1>Gemte quiz-kørsler</h1>

{#if data.runs.length === 0}
	<p>Ingen kørsler endnu.</p>
{:else}
	<div class="markdown">
		<table>
			<thead>
				<tr>
					<th>Startet</th>
					<th>Quiz</th>
					<th>Kode</th>
					<th>Host</th>
					<th>Deltagere</th>
					<th>Svar</th>
					<th>Afsluttet</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data.runs as r (r.id)}
					<tr>
						<td><a href="/quiz/host/results/{r.id}">{fmt(r.startedAt)}</a></td>
						<td>{r.title}</td>
						<td><code>{r.joinCode}</code></td>
						<td>{r.host}</td>
						<td>{r.participants}</td>
						<td>{r.answers}</td>
						<td>{fmt(r.endedAt)}</td>
						<td>
							<form
								method="POST"
								onsubmit={(e) => confirmDelete(r.title, r.joinCode, e)}
							>
								<input type="hidden" name="id" value={r.id} />
								<button type="submit" class="danger">Slet</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.danger {
		font: inherit;
		padding: 0.15rem 0.5rem;
		border: 1px solid #d0d7de;
		border-radius: 6px;
		background: #fff;
		color: #cf222e;
		cursor: pointer;
	}
	.danger:hover {
		background: #fff1f0;
	}
</style>
