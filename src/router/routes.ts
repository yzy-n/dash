import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'big-screen',
    component: () => import('@/views/screens/dash/index.vue')
  }
]
