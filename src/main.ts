import { createApp } from 'vue'
import App from './App.vue'
import createAppRouter from './router'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 1. 先创建app实例，拿到app对象
const app = createApp(App)

// 2. 再use插件（顺序在这里！）
app.use(ElementPlus)
const router = createAppRouter()
app.use(router)

// 3. 最后挂载
app.mount('#app')
