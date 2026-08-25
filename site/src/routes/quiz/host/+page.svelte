<script lang="ts">
	let { data } = $props();
</script>

<svelte:head><title>Quiz-host · IT3E26</title></svelte:head>

<h1>Quiz-host</h1>
<p class="muted">Logget ind som <strong>{data.user}</strong> · <a href="/quiz/host/results">Resultater</a> · <a href="/auth/logout">Log ud</a></p>

<h2>Start en quiz</h2>
{#if data.quizzes.length === 0}
	<p>Ingen quizzer fundet. Læg en <code>quiz-*.json</code> i en lektionsmappe.</p>
{:else}
	<ul class="list">
		{#each data.quizzes as q}
			<li><a href="/quiz/host/run/{q.slug}">{q.title}</a> <span class="muted">({q.slug})</span></li>
		{/each}
	</ul>
{/if}

<style>
	.muted { color: #57606a; }
	.list { padding-left: 1.2rem; }
	.list li { margin: 0.4rem 0; }
</style>
