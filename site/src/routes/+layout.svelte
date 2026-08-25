<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	let { children } = $props();

	const crumbs = $derived(
		page.url.pathname.split('/').filter(Boolean).map((part, i, all) => ({
			name: part,
			href: '/' + all.slice(0, i + 1).join('/')
		}))
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<a href="/" class="brand">IT3E26</a>
		{#each crumbs as c}
			<span class="sep">/</span><a href={c.href}>{c.name}</a>
		{/each}
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.55;
		color: #1f2328;
		background: #fff;
	}
	header {
		border-bottom: 1px solid #d0d7de;
		background: #f6f8fa;
	}
	nav {
		max-width: 60rem;
		margin: 0 auto;
		padding: 0.6rem 1.25rem;
		font-size: 0.95rem;
	}
	nav a { color: #0969da; text-decoration: none; }
	nav a:hover { text-decoration: underline; }
	.brand { font-weight: 700; color: #1f2328; }
	.sep { margin: 0 0.4rem; color: #6e7781; }
	main {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1.5rem 1.25rem 4rem;
	}

	/* GitHub-agtig markdown */
	:global(.markdown h1) { border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
	:global(.markdown h2) { border-bottom: 1px solid #d8dee4; padding-bottom: 0.25em; margin-top: 2em; }
	:global(.markdown a) { color: #0969da; }
	:global(.markdown table) { border-collapse: collapse; display: block; overflow-x: auto; max-width: 100%; }
	:global(.markdown th), :global(.markdown td) { border: 1px solid #d0d7de; padding: 0.4em 0.8em; vertical-align: top; }
	:global(.markdown th) { background: #f6f8fa; }
	:global(.markdown tr:nth-child(2n)) { background: #f6f8fa; }
	:global(.markdown code) { background: #eff1f3; padding: 0.15em 0.35em; border-radius: 4px; font-size: 0.9em; }
	:global(.markdown pre) { background: #f6f8fa; padding: 1em; overflow-x: auto; border-radius: 6px; }
	:global(.markdown pre code) { background: none; padding: 0; }
	:global(.markdown blockquote) { margin: 0; padding: 0 1em; color: #57606a; border-left: 0.25em solid #d0d7de; }
	:global(.markdown img) { max-width: 100%; }
</style>
