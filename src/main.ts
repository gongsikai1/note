import './assets/main.css'

import { createApp } from 'vue'

// import VueMarkdown from 'vue-markdown';
// import MarkdownIt from 'markdown-it'
import VueMarkdownIt  from 'vue3-markdown-it'
import 'highlight.js/styles/monokai.css'; // 引入代码高亮主题

// console.log('VueMarkdownIt', VueMarkdownIt)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
// import store from './store/index.ts'
import store from './store'

// 创建 markdown-it 实例（可自定义配置）
// const md = MarkdownIt({
//   // 配置项示例：
//   html: true,         // 允许 HTML 标签
//   linkify: true,      // 自动转换链接
//   typographer: true,  // 转换特殊字符（如引号、破折号）
//   // 可添加自定义插件
//   // plugins: [require('markdown-it-plugin')]
// })


const app = createApp(App)

app.component('my-markdown', VueMarkdownIt)

app.use(VueMarkdownIt)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')