<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SlideDeck from '$lib/SlideDeck.svelte';

	let { data } = $props();

	const slideMode = $derived(page.url.searchParams.get('show') === 'slide');

	function onLessonRowClick(e: MouseEvent) {
		const t = e.target;
		if (!(t instanceof Element)) return;
		if (t.closest('a, button')) return;
		const row = t.closest('tr.lesson-row');
		if (!(row instanceof HTMLElement)) return;
		const href = row.dataset.href;
		if (!href) return;
		e.preventDefault();
		goto(href);
	}
</script>

<svelte:head>
	<title>{data.page.title} · IT3E26</title>
</svelte:head>

{#if slideMode}
	<SlideDeck slides={data.page.slides} />
{:else}
	<article class="markdown" onclick={onLessonRowClick}>
		{@html data.page.html}
	</article>
{/if}
