import { defineConfig } from 'vitepress';

const release = 'https://github.com/osrbot/osrbot-link/releases';
const base = process.env.OSRBOT_SITE_BASE || '/';
const chapters = [
  ['', '产品概览', 'Product overview'],
  ['connections', '接口与连接', 'Interfaces and connections'],
  ['getting-started', '下载与开始', 'Download and first use'],
  ['software', '软件功能与操作', 'Software features'],
  ['network-sharing', '网络共享', 'Network sharing'],
  ['lan-control', '局域网浏览器控制', 'LAN browser control'],
  ['specifications', '规格与选购', 'Specifications and purchasing'],
  ['troubleshooting', '常见问题与支持', 'Troubleshooting and support'],
];
const locale = (en) => ({
  label: en ? 'English' : '简体中文',
  lang: en ? 'en' : 'zh-CN',
  title: 'OSRBOT Link',
  description: en ? 'OSRBOT Link product manual: connections, software and troubleshooting.' : 'OSRBOT Link 产品手册：连接、软件使用与问题排查。',
  themeConfig: {
    nav: [
      { text: en ? 'Product manual' : '产品手册', link: en ? '/' : '/zh/' },
      { text: en ? 'Download' : '软件下载', link: release },
    ],
    sidebar: [{ text: 'OSRBOT Link', items: chapters.map(([path, cn, english]) => ({ text: en ? english : cn, link: (en ? '/' : '/zh/') + path })) }],
    outline: { label: en ? 'On this page' : '本页内容', level: [2, 3] },
    docFooter: { prev: en ? 'Previous' : '上一节', next: en ? 'Next' : '下一节' },
    returnToTopLabel: en ? 'Back to top' : '返回顶部',
    sidebarMenuLabel: en ? 'Contents' : '手册目录',
    darkModeSwitchLabel: en ? 'Appearance' : '外观',
    langMenuLabel: en ? 'Language' : '语言',
  },
});

export default defineConfig({
  base,
  srcDir: 'pages',
  srcExclude: ['public/**'],
  outDir: process.env.OSRBOT_SITE_OUT || '.vitepress/dist',
  cleanUrls: false,
  appearance: false,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', href: base + 'brand/OSRBOT_Favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: base + 'brand/OSRBOT_Favicon.ico' }],
    ['link', { rel: 'stylesheet', href: base + 'brand/Web_Tokens.css' }],
  ],
  locales: { root: locale(true), zh: locale(false) },
  themeConfig: {
    logo: { src: '/brand/OSRBOT_Primary_Color.svg', alt: 'OSRBOT' },
    siteTitle: false,
    socialLinks: [{ icon: 'github', link: 'https://github.com/osrbot/osrbot-link' }],
    externalLinkIcon: true,
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize(text) {
              return [...new Intl.Segmenter('zh', { granularity: 'word' }).segment(text)]
                .filter(part => part.isWordLike).map(part => part.segment.toLocaleLowerCase());
            },
          },
        },
        locales: {
          zh: { translations: {
            button: { buttonText: '搜索手册', buttonAriaLabel: '搜索手册' },
            modal: { displayDetails: '显示摘要', resetButtonTitle: '清空搜索', backButtonTitle: '关闭搜索', noResultsText: '未找到相关内容', footer: { selectText: '打开', selectKeyAriaLabel: '回车', navigateText: '切换', navigateUpKeyAriaLabel: '上方向键', navigateDownKeyAriaLabel: '下方向键', closeText: '关闭', closeKeyAriaLabel: 'Esc' } },
          } },
        },
      },
    },
  },
  markdown: { image: { lazyLoading: true } },
});
