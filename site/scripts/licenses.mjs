import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
const notices = ['OSRBOT Link Online Manual - Third-Party Notices',
  'The following packages are used by the website or its build tools.',
  'OSRBOT product text and artwork remain governed by the repository license.',
  'Font licenses are provided separately under brand/fonts/.'];
let count = 0;
for (const path of Object.keys(lock.packages).filter(Boolean).sort()) {
  const dir = join(root, path);
  if (!existsSync(dir)) continue;
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  const files = readdirSync(dir, { withFileTypes: true })
    .filter(file => file.isFile() && /^(licen[cs]e|copying|notice)(?:$|[-_.])/i.test(file.name))
    .map(file => file.name).sort();
  notices.push(`\n${'='.repeat(72)}\n${pkg.name} ${pkg.version}\nLicense: ${pkg.license || 'See text below'}`);
  if (files.length) {
    for (const file of files) notices.push(`\n--- ${file} ---\n${readFileSync(join(dir, file), 'utf8').trim()}`);
  } else {
    let fallback;
    if (pkg.name.startsWith('@algolia/autocomplete-') || pkg.name.startsWith('@docsearch/')) fallback = 'scripts/licenses/algolia-MIT.txt';
    else if (pkg.name.startsWith('@esbuild/')) fallback = 'node_modules/esbuild/LICENSE.md';
    else if (pkg.name.startsWith('@rollup/')) fallback = 'node_modules/rollup/LICENSE.md';
    else if (pkg.name === 'boolbase') fallback = 'scripts/licenses/boolbase-ISC.txt';
    else if (pkg.license === 'CC0-1.0') notices.push('Public domain dedication: https://creativecommons.org/publicdomain/zero/1.0/');
    else assert.fail(`Missing license text: ${pkg.name}`);
    if (fallback) notices.push(readFileSync(join(root, fallback), 'utf8').trim());
  }
  count++;
}
writeFileSync(join(root, 'pages/public/third-party-notices.txt'), notices.join('\n') + '\n');
console.log(`Included license texts for ${count} installed packages.`);
