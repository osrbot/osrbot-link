<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { ArrowLeftRight, ArrowRight, Laptop, Monitor, Network, PanelTop } from '@lucide/vue';

const props = defineProps({ kind: { type: String, required: true } });
const { lang } = useData();
const text = computed(() => {
  const en = !lang.value.startsWith('zh');
  return props.kind === 'sharing' ? {
    nodes: [
      { icon: Laptop, title: en ? 'Control computer' : '主控端', detail: 'OSRBOT Link' },
      { icon: Monitor, title: en ? 'Controlled device' : '被控端', detail: en ? 'Ethernet port' : '通过网口连接' },
    ],
    links: [en ? 'Ethernet cable' : '以太网线'],
    upstream: {
      title: en ? 'Upstream network (optional)' : '上游网络（可选）',
      detail: en ? 'Internal network / internet' : '内网 / 互联网',
      link: en ? 'Wi-Fi / Ethernet' : 'Wi-Fi / 有线网卡',
    },
    caption: en ? 'Direct Ethernet communication does not require internet access. The USB keyboard/mouse connection does not carry network traffic.' : '以太网直连通信不依赖互联网；USB 键鼠连接不承担网络传输。',
  } : {
    nodes: [
      { icon: PanelTop, title: en ? 'Another computer' : '其他电脑', detail: en ? 'Web browser' : '打开浏览器' },
      { icon: Laptop, title: en ? 'Control computer' : '主控端', detail: 'OSRBOT Link' },
      { icon: Monitor, title: en ? 'Controlled device' : '被控端', detail: en ? 'USB keyboard / mouse' : 'USB 键鼠输入' },
    ],
    links: [en ? 'Trusted LAN' : '可信局域网', en ? 'USB sharing device' : 'USB 共享器'],
    caption: en ? 'Keyboard and mouse control path. Video viewing additionally requires a capture card on the control computer.' : '局域网键鼠控制路径；查看画面还需主控端接入采集卡并开启视频。',
  };
});
</script>

<template>
  <figure class="network-diagram">
    <div class="network-path" :class="{ 'sharing-direct': kind === 'sharing' }">
      <template v-if="text.upstream">
        <div class="network-path-node network-upstream"><Network :size="40" :stroke-width="1.5" aria-hidden="true" /><strong>{{ text.upstream.title }}</strong><span>{{ text.upstream.detail }}</span></div>
        <div class="network-path-link"><span>{{ text.upstream.link }}</span><ArrowRight :size="24" aria-hidden="true" /></div>
      </template>
      <template v-for="(node, index) in text.nodes" :key="index">
        <div v-if="index" class="network-path-link"><span>{{ text.links[index - 1] }}</span><component :is="kind === 'sharing' ? ArrowLeftRight : ArrowRight" :size="24" aria-hidden="true" /></div>
        <div class="network-path-node"><component :is="node.icon" :size="40" :stroke-width="1.5" aria-hidden="true" /><strong>{{ node.title }}</strong><span>{{ node.detail }}</span></div>
      </template>
    </div>
    <figcaption>{{ text.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.network-diagram { container-type: inline-size; padding: 24px 0; border-top: 1px solid #dbe1e5; border-bottom: 1px solid #dbe1e5; }
.network-path { display: grid; grid-template-columns: minmax(0,1fr) max-content minmax(0,1fr) max-content minmax(0,1fr); gap: 16px; align-items: start; }
.network-path-node { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; min-width: 0; }
.network-path-node svg { color: #354551; flex-shrink: 0; }
.network-path-node strong { font-size: .875rem; line-height: 1.5; }
.network-path-node span, .network-path-link span { color: #354551; font-size: .875rem; line-height: 1.5; }
.network-path-link { display: flex; flex-direction: column; align-items: center; gap: 8px; padding-top: 12px; text-align: center; color: #0076df; }
.network-path-link span { white-space: nowrap; }
@container (max-width: 36rem) {
  .network-path { grid-template-columns: 1fr; gap: 16px; }
  .network-path-node { display: grid; grid-template-columns: 40px minmax(0,1fr); text-align: left; column-gap: 16px; row-gap: 4px; }
  .network-path-node svg { grid-row: span 2; }
  .network-path-link { flex-direction: row; padding: 0 0 0 8px; gap: 16px; text-align: left; }
  .network-path-link span { white-space: normal; }
  .network-path-link svg { transform: rotate(90deg); order: -1; }
}
</style>
