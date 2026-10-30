import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { load } from 'cheerio';
import sharp from 'sharp';
import { responsiveFigure, responsiveImages } from './responsive-images.mjs';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, '.vitepress/image-manifest.json'), 'utf8'));
const src = '/manual/software-overview-guide.png';
const figure = `<figure><img src="${src}" alt="主控端 &amp; software" loading="lazy"><figcaption>Confirmed caption</figcaption></figure>`;
const render = (html = figure, base = '/', first = false) => load(responsiveFigure(html, manifest, base, first), {}, false);

test('responsive previews keep localized text, intrinsic geometry and deferred original', () => {
  const $ = render();
  const image = $('img');
  assert.equal(image.attr('alt'), '主控端 & software');
  assert.equal($('figcaption').text(), 'Confirmed caption');
  assert.equal(image.attr('width'), String(manifest[src].width));
  assert.equal(image.attr('height'), String(manifest[src].height));
  assert.equal(image.attr('loading'), 'lazy');
  assert.equal(image.attr('decoding'), 'async');
  assert.equal(image.attr('data-full-src'), src);
  assert.match(image.attr('src'), /\/previews\/.*-960\.webp$/);
  assert.match(image.attr('srcset'), /480w, .*960w, .*1600w$/);
  assert.ok(image.attr('sizes'));
});

test('original image URLs respect root and GitHub Pages deployments', () => {
  for (const base of ['/', '/osrbot-link/']) {
    assert.equal(render(figure, base)('img').attr('data-full-src'), base + src.slice(1));
  }
});

test('first image is eager; subsequent images are lazy independently per page', () => {
  let process;
  responsiveImages({ core: { ruler: { push: (_, fn) => { process = fn; } } } }, manifest, '/');
  for (let page = 0; page < 2; page++) {
    const state = { tokens: [0, 1].map(() => ({ type: 'html_block', content: figure })) };
    process(state);
    assert.equal(load(state.tokens[0].content)('img').attr('loading'), 'eager');
    assert.equal(load(state.tokens[1].content)('img').attr('loading'), 'lazy');
  }
});

test('QR pixels and Vue diagram components are not transformed', () => {
  const qr = '/manual/purchase-taobao-qr.png';
  const image = render(`<figure><img src="${qr}"></figure>`)('img');
  assert.equal(image.attr('src'), qr);
  assert.equal(image.attr('srcset'), undefined);
  const component = '<NetworkDiagram mode="sharing" lang="zh" />';
  assert.equal(responsiveFigure(component, manifest, '/'), component);
});

test('missing metadata fails the build; processing twice is idempotent', () => {
  assert.throws(() => responsiveFigure('<figure><img src="/manual/missing.png"></figure>', manifest, '/'), /Missing image metadata/);
  const once = responsiveFigure(figure, manifest, '/osrbot-link/');
  assert.equal(responsiveFigure(once, manifest, '/osrbot-link/'), once);
});

test('all generated files exist, originals are unchanged and previews never upscale', async () => {
  for (const [src, entry] of Object.entries(manifest)) {
    const original = readFileSync(resolve(root, 'pages/public', '.' + src));
    assert.equal(createHash('sha256').update(original).digest('hex'), entry.sha256);
    assert.equal(original.length, entry.bytes);
    for (const variant of entry.variants) {
      const file = readFileSync(resolve(root, 'pages/public', '.' + variant.src));
      const meta = await sharp(file).metadata();
      assert.equal(meta.format, 'webp');
      assert.equal(meta.width, variant.width);
      assert.ok(meta.width <= entry.width);
      assert.ok(Math.abs(meta.height - entry.height * meta.width / entry.width) <= 1);
      assert.equal(file.length, variant.bytes);
    }
  }
});

test('annotated screenshot preview encoding is pixel-lossless after resizing', async () => {
  const entry = manifest[src];
  const preview = entry.variants.find(variant => variant.width === 960);
  const expected = await sharp(resolve(root, 'pages/public', '.' + src)).resize({ width: 960 }).ensureAlpha().raw().toBuffer();
  const actual = await sharp(resolve(root, 'pages/public', '.' + preview.src)).ensureAlpha().raw().toBuffer();
  assert.deepEqual(actual, expected);
});
