<script lang="ts">
	import { page } from '$app/state';
	import SlideDeck from '$lib/SlideDeck.svelte';

	let { data } = $props();

	const slideMode = $derived(page.url.searchParams.get('show') === 'slide');
</script>

<svelte:head>
	<title>{data.page.title} · IT3E26</title>
</svelte:head>

{#if slideMode}
	<SlideDeck slides={data.page.slides} />
{:else}
	<article class="markdown">
		{@html data.page.html}
	</article>
{/if}
