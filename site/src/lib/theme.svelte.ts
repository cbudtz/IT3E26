export type Theme = 'light' | 'dark';

/** Delt tema for hele sitet (dokument + slideshow). */
export const theme = $state({
	mode: 'light' as Theme
});

function apply(mode: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = mode;
	try {
		localStorage.setItem('it3e26_theme', mode);
	} catch {
		/* privat tilstand / blocked storage */
	}
}

export function setTheme(mode: Theme) {
	theme.mode = mode;
	apply(mode);
}

export function initTheme() {
	if (typeof localStorage === 'undefined') return;
	const stored = localStorage.getItem('it3e26_theme');
	if (stored === 'dark' || stored === 'light') setTheme(stored);
	else apply(theme.mode);
}
