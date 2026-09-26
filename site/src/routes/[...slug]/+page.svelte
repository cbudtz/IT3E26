<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SlideDeck from '$lib/SlideDeck.svelte';
	import { renderMermaid } from '$lib/renderMermaid';
	import { theme } from '$lib/theme.svelte';

	let { data } = $props();
	let article: HTMLElement | undefined = $state();

	const slideMode = $derived(page.url.searchParams.get('show') === 'slide');

	$effect(() => {
		theme.mode;
		data.page.html;
		slideMode;
		if (slideMode || !article) return;
		tick().then(() => {
			if (article) void renderMermaid(article);
		});
	});

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
	<article class="markdown" bind:this={article} onclick={onLessonRowClick}>
		{@html data.page.html}
	</article>
{/if}
