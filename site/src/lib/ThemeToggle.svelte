<script lang="ts">
	import Switch from './Switch.svelte';
	import { theme, setTheme } from './theme.svelte';
</script>

<Switch
	checked={theme.mode === 'dark'}
	labelOff="Lys"
	labelOn="Mørk"
	ariaLabel="Skift mellem lyst og mørkt tema"
	onToggle={(dark) => setTheme(dark ? 'dark' : 'light')}
/>
