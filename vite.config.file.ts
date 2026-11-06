import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 「本地双击打开」专用构建配置（npm run build:file）。
 *
 * file:// 协议下浏览器不允许加载 <script type="module">，所以这里输出单文件 IIFE，
 * 再由 scripts/postbuild-file-preview.cjs 把 html 改成普通 <script defer>。
 *
 * nginx / http 部署请用默认配置（npm run build），那条链路必须保留 type="module"。
 */
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  build: {
    outDir: 'dist-file',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true
      }
    }
  }
})
