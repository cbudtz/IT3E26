import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mediaTypeFor, rewriteHref } from './contentPaths.ts';

test('rewriteHref maps a relative image next to a lecture file', () => {
	assert.equal(
		rewriteHref('images/linus-torvalds.jpg', 'lektion5/forelaesning.md'),
		'/lektion5/images/linus-torvalds.jpg'
	);
});

test('rewriteHref leaves absolute image URLs alone', () => {
	assert.equal(
		rewriteHref('https://example.com/linus.jpg', 'lektion5/forelaesning.md'),
		'https://example.com/linus.jpg'
	);
});

test('mediaTypeFor accepts raster images in lesson folders', () => {
	assert.equal(mediaTypeFor('lektion5/images/linus-torvalds.jpg'), 'image/jpeg');
	assert.equal(mediaTypeFor('lektion1/oevelser/images/kat.PNG'), 'image/png');
	assert.equal(mediaTypeFor('lektion5/images/foto.webp'), 'image/webp');
});

test('mediaTypeFor accepts lesson demo html, css and js', () => {
	assert.equal(mediaTypeFor('lektion7/dom-blodtryk.html'), 'text/html; charset=utf-8');
	assert.equal(mediaTypeFor('lektion7/dom-blodtryk.css'), 'text/css; charset=utf-8');
	assert.equal(mediaTypeFor('lektion7/dom-blodtryk.js'), 'text/javascript; charset=utf-8');
});

test('mediaTypeFor rejects non-images, hidden dirs and empty paths', () => {
	assert.equal(mediaTypeFor('lektion5/forelaesning.md'), null);
	assert.equal(mediaTypeFor('lektion5/quiz-lektion5.json'), null);
	assert.equal(mediaTypeFor('docs/secret.jpg'), null);
	assert.equal(mediaTypeFor('site/static/x.jpg'), null);
	assert.equal(mediaTypeFor(''), null);
	assert.equal(mediaTypeFor('lektion5/images/icon.svg'), null);
});
