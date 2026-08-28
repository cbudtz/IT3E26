<script lang="ts">
	let {
		checked,
		labelOff,
		labelOn,
		ariaLabel,
		onToggle
	}: {
		checked: boolean;
		labelOff: string;
		labelOn: string;
		ariaLabel: string;
		onToggle: (next: boolean) => void;
	} = $props();
</script>

<div class="switch">
	<span class="label" class:active={!checked}>{labelOff}</span>
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={ariaLabel}
		onclick={() => onToggle(!checked)}
	>
		<span class="knob"></span>
	</button>
	<span class="label" class:active={checked}>{labelOn}</span>
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
		color: var(--fg);
	}
	.label { opacity: 0.45; }
	.label.active { opacity: 1; }

	button {
		position: relative;
		width: 2.6rem;
		height: 1.45rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		cursor: pointer;
		flex-shrink: 0;
		background: var(--switch-off);
		transition: background 0.2s ease;
	}
	button[aria-checked='true'] { background: var(--accent); }

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
