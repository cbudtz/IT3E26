export type TextStep = 1 | 2 | 3;

/** Tekststørrelse for slideshowet i tre trin (1 = normal). */
export const textSize = $state({
	step: 1 as TextStep
});

const SCALES: Record<TextStep, number> = { 1: 1, 2: 1.18, 3: 1.38 };

export function textScale(step: TextStep) {
	return SCALES[step];
}

export function setTextSize(step: TextStep) {
	textSize.step = step;
	try {
		localStorage.setItem('it3e26_slide_textsize', String(step));
	} catch {
		/* privat tilstand / blocked storage */
	}
}

export function initTextSize() {
	if (typeof localStorage === 'undefined') return;
	const stored = Number(localStorage.getItem('it3e26_slide_textsize'));
	if (stored === 1 || stored === 2 || stored === 3) textSize.step = stored;
}
