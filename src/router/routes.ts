import type { RouteRecordRaw } from 'vue-router'

import DashScreen from '@/views/screens/dash/index.vue'
import BusScreen from '@/views/screens/bus/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'big-screen',
    component: DashScreen
  },
  {
    path: '/bus',
    name: 'bus-screen',
    component: BusScreen
  }
]
