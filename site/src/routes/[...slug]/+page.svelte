<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.page.title} · IT3E26</title>
</svelte:head>

<article class="markdown">
	{@html data.page.html}
</article>
