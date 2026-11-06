import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 部署基路径由 VITE_BASE_PATH 控制（nginx 访问前缀，默认 /bigscreen/）
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL
  const basePath = env.VITE_BASE_PATH || '/bigscreen/'

  const apiPrefixes = [
    '/citymanage',
    '/citytraffic',
    '/partybuilding',
    '/appeal',
    '/population',
    '/publicservice',
    '/economicoperation',
    '/businessenvironment',
    '/weatherenvironment',
    '/disaster/bigscreen'
  ]

  return {
    base: basePath,
    plugins: [vue()],
    server: proxyTarget
      ? {
          proxy: Object.fromEntries(
            apiPrefixes.map((prefix) => [
              prefix,
              { target: proxyTarget, changeOrigin: true, timeout: 5000, proxyTimeout: 5000 }
            ])
          )
        }
      : undefined,
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
    // 不要改 build.rollupOptions.output.format / 不要去掉 index.html 里的 type="module"：
    // 产物末尾会出现顶层 `export default ...`（esbuild 对含 CJS 标记的 chunk 做的 CJS→ESM 互操作），
    // 一旦按普通 <script> 加载就会报 "export declarations may only appear at top level of a module"。
  }
})
