<script lang="ts">
	import { page } from '$app/state';

	const content = $derived((page.data as { page?: { slug?: string; file?: string } }).page);
	const href = $derived(
		content?.file?.endsWith('.md')
			? '/download' + (content.slug ? `/${content.slug}` : '')
			: null
	);
</script>

{#if href}
	<div class="downloads">
		<a
			class="item"
			href={href}
			download
			data-sveltekit-reload
			aria-label="Download markdown"
			title="Download markdown"
		>
			<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
				<path
					fill="currentColor"
					d="M8 1.5a.75.75 0 0 1 .75.75v6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V2.25A.75.75 0 0 1 8 1.5ZM3 12.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5H3Z"
				/>
			</svg>
			MD
		</a>
		<button
			type="button"
			class="item"
			aria-label="Gem som PDF"
			title="Gem som PDF"
			onclick={() => window.print()}
		>
			<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
				<path
					fill="currentColor"
					d="M8 1.5a.75.75 0 0 1 .75.75v6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V2.25A.75.75 0 0 1 8 1.5ZM3 12.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5H3Z"
				/>
			</svg>
			PDF
		</button>
	</div>
{/if}

<style>
	.downloads {
		display: inline-flex;
		align-items: center;
		gap: 0.1rem;
	}
	.item {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		padding: 0.28rem 0.48rem;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
	}
	.item:hover {
		background: color-mix(in srgb, currentColor 10%, transparent);
	}
	.item:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	@media print {
		.downloads { display: none; }
	}
</style>
