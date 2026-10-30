<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts';
import { useData, useRoute } from 'vitepress';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { X, ZoomIn, Minimize2 } from '@lucide/vue';

const { lang } = useData();
const route = useRoute();
const chinese = computed(() => lang.value.startsWith('zh'));
const viewer = ref(null);
const current = ref({ src: '', alt: '' });
const zoomed = ref(false);
let origin = null;

function openImage(event) {
  const button = event.target.closest?.('.manual-image');
  if (!button) return;
  const image = button.querySelector('img');
  if (!image) return;
  origin = button;
  current.value = { src: image.currentSrc || image.src, alt: image.alt, width: image.naturalWidth };
  zoomed.value = false;
  viewer.value.showModal();
}
function closeImage() { viewer.value?.close(); }
function restoreFocus() { origin?.focus({ preventScroll: true }); }
async function preparePage() {
  await nextTick();
  const main = document.querySelector('#VPContent');
  main?.setAttribute('tabindex', '-1');
  const skip = document.querySelector('.VPSkipLink');
  skip?.setAttribute('href', '#VPContent');
  if (skip) skip.textContent = chinese.value ? '跳至正文' : 'Skip to content';
  document.querySelectorAll('.vp-doc figure img').forEach(image => {
    if (image.closest('button, a')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'manual-image';
    button.setAttribute('aria-label', (chinese.value ? '放大图片：' : 'Enlarge image: ') + image.alt);
    image.replaceWith(button);
    button.append(image);
  });
  document.querySelectorAll('.vp-doc table').forEach(table => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const scroll = document.createElement('div');
    scroll.className = 'table-scroll';
    scroll.tabIndex = 0;
    scroll.setAttribute('role', 'region');
    scroll.setAttribute('aria-label', table.caption?.textContent || (chinese.value ? '参数与操作表格' : 'Specifications and instructions'));
    table.replaceWith(scroll);
    scroll.append(table);
  });
}
watch(() => route.path, () => { closeImage(); preparePage(); });
onMounted(() => { preparePage(); document.addEventListener('click', openImage); });
onUnmounted(() => document.removeEventListener('click', openImage));
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before><p class="manual-eyebrow">{{ chinese ? '产品手册' : 'Product manual' }}</p></template>
    <template #doc-after>
      <div class="manual-support"><span>OSRBOT Link</span><a href="mailto:winter@osrbot.com">winter@osrbot.com</a></div>
    </template>
  </DefaultTheme.Layout>
  <dialog ref="viewer" class="image-viewer" :aria-label="chinese ? '图片预览' : 'Image preview'" @click="event => { if (event.target === viewer) closeImage(); }" @close="restoreFocus">
    <div class="image-viewer-header">
      <span>{{ current.alt }}</span>
      <button type="button" :aria-label="zoomed ? (chinese ? '适应窗口' : 'Fit image') : (chinese ? '原始尺寸' : 'Actual size')" :title="zoomed ? (chinese ? '适应窗口' : 'Fit image') : (chinese ? '原始尺寸' : 'Actual size')" @click="zoomed = !zoomed"><Minimize2 v-if="zoomed" :size="24" aria-hidden="true" /><ZoomIn v-else :size="24" aria-hidden="true" /></button>
      <button type="button" :aria-label="chinese ? '关闭图片' : 'Close image'" :title="chinese ? '关闭图片' : 'Close image'" @click="closeImage"><X :size="24" aria-hidden="true" /></button>
    </div>
    <div class="image-viewer-body" tabindex="0" :aria-label="current.alt">
      <img v-if="current.src" :src="current.src" :alt="current.alt" :class="{ 'actual-size': zoomed }" :style="zoomed ? { width: current.width + 'px' } : {}">
    </div>
  </dialog>
</template>
