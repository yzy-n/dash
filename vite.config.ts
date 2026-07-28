import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL

  return {
    base: './',
    plugins: [vue()],
    server: proxyTarget
      ? {
          proxy: {
            '/citymanage': {
              target: proxyTarget,
              changeOrigin: true,
              timeout: 5000,
              proxyTimeout: 5000
            }
          }
        }
      : undefined,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true
        }
      }
    }
  }
})
