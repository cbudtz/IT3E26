<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { variant = 'light' }: { variant?: 'light' | 'dark' } = $props();

	const on = $derived(page.url.searchParams.get('show') === 'slide');

	function setOn(next: boolean) {
		const url = new URL(page.url);
		if (next) {
			url.searchParams.set('show', 'slide');
		} else {
			url.searchParams.delete('show');
			url.searchParams.delete('n');
		}
		goto(url.pathname + url.search, { replaceState: true, keepFocus: true, noScroll: true });
	}
</script>

<div class="switch" class:dark={variant === 'dark'} class:light={variant === 'light'}>
	<span class="label" class:active={!on}>Dokument</span>
	<button
		type="button"
		role="switch"
		aria-checked={on}
		aria-label="Skift mellem dokument og slides"
		onclick={() => setOn(!on)}
	>
		<span class="knob"></span>
	</button>
	<span class="label" class:active={on}>Slides</span>
</div>

<style>
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		user-select: none;
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}
	.label { opacity: 0.45; }
	.label.active { opacity: 1; }
	.light .label.active { color: #1f2328; }
	.dark .label { color: #c5cdd8; }
	.dark .label.active { color: #fff; }

	button {
		position: relative;
		width: 2.6rem;
		height: 1.45rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.2s ease;
	}
	.light button {
		background: #d0d7de;
		box-shadow: inset 0 0 0 1px #c0c7cf;
	}
	.light button[aria-checked='true'] { background: #0969da; box-shadow: none; }
	.dark button {
		background: #3a4150;
	}
	.dark button[aria-checked='true'] { background: #5b9dff; }

	.knob {
		position: absolute;
		top: 0.18rem;
		left: 0.18rem;
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
		transition: transform 0.2s ease;
	}
	button[aria-checked='true'] .knob {
		transform: translateX(1.15rem);
	}
</style>
