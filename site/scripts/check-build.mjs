import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { load } from 'cheerio';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, process.env.OSRBOT_SITE_OUT || '.vitepress/dist');
const base = process.env.OSRBOT_SITE_BASE || '/';
assert.ok(base.startsWith('/') && base.endsWith('/'), 'Base must start and end with /');
const origin = 'https://manual.invalid';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  assert.ok(!entry.isSymbolicLink(), `Unexpected symbolic link: ${entry.name}`);
  return entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)];
});
const files = walk(out);
const documents = new Map();
for (const file of files) {
  assert.ok(!/\.(?:pdf|docx|exe|dmg|deb|AppImage|map)$/i.test(file), `Unexpected delivery file: ${file}`);
  assert.ok(!/\.(?:woff2?|ttf|otf|eot)$/i.test(file), `Bundled font in system-font site: ${file}`);
  if (file.endsWith('.html')) documents.set(base + relative(out, file), load(readFileSync(file, 'utf8')));
}
assert.equal(documents.size, 17, 'Expected 16 bilingual pages plus the 404 page');
let checked = 0;
function checkURL(value, pageURL, anchor = false) {
  if (!value || /^(?:data:|mailto:|tel:)/.test(value)) return;
  const url = new URL(value, pageURL);
  if (url.origin !== origin) return;
  assert.ok(url.pathname.startsWith(base), `Link escapes deployment base: ${value} on ${pageURL}`);
  const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
  assert.ok(existsSync(join(out, decodeURIComponent(path.slice(base.length)))), `Missing local resource: ${url.href}`);
  if (anchor && url.hash) {
    const target = documents.get(path);
    assert.ok(target, `Anchor points outside an HTML page: ${url.href}`);
    const id = decodeURIComponent(url.hash.slice(1));
    assert.ok(target('[id]').toArray().some(element => target(element).attr('id') === id), `Missing anchor: ${url.href}`);
  }
  checked++;
}
for (const [path, $] of documents) {
  assert.equal($('link[as="font"]').length, 0, `Font preload in system-font site: ${path}`);
  $('a[href], link[href], script[src], img[src]').each((_, element) => {
    checkURL($(element).attr('href') || $(element).attr('src'), origin + path, element.tagName === 'a');
  });
  $('.vp-doc figure img').each((_, element) => {
    const image = $(element);
    assert.ok(Number(image.attr('width')) > 0 && Number(image.attr('height')) > 0, `Image has no intrinsic size: ${path}`);
    assert.ok(['eager', 'lazy'].includes(image.attr('loading')), `Missing image loading policy: ${path}`);
    assert.ok(image.attr('data-full-src'), `Missing original image: ${path}`);
    checkURL(image.attr('data-full-src'), origin + path);
    if (image.attr('srcset')) {
      assert.ok(image.attr('sizes'), `Responsive image has no sizes: ${path}`);
      assert.ok(image.attr('src').endsWith('.webp'), `Responsive fallback is not a preview: ${path}`);
      for (const source of image.attr('srcset').split(',')) {
        const [url, width] = source.trim().split(/\s+/);
        assert.match(width, /^\d+w$/);
        checkURL(url, origin + path);
      }
    }
  });
  if (!path.endsWith('/404.html')) {
    assert.equal($('.vp-doc h1').length, 1, `Incorrect page heading: ${path}`);
    assert.ok(!$('.vp-doc').text().includes('功能未启用'), `Internal figure note: ${path}`);
  }
}
for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = readFileSync(file, 'utf8');
  assert.ok(!/@font-face\b/i.test(css), `Web font declaration in system-font site: ${file}`);
  for (const match of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) {
    checkURL(match[1], origin + base + relative(out, file));
  }
}
assert.ok(existsSync(join(out, 'third-party-notices.txt')), 'Missing third-party notices');
console.log(JSON.stringify({ pages: documents.size, localReferences: checked, base, passed: true }));
