import assert from 'node:assert/strict';
import { load } from 'cheerio';

// Match VitePress's sidebar/outline breakpoints and the custom document padding.
const sizes = '(max-width: 700px) calc(100vw - 32px), (max-width: 767px) min(76ch, calc(100vw - 48px)), (max-width: 959px) min(76ch, calc(100vw - 64px)), (max-width: 1279px) min(76ch, calc(100vw - 392px)), (max-width: 1439px) min(76ch, calc(100vw - 648px)), 472px';

export function responsiveFigure(html, manifest, base, firstImage = false) {
  if (!html.includes('<figure')) return html;
  const $ = load(html, {}, false);
  $('figure img').each((_, element) => {
    const image = $(element);
    const src = image.attr('src');
    if (!src?.startsWith('/manual/') || image.attr('data-full-src')) return;
    const entry = manifest[src];
    assert.ok(entry, `Missing image metadata for ${src}; run npm run images`);
    image.attr({ width: String(entry.width), height: String(entry.height), decoding: 'async',
      'data-full-src': base + src.slice(1), 'data-full-width': String(entry.width) });
    if (firstImage || image.attr('loading') === 'eager') image.attr('loading', 'eager');
    else image.attr('loading', 'lazy');
    firstImage = false;
    if (entry.variants.length) {
      const fallback = entry.variants.find(variant => variant.width >= 960) || entry.variants.at(-1);
      image.attr({ src: fallback.src, srcset: entry.variants.map(variant => `${variant.src} ${variant.width}w`).join(', '), sizes });
    }
  });
  return $.html();
}

export function responsiveImages(md, manifest, base) {
  md.core.ruler.push('responsive-manual-images', state => {
    let first = true;
    for (const token of state.tokens) {
      if (token.type !== 'html_block' || !token.content.includes('<figure')) continue;
      token.content = responsiveFigure(token.content, manifest, base, first);
      first = false;
    }
  });
}
