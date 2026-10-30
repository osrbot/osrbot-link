import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const assets = join(root, 'pages/public/manual');
const walk = async dir => {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'previews') continue;
    assert.ok(!entry.isSymbolicLink(), `Unexpected image symlink: ${entry.name}`);
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith('.png')) files.push(path);
  }
  return files.sort();
};

const manifest = {};
// This directory contains only rebuildable derivatives, never approved originals.
await rm(join(assets, 'previews'), { recursive: true, force: true });
for (const path of await walk(assets)) {
  const source = await readFile(path);
  const { width, height } = await sharp(source).metadata();
  assert.ok(width > 0 && height > 0, `Missing image dimensions: ${path}`);
  const name = relative(assets, path).split('\\').join('/');
  const entry = { width, height, bytes: source.length, sha256: createHash('sha256').update(source).digest('hex'), variants: [] };
  // Small diagrams and QR codes stay byte-for-byte unchanged.
  if (source.length > 100_000) {
    const photo = name === 'product-hero-white.png';
    const options = photo ? { quality: 84, effort: 5, smartSubsample: true } : { lossless: true, effort: 5 };
    const digest = createHash('sha256').update(source).update(JSON.stringify({ options, sharp: sharp.versions })).digest('hex').slice(0, 12);
    for (const target of [...new Set([480, 960, 1600].map(size => Math.min(size, width)))]) {
      const src = `/manual/previews/${name.slice(0, -4)}-${digest}-${target}.webp`;
      const output = join(root, 'pages/public', src);
      await mkdir(dirname(output), { recursive: true });
      const info = await sharp(source).resize({ width: target, withoutEnlargement: true }).webp(options).toFile(output);
      assert.equal(info.width, target, `Unexpected preview width: ${src}`);
      entry.variants.push({ src, width: info.width, bytes: (await stat(output)).size });
    }
  }
  manifest['/manual/' + name] = entry;
}
await mkdir(join(root, '.vitepress'), { recursive: true });
await writeFile(join(root, '.vitepress/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${Object.keys(manifest).length} images and ${Object.values(manifest).reduce((total, image) => total + image.variants.length, 0)} responsive previews; originals unchanged.`);
