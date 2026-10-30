import DefaultTheme from 'vitepress/theme-without-fonts';
import Layout from './Layout.vue';
import NetworkDiagram from './NetworkDiagram.vue';
import './style.css';

export default { extends: DefaultTheme, Layout, enhanceApp({ app }) { app.component('NetworkDiagram', NetworkDiagram); } };
