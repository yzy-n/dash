import { createApp } from 'vue'

import App from './App.vue'
import DashScreen from '@/views/screens/dash/index.vue'
import createAppRouter from './router'
import './style.css'

const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'

if (isFile) {
  createApp(DashScreen).mount('#app')
} else {
  const router = createAppRouter()
  createApp(App).use(router).mount('#app')
}
