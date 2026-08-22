<script lang="ts">
	let { data } = $props();
</script>

<h1>Quiz-host</h1>
<p>Logget ind som <strong>{data.user}</strong> (DTU). <a href="/auth/logout">Log ud</a></p>
<p>Her kommer oprettelse og styring af live-quizzer.</p>
