<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import AppMenu from './AppMenu.svelte';
	import ViewToggle from './ViewToggle.svelte';

	let { slides }: { slides: string[] } = $props();

	const count = $derived(Math.max(1, slides.length));

	let i = $state((() => {
		const n = parseInt(page.url.searchParams.get('n') ?? '1', 10);
		const max = Math.max(1, slides.length);
		if (!Number.isFinite(n)) return 0;
		return Math.max(0, Math.min(max - 1, n - 1));
	})());

	let fullscreen = $state(false);
	let blank = $state(false);
	let overview = $state(false);
	let chrome = $state(true);
	let menuOpen = $state(false);
	let startX = 0;
	let hideTimer = 0;
	let deck: HTMLElement | undefined = $state();

	function go(n: number) {
		const next = Math.max(0, Math.min(count - 1, n));
		if (next === i) return;
		i = next;
		const url = new URL(page.url.href);
		if (next === 0) url.searchParams.delete('n');
		else url.searchParams.set('n', String(next + 1));
		history.replaceState(history.state, '', url);
	}

	function next() {
		go(i + 1);
	}
	function prev() {
		go(i - 1);
	}

	function poke() {
		chrome = true;
		clearTimeout(hideTimer);
		hideTimer = window.setTimeout(() => {
			if (!overview && !menuOpen) chrome = false;
		}, 2000);
	}

	function preview(html: string) {
		return html
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.slice(0, 90);
	}

	function typing(e: KeyboardEvent) {
		const t = e.target;
		if (!(t instanceof HTMLElement)) return false;
		return (
			t.isContentEditable ||
			t.tagName === 'INPUT' ||
			t.tagName === 'TEXTAREA' ||
			t.tagName === 'SELECT'
		);
	}

	function onKey(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey || typing(e)) return;

		if (blank && e.key !== 'f' && e.key !== 'F') {
			e.preventDefault();
			blank = false;
			return;
		}

		const forward =
			e.key === 'ArrowRight' ||
			e.key === 'ArrowDown' ||
			e.key === 'PageDown' ||
			e.key === 'Enter' ||
			((e.key === ' ' || e.code === 'Space') && !e.shiftKey);
		const back =
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowUp' ||
			e.key === 'PageUp' ||
			e.key === 'Backspace' ||
			((e.key === ' ' || e.code === 'Space') && e.shiftKey);

		if (overview && (e.key === 'Escape' || e.key === 'o' || e.key === 'O')) {
			e.preventDefault();
			overview = false;
			poke();
			return;
		}
		if (forward) {
			e.preventDefault();
			if (!overview) next();
		} else if (back) {
			e.preventDefault();
			if (!overview) prev();
		} else if (e.key === 'Home') {
			e.preventDefault();
			go(0);
			overview = false;
		} else if (e.key === 'End') {
			e.preventDefault();
			go(count - 1);
			overview = false;
		} else if (e.key === 'f' || e.key === 'F') {
			e.preventDefault();
			toggleFullscreen();
		} else if (e.key === 'b' || e.key === 'B' || e.key === '.' || e.key === ',') {
			e.preventDefault();
			blank = !blank;
		} else if (e.key === 'o' || e.key === 'O') {
			e.preventDefault();
			overview = !overview;
			chrome = true;
		} else if (e.key === 'Escape') {
			e.preventDefault();
			if (menuOpen) {
				menuOpen = false;
				return;
			}
			if (document.fullscreenElement) document.exitFullscreen();
			else overview = !overview;
		}
	}

	async function toggleFullscreen() {
		try {
			if (!document.fullscreenElement) await deck?.requestFullscreen();
			else await document.exitFullscreen();
		} catch {
			/* browser afviste fullscreen */
		}
	}

	function onFsChange() {
		fullscreen = !!document.fullscreenElement;
		poke();
	}

	function onPointerDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		startX = e.clientX;
	}
	let swiped = false;

	function onPointerUp(e: PointerEvent) {
		if (overview || blank) return;
		const t = e.target;
		if (t instanceof Element && t.closest('a, button, .chrome, .overview, .menu')) return;
		const dx = e.clientX - startX;
		if (dx > 60) {
			swiped = true;
			prev();
		} else if (dx < -60) {
			swiped = true;
			next();
		}
	}

	function onClick(e: MouseEvent) {
		if (swiped) {
			swiped = false;
			return;
		}
		const t = e.target;
		if (!(t instanceof Element)) return;
		const a = t.closest('a');
		if (a) {
			if (e.metaKey || e.ctrlKey || e.shiftKey) return;
			e.preventDefault();
			return;
		}
		if (t.closest('button, .chrome, .overview, .fs, .switch, .menu, .panel')) return;
		if (blank) {
			blank = false;
			return;
		}
		if (overview) return;
		if (e.clientX < window.innerWidth * 0.28) prev();
		else next();
	}

	onMount(() => {
		deck?.focus({ preventScroll: true });
		poke();
		return () => clearTimeout(hideTimer);
	});
