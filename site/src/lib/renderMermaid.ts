import mermaid from 'mermaid';

let currentTheme: string | null = null;

/** Tegn ```mermaid-blokke inde i root. Kaldes igen ved temaskift. */
export async function renderMermaid(root: ParentNode) {
	const mode = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral';
	const themeChanged = currentTheme !== mode;
	currentTheme = mode;

	const nodes: HTMLElement[] = [];

	for (const code of root.querySelectorAll('code.language-mermaid')) {
		const pre = code.parentElement;
		if (!pre || pre.tagName !== 'PRE') continue;
		const source = code.textContent ?? '';
		const div = document.createElement('div');
		div.className = 'mermaid';
		div.dataset.source = source;
		div.textContent = source;
		pre.replaceWith(div);
		nodes.push(div);
	}

	if (themeChanged) {
		for (const el of root.querySelectorAll<HTMLElement>('.mermaid[data-source]')) {
			if (nodes.includes(el)) continue;
			el.textContent = el.dataset.source ?? '';
			nodes.push(el);
		}
	}

	if (nodes.length === 0) return;

	mermaid.initialize({
		startOnLoad: false,
		theme: mode,
		securityLevel: 'strict',
		fontFamily: 'inherit',
		sequence: { mirrorActors: false }
	});
	await mermaid.run({ nodes });
}
