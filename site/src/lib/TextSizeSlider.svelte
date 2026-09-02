<script lang="ts">
	import { textSize, setTextSize, type TextStep } from './textsize.svelte';

	function onInput(e: Event) {
		const v = Number((e.currentTarget as HTMLInputElement).value);
		if (v === 1 || v === 2 || v === 3 || v === 4) setTextSize(v as TextStep);
	}
</script>

<label class="size">
	<span class="a small" aria-hidden="true">A</span>
	<input
		type="range"
		min="1"
		max="4"
		step="1"
		value={textSize.step}
		aria-label="Tekststørrelse på slides"
		aria-valuetext="Trin {textSize.step} af 4"
		oninput={onInput}
	/>
	<span class="a big" aria-hidden="true">A</span>
</label>

<style>
	.size {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		width: 100%;
		user-select: none;
		font-weight: 700;
		color: var(--fg);
		cursor: pointer;
	}
	.a { line-height: 1; opacity: 0.65; }
	.a.small { font-size: 0.72rem; }
	.a.big { font-size: 1.05rem; }

	input {
		flex: 1;
		min-width: 5rem;
		height: 1.45rem;
		margin: 0;
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		cursor: pointer;
	}
	input::-webkit-slider-runnable-track {
		height: 0.3rem;
		border-radius: 999px;
		background: var(--switch-off);
	}
	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 1.1rem;
		height: 1.1rem;
		margin-top: -0.4rem;
		border: 0;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
	}
	input::-moz-range-track {
		height: 0.3rem;
		border-radius: 999px;
		background: var(--switch-off);
	}
	input::-moz-range-thumb {
		width: 1.1rem;
		height: 1.1rem;
		border: 0;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
	}
	input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 999px;
	}
</style>
