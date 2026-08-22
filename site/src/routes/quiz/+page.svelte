<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let code = $state(page.url.searchParams.get('code')?.toUpperCase() ?? '');
	let name = $state('');

	function join(e: SubmitEvent) {
		e.preventDefault();
		const c = code.trim().toUpperCase();
		if (!c) return;
		sessionStorage.setItem('it3e26_nick', name.trim());
		goto(`/quiz/play?code=${encodeURIComponent(c)}`);
	}
</script>

<svelte:head><title>Quiz · IT3E26</title></svelte:head>

<section class="join">
	<h1>Deltag i quiz</h1>
	<form onsubmit={join}>
		<label>
			Kode fra tavlen
			<input bind:value={code} placeholder="fx K7PQ" autocapitalize="characters" autocomplete="off" maxlength="8" required />
		</label>
		<label>
			Dit navn / kaldenavn
			<input bind:value={name} placeholder="valgfrit" maxlength="40" />
		</label>
		<button type="submit">Deltag</button>
	</form>
	<p class="muted">Underviser? <a href="/quiz/host">Host en quiz</a></p>
</section>

<style>
	.join { max-width: 24rem; margin: 2rem auto; }
	form { display: grid; gap: 1rem; }
	label { display: grid; gap: 0.3rem; font-weight: 600; }
	input { font-size: 1.4rem; padding: 0.6rem 0.8rem; border: 1px solid #d0d7de; border-radius: 8px; font-weight: 400; }
	button { font-size: 1.2rem; padding: 0.8rem; border: 0; border-radius: 8px; background: #0969da; color: #fff; cursor: pointer; }
	.muted { color: #57606a; margin-top: 2rem; }
</style>
