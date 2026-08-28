<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import AppMenu from '$lib/AppMenu.svelte';
	import ViewToggle from '$lib/ViewToggle.svelte';
	import { initTheme } from '$lib/theme.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	let menuOpen = $state(false);

	const crumbs = $derived(
		page.url.pathname.split('/').filter(Boolean).map((part, i, all) => ({
			name: part,
			href: '/' + all.slice(0, i + 1).join('/')
		}))
	);

	const onQuiz = $derived(
		page.url.pathname === '/quiz' || page.url.pathname.startsWith('/quiz/')
	);
	const onAuth = $derived(page.url.pathname.startsWith('/auth'));
	const slideMode = $derived(page.url.searchParams.get('show') === 'slide');
	const showToggle = $derived(!onQuiz && !onAuth);

	onMount(() => {
		initTheme();
	});

	afterNavigate(() => {
		menuOpen = false;
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') menuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

{#if !slideMode}
	<header>
		<nav>
			<div class="crumbs">
				<a href="/" class="brand">IT3E26</a>
				{#each crumbs as c (c.href)}
					<span class="sep">/</span><a href={c.href}>{c.name}</a>
				{/each}
			</div>

			<div class="tools">
				{#if showToggle}
					<ViewToggle />
				{/if}
				<AppMenu bind:open={menuOpen} />
			</div>
		</nav>
	</header>
{/if}

<main class:flush={slideMode}>
	{@render children()}
</main>

<style>
	:global(:root) {
		--bg: #fff;
		--fg: #1f2328;
		--muted: #57606a;
		--border: #d0d7de;
		--header-bg: #f6f8fa;
		--link: #0969da;
		--code-bg: #eff1f3;
		--pre-bg: #f6f8fa;
		--accent: #0969da;
		--switch-off: #d0d7de;
		--slide-bg: #f5f6f8;
		--slide-fg: #1c2128;
		--slide-heading: #11151a;
		--slide-muted: #5c6570;
		--slide-chrome: #3c4654;
		--slide-code: #9a6700;
		--slide-code-bg: #eceef1;
		--slide-pre-bg: #eef0f3;
		--slide-pre-fg: #1c2128;
		--slide-border: #d0d7de;
		--slide-thumb-bg: #fff;
		--slide-progress: rgb(15 23 42 / 0.1);
		--slide-progress-fill: #0969da;
		--slide-link: #0969da;
		--slide-table-head: #eef1f4;
		--slide-table-alt: #f7f8fa;
	}
	:global(html[data-theme='dark']) {
		--bg: #101218;
		--fg: #f4f6fa;
		--muted: #9aa3b5;
		--border: #2a3140;
		--header-bg: #161a24;
		--link: #8cb8ff;
		--code-bg: #1c2230;
		--pre-bg: #0b0d14;
		--accent: #5b9dff;
		--switch-off: #3a4150;
		--slide-bg: #101218;
		--slide-fg: #f4f6fa;
		--slide-heading: #fff;
		--slide-muted: #9aa3b5;
		--slide-chrome: #c5cdd8;
		--slide-code: #f4d58d;
		--slide-code-bg: #2a3040;
		--slide-pre-bg: #0b0d14;
		--slide-pre-fg: #e8edf5;
		--slide-border: #3a4150;
		--slide-thumb-bg: #181c27;
		--slide-progress: rgb(255 255 255 / 0.08);
		--slide-progress-fill: #5b9dff;
		--slide-link: #8cb8ff;
		--slide-table-head: #1c2230;
		--slide-table-alt: #181c27;
	}

	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.55;
		color: var(--fg);
		background: var(--bg);
	}
	header {
		position: relative;
		border-bottom: 1px solid var(--border);
		background: var(--header-bg);
	}
	nav {
		max-width: 60rem;
		margin: 0 auto;
		padding: 0.6rem 1.25rem;
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	nav a { color: var(--link); text-decoration: none; }
	nav a:hover { text-decoration: underline; }
	.crumbs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		min-width: 0;
		flex: 1;
	}
	.brand { font-weight: 700; color: var(--fg); }
	.sep { margin: 0 0.4rem; color: var(--muted); }
	.tools {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin-left: auto;
		flex-shrink: 0;
	}
	main {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1.5rem 1.25rem 4rem;
	}
	main.flush {
		max-width: none;
		margin: 0;
		padding: 0;
	}
	:global(body:has(.deck)) {
		overflow: hidden;
		background: var(--slide-bg);
	}

	:global(.markdown h1) { border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
	:global(.markdown h2) { border-bottom: 1px solid var(--border); padding-bottom: 0.25em; margin-top: 2em; }
	:global(.markdown a) { color: var(--link); }
	:global(.markdown table) { border-collapse: collapse; display: block; overflow-x: auto; max-width: 100%; }
	:global(.markdown th), :global(.markdown td) { border: 1px solid var(--border); padding: 0.4em 0.8em; vertical-align: top; }
	:global(.markdown th) { background: var(--header-bg); }
	:global(.markdown tr:nth-child(2n)) { background: var(--header-bg); }
	:global(.markdown code) { background: var(--code-bg); padding: 0.15em 0.35em; border-radius: 4px; font-size: 0.9em; }
	:global(.markdown pre) { background: var(--pre-bg); padding: 1em; overflow-x: auto; border-radius: 6px; }
	:global(.markdown pre code) { background: none; padding: 0; }
	:global(.markdown blockquote) { margin: 0; padding: 0 1em; color: var(--muted); border-left: 0.25em solid var(--border); }
	:global(.markdown img) { max-width: 100%; }
</style>
