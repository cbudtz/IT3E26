/** Parser et quiz-kørsels-id fra form-data. Returnerer null ved ugyldig værdi. */
export function parseQuizRunId(raw: unknown): number | null {
	if (typeof raw !== 'string' && typeof raw !== 'number') return null;
	const id = typeof raw === 'number' ? raw : Number(raw.trim());
	if (!Number.isInteger(id) || id <= 0) return null;
	return id;
}