</script>

<svelte:window onkeydown={onKey} onmousemove={poke} />
<svelte:document onfullscreenchange={onFsChange} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={deck}
	class="deck"
	class:idle={!chrome && !overview}
	class:blank
	style="--i: {i}; --p: {((i + 1) / count) * 100}%"
	role="application"
	tabindex="-1"
	aria-label="Forelæsningsslides"
	onclick={onClick}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
>
	<header class="chrome">
		<p class="count" aria-live="polite">{i + 1} / {count}</p>
		<p class="keys">F fuld skærm · B sort · O overblik</p>
		<div class="right">
			<ViewToggle />
			<button type="button" class="fs" onclick={toggleFullscreen}>
				{fullscreen ? 'Afslut fuld skærm' : 'Fuld skærm'}
			</button>
			<AppMenu bind:open={menuOpen} />
		</div>
	</header>

	<div class="viewport" aria-label="Slide {i + 1} af {count}">
		<div class="track">
			{#each slides as html, n (n)}
				<article class="slide" aria-hidden={n !== i}>
					<div class="inner markdown">{@html html}</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="progress" aria-hidden="true"></div>

	{#if overview}
		<div class="overview">
			{#each slides as html, n (n)}
				<button
					type="button"
					class="thumb"
					class:current={n === i}
					onclick={() => {
						go(n);
						overview = false;
						poke();
					}}
				>
					<span class="num">{n + 1}</span>
					<span class="txt">{preview(html)}</span>
				</button>
			{/each}
		</div>
	{/if}

	{#if blank}
		<div class="curtain" aria-hidden="true"></div>
	{/if}
</div>

<style>
	.deck {
		position: fixed;
		inset: 0;
		z-index: 40;
		display: flex;
		flex-direction: column;
		background: var(--slide-bg);
		color: var(--slide-fg);
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
		outline: none;
		cursor: none;
	}
	.deck:not(.idle) { cursor: default; }

	.chrome {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 4;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.25rem;
		color: var(--slide-chrome);
		font-size: 0.88rem;
		background: linear-gradient(to bottom, color-mix(in srgb, var(--slide-bg) 92%, transparent), transparent);
		opacity: 1;
		transition: opacity 0.25s ease;
	}
	.idle .chrome,
	.blank .chrome {
		opacity: 0;
		pointer-events: none;
	}
	.count {
		margin: 0;
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		letter-spacing: 0.04em;
		justify-self: start;
	}
	.keys {
		margin: 0;
		opacity: 0.55;
		letter-spacing: 0.02em;
		justify-self: center;
	}
	.right {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}
	.fs {
		border: 0;
		background: color-mix(in srgb, var(--slide-fg) 10%, transparent);
		color: inherit;
		border-radius: 999px;
		padding: 0.4rem 0.9rem;
		font: inherit;
		cursor: pointer;
	}
	.fs:hover { background: color-mix(in srgb, var(--slide-fg) 16%, transparent); }

	.viewport {
		flex: 1;
		overflow: hidden;
		touch-action: none;
	}
	.track {
		display: flex;
		height: 100%;
		width: 100%;
		transform: translate3d(calc(-100% * var(--i)), 0, 0);
		transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}
	@media (prefers-reduced-motion: reduce) {
		.track { transition: none; }
	}

	.slide {
		flex: 0 0 100%;
		width: 100%;
		height: 100%;
		overflow: auto;
		display: flex;
		padding: 6vh 8vw 8vh;
		box-sizing: border-box;
		user-select: none;
	}
	.inner {
		margin: auto;
		width: min(62rem, 100%);
	}

	.progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
		height: 3px;
		background: var(--slide-progress);
	}
	.progress::after {
		content: '';
		display: block;
		height: 100%;
		width: var(--p);
		background: var(--slide-progress-fill);
	}

	.curtain {
		position: absolute;
		inset: 0;
		z-index: 6;
		background: #000;
	}

	.overview {
		position: absolute;
		inset: 0;
		z-index: 5;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: 0.75rem;
		align-content: start;
		padding: 4.5rem 1.25rem 1.5rem;
		overflow: auto;
		background: var(--slide-bg);
	}
	.thumb {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-height: 6.5rem;
		padding: 0.7rem 0.8rem;
		border: 1px solid var(--slide-border);
		border-radius: 10px;
		background: var(--slide-thumb-bg);
		color: var(--slide-fg);
		text-align: left;
		cursor: pointer;
		font: inherit;
	}
	.thumb:hover { border-color: var(--slide-progress-fill); }
	.thumb.current { border-color: var(--slide-progress-fill); box-shadow: 0 0 0 1px var(--slide-progress-fill); }
	.num {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--slide-muted);
	}
	.txt {
		font-size: 0.92rem;
		line-height: 1.35;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.inner :global(h1),
	.inner :global(h2),
	.inner :global(h3) {
		border: 0;
		padding: 0;
		margin: 0 0 0.55em;
		line-height: 1.12;
		font-weight: 700;
		color: var(--slide-heading);
		text-wrap: balance;
	}
	.inner :global(h1) { font-size: clamp(2.4rem, 6.2vw, 4.4rem); }
	.inner :global(h2) { font-size: clamp(1.85rem, 4.4vw, 3.1rem); }
	.inner :global(h3) { font-size: clamp(1.35rem, 2.6vw, 1.8rem); }
	.inner :global(p),
	.inner :global(li) {
		font-size: clamp(1.2rem, 2.5vw, 1.7rem);
		line-height: 1.4;
		margin: 0 0 0.55em;
	}
	.inner :global(ul),
	.inner :global(ol) { margin: 0 0 0.8em; padding-left: 1.15em; }
	.inner :global(a) {
		color: var(--slide-link);
		pointer-events: auto;
		text-decoration: underline;
		text-underline-offset: 0.12em;
	}
	.inner :global(code) {
		background: var(--slide-code-bg);
		color: var(--slide-code);
		padding: 0.08em 0.38em;
		border-radius: 5px;
		font-size: 0.86em;
	}
	.inner :global(pre) {
		background: var(--slide-pre-bg);
		color: var(--slide-pre-fg);
		padding: 1rem 1.2rem;
		border-radius: 12px;
		overflow: auto;
		max-height: 52vh;
		font-size: clamp(0.9rem, 1.6vw, 1.15rem);
		line-height: 1.45;
		user-select: text;
		box-shadow: inset 0 0 0 1px var(--slide-border);
	}
	.inner :global(pre code) { background: none; color: inherit; padding: 0; }
	.inner :global(table) {
		display: table;
		width: 100%;
		overflow: auto;
		font-size: clamp(1rem, 1.8vw, 1.25rem);
	}
	.inner :global(th),
	.inner :global(td) {
		border-color: var(--slide-border);
		padding: 0.45em 0.7em;
	}
	.inner :global(th) { background: var(--slide-table-head); color: var(--slide-heading); }
	.inner :global(tr:nth-child(2n)) { background: var(--slide-table-alt); }
	.inner :global(hr) { display: none; }
	.inner :global(blockquote) {
		color: var(--slide-muted);
		border-left-color: var(--slide-progress-fill);
	}

	@media (max-width: 50rem) {
		.slide { padding: 5.5rem 1.4rem 3.5rem; }
		.keys, .fs { display: none; }
	}
</style>
