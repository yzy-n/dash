import { createApp } from 'vue'

import App from './App.vue'
import createAppRouter from './router'
import './style.css'

const router = createAppRouter()

createApp(App).use(router).mount('#app')
