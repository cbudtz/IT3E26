<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();
	const isPublic = (slug: string) => data.publicSlugs.includes(slug);
</script>

<svelte:head><title>Quiz-host · IT3E26</title></svelte:head>

<h1>Quiz-host</h1>
<p class="muted">Logget ind som <strong>{data.user}</strong> · <a href="/quiz/host/results">Resultater</a> · <a href="/auth/logout">Log ud</a></p>

<h2>Start en quiz</h2>
{#if form?.error}<p class="error">{form.error}</p>{/if}
{#if data.quizzes.length === 0}
	<p>Ingen quizzer fundet. Læg en <code>quiz-*.json</code> i en lektionsmappe.</p>
{:else}
	{#if !data.canPublish}
		<p class="muted">DATABASE_URL mangler – quizzer kan ikke gøres offentlige.</p>
	{/if}
	<ul class="list">
		{#each data.quizzes as q (q.slug)}
			<li>
				<a href="/quiz/host/run/{q.slug}">{q.title}</a> <span class="muted">({q.slug})</span>
				<form
					method="POST"
					action="?/publish"
					class="publish"
					use:enhance={() => async ({ result, update }) => {
						await update({ reset: false });
						if (result.type === 'failure' || result.type === 'error') await invalidateAll();
					}}
				>
					<input type="hidden" name="slug" value={q.slug} />
					<label>
						<input
							type="checkbox"
							name="on"
							value="1"
							checked={isPublic(q.slug)}
							disabled={!data.canPublish}
							onchange={(e) => e.currentTarget.form?.requestSubmit()}
						/>
						Offentlig
					</label>
				</form>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.muted { color: #57606a; }
	.error { color: #cf222e; }
	.list { padding-left: 1.2rem; }
	.list li { margin: 0.4rem 0; display: flex; gap: 0.8rem; align-items: baseline; flex-wrap: wrap; }
	.publish { display: inline; }
	.publish label { font-weight: 400; cursor: pointer; }
</style>
