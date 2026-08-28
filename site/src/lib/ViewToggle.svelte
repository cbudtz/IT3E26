<script lang="ts">
	import Switch from './Switch.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

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

<Switch
	checked={on}
	labelOff="Dokument"
	labelOn="Slides"
	ariaLabel="Skift mellem dokument og slides"
	onToggle={setOn}
/>
