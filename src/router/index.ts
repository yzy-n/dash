import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { routes } from './routes'

export default function createAppRouter() {
  const viteBase = import.meta.env.BASE_URL
  const base = viteBase.startsWith('.') ? '/' : viteBase
  const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:'
  const history = isFile ? createWebHashHistory() : createWebHistory(base)

  return createRouter({
    history,
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
  })
}
