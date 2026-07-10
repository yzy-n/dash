import type { RouteRecordRaw } from 'vue-router'

import DashScreen from '@/views/screens/dash/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'big-screen',
    component: DashScreen
  }
]
