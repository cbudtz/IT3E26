<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import ViewToggle from './ViewToggle.svelte';
	import { page } from '$app/state';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	const onQuiz = $derived(
		page.url.pathname === '/quiz' || page.url.pathname.startsWith('/quiz/')
	);
	const onAuth = $derived(page.url.pathname.startsWith('/auth'));
	const showViewToggle = $derived(!onQuiz && !onAuth);
</script>

<div class="menu">
	<button
		type="button"
		class="menu-toggle"
		aria-expanded={open}
		aria-controls="site-menu"
		aria-label="Menu"
		onclick={(e) => {
			e.stopPropagation();
			open = !open;
		}}
	>
		<span class="bars" aria-hidden="true"></span>
	</button>

	<ul id="site-menu" class="panel" class:open>
		<li>
			<a href="/quiz" aria-current={onQuiz ? 'page' : undefined}>Quiz</a>
		</li>
		{#if showViewToggle}
			<li class="control">
				<ViewToggle />
			</li>
		{/if}
		<li class="control">
			<ThemeToggle />
		</li>
	</ul>
</div>

<style>
	.menu { position: relative; }
	.menu-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2.4rem;
		height: 2.4rem;
		padding: 0;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--fg);
		cursor: pointer;
	}
	.menu-toggle:hover { background: var(--code-bg); }
	.bars {
		display: block;
		width: 1.15rem;
		height: 2px;
		margin: 0 auto;
		background: currentColor;
		box-shadow: 0 -6px currentColor, 0 6px currentColor;
	}
	.panel {
		display: none;
		position: absolute;
		right: 0;
		top: calc(100% + 0.35rem);
		z-index: 30;
		flex-direction: column;
		align-items: stretch;
		gap: 0.15rem;
		min-width: 13.5rem;
		margin: 0;
		padding: 0.45rem;
		list-style: none;
		background: var(--bg);
		color: var(--fg);
		border: 1px solid var(--border);
		border-radius: 10px;
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
	}
	.panel.open { display: flex; }
	.panel a {
		display: block;
		padding: 0.55rem 0.7rem;
		border-radius: 6px;
		font-weight: 600;
		color: var(--link);
		text-decoration: none;
	}
	.panel a:hover { background: var(--code-bg); }
	.panel a[aria-current='page'] {
		background: var(--header-bg);
		color: var(--fg);
		box-shadow: inset 0 0 0 1px var(--border);
	}
	.control {
		display: flex;
		align-items: center;
		padding: 0.45rem 0.55rem 0.35rem;
	}
</style>
