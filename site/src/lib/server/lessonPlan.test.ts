import assert from 'node:assert/strict';
import { test } from 'node:test';
import { enhanceLessonPlan } from './lessonPlan.ts';

const plan = `
<table>
<thead>
<tr>
<th>Lektion</th>
<th>Dato</th>
<th>Spor</th>
<th>Emner</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>2/9</td>
<td><strong>Web</strong></td>
<td>HTML-introduktion</td>
</tr>
<tr>
<td>2</td>
<td>4/9</td>
<td><strong>Projekt</strong></td>
<td>Project Scope</td>
</tr>
<tr>
<td><strong>D1</strong> (tirs.)</td>
<td>6/10</td>
<td>—</td>
<td>Delaflevering 1</td>
</tr>
<tr>
<td>10</td>
<td>2/10</td>
<td><strong>Projektarbejde</strong></td>
<td>Frem mod D1</td>
</tr>
</tbody>
</table>
`;

const program = `
<table>
<thead>
<tr>
<th>Tid</th>
<th>Blok</th>
<th>Indhold</th>
</tr>
</thead>
<tbody>
<tr>
<td>20 min</td>
<td>Kursusintro</td>
<td>Kursets opbygning</td>
</tr>
</tbody>
</table>
`;

test('forstærker kun rækker hvis N er i available', () => {
	const html = enhanceLessonPlan(plan, new Set([1]));
	assert.match(html, /<tr[^>]*class="lesson-row"[^>]*data-href="\/lektion1"/);
	assert.match(html, /<a href="\/lektion1">1<\/a>/);
	assert.doesNotMatch(html, /data-href="\/lektion2"/);
	assert.doesNotMatch(html, /data-href="\/lektion10"/);
	const d1 = html.split('<tr').find((r) => r.includes('D1'));
	assert.ok(d1);
	assert.equal(d1.includes('lesson-row'), false);
});

test('dobbelt-wrapper ikke et eksisterende GitHub-link', () => {
	const withLink = plan.replace('<td>1</td>', '<td><a href="/lektion1">1</a></td>');
	const html = enhanceLessonPlan(withLink, new Set([1]));
	assert.equal(html.includes('<a href="/lektion1"><a href="/lektion1">'), false);
	assert.match(html, /<td><a href="\/lektion1">1<\/a><\/td>/);
	assert.match(html, /class="lesson-row"/);
	assert.match(html, /data-href="\/lektion1"/);
});

test('matcher lektion 10 som 10, ikke 1', () => {
	const html = enhanceLessonPlan(plan, new Set([10]));
	assert.match(html, /data-href="\/lektion10"/);
	assert.doesNotMatch(html, /data-href="\/lektion1"/);
});

test('rører ikke program-tabeller', () => {
	const html = enhanceLessonPlan(program, new Set([1, 20]));
	assert.equal(html.includes('lesson-row'), false);
	assert.equal(html, program);
});

test('rører ikke HTML uden lektionsplan-tabel', () => {
	const html = enhanceLessonPlan('<p>hej</p>', new Set([1]));
	assert.equal(html, '<p>hej</p>');
});

test('header Lektion er case-insensitive', () => {
	const html = enhanceLessonPlan(
		plan.replace('<th>Lektion</th>', '<th>lektionsplan</th>'),
		new Set([1])
	);
	assert.equal(html.includes('lesson-row'), false);
	const ok = enhanceLessonPlan(plan.replace('<th>Lektion</th>', '<th>LEKTION</th>'), new Set([1]));
	assert.match(ok, /lesson-row/);
});
