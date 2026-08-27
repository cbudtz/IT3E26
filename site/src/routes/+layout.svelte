<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
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

<header>
	<nav>
		<div class="crumbs">
			<a href="/" class="brand">IT3E26</a>
			{#each crumbs as c (c.href)}
				<span class="sep">/</span><a href={c.href}>{c.name}</a>
			{/each}
		</div>

		<button
			type="button"
			class="menu-toggle"
			aria-expanded={menuOpen}
			aria-controls="site-menu"
			aria-label="Menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="bars" aria-hidden="true"></span>
		</button>

		<ul id="site-menu" class="links" class:open={menuOpen}>
			<li>
				<a href="/quiz" aria-current={onQuiz ? 'page' : undefined}>Quiz</a>
			</li>
		</ul>
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
		position: relative;
		border-bottom: 1px solid #d0d7de;
		background: #f6f8fa;
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
	nav a { color: #0969da; text-decoration: none; }
	nav a:hover { text-decoration: underline; }
	.crumbs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		min-width: 0;
		flex: 1;
	}
	.brand { font-weight: 700; color: #1f2328; }
	.sep { margin: 0 0.4rem; color: #6e7781; }
	.menu-toggle {
		display: none;
		flex-shrink: 0;
		width: 2.4rem;
		height: 2.4rem;
		margin: -0.3rem -0.4rem -0.3rem 0;
		padding: 0;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: #1f2328;
		cursor: pointer;
	}
	.menu-toggle:hover { background: #eaeef2; }
	.bars {
		display: block;
		width: 1.15rem;
		height: 2px;
		margin: 0 auto;
		background: currentColor;
		box-shadow: 0 -6px currentColor, 0 6px currentColor;
	}
	.links {
		display: flex;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.15rem;
	}
	.links a {
		display: block;
		padding: 0.3rem 0.65rem;
		border-radius: 6px;
		font-weight: 600;
	}
	.links a[aria-current='page'] {
		background: #fff;
		color: #1f2328;
		box-shadow: inset 0 0 0 1px #d0d7de;
	}
	@media (max-width: 40rem) {
		.menu-toggle { display: inline-flex; align-items: center; justify-content: center; }
		.links {
			display: none;
			position: absolute;
			left: 0;
			right: 0;
			top: 100%;
			z-index: 20;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 0.35rem 1.25rem 0.6rem;
			background: #fff;
			border-bottom: 1px solid #d0d7de;
		}
		.links.open { display: flex; }
		.links a { padding: 0.75rem 0.4rem; }
	}
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
