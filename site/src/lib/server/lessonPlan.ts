const TAG = /<[^>]+>/g;
const TABLE = /<table\b[^>]*>[\s\S]*?<\/table>/gi;
const ROW = /<tr\b[^>]*>[\s\S]*?<\/tr>/gi;

export function cellText(html: string): string {
	return html.replace(TAG, ' ').replace(/\s+/g, ' ').trim();
}

function firstHeaderCell(table: string): string {
	const th = table.match(/<th\b[^>]*>([\s\S]*?)<\/th>/i);
	return th ? cellText(th[1]) : '';
}

function enhanceRow(tr: string, available: ReadonlySet<number>): string {
	if (/<th\b/i.test(tr)) return tr;
	const td = tr.match(/<td\b[^>]*>([\s\S]*?)<\/td>/i);
	if (!td) return tr;
	const inner = td[1];
	const text = cellText(inner);
	if (!/^\d+$/.test(text)) return tr;
	const n = Number(text);
	if (!available.has(n)) return tr;
	const href = `/lektion${n}`;
	const newInner = /<a\b/i.test(inner) ? inner : `<a href="${href}">${n}</a>`;
	const newTd = td[0].replace(inner, newInner);
	return tr.replace(td[0], newTd).replace(/^<tr\b([^>]*)>/i, (_m, attrs: string) => {
		let next = attrs as string;
		if (/\bclass="/i.test(next)) next = next.replace(/\bclass="/i, 'class="lesson-row ');
		else next += ' class="lesson-row"';
		next += ` data-href="${href}"`;
		return `<tr${next}>`;
	});
}

export function enhanceLessonPlan(html: string, available: ReadonlySet<number>): string {
	return html.replace(TABLE, (table) => {
		if (firstHeaderCell(table).toLowerCase() !== 'lektion') return table;
		return table.replace(ROW, (tr) => enhanceRow(tr, available));
	});
}
