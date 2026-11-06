const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

// 用法：node scripts/postbuild-file-preview.cjs [distDir]
// 只用于「本地双击打开」的 IIFE 产物（npm run build:file），nginx 产物不需要也不应该经过这里。
const distDir = process.argv[2] || 'dist'
const distIndexPath = path.resolve(__dirname, '..', distDir, 'index.html')

if (!fs.existsSync(distIndexPath)) {
  console.error(`[postbuild] 找不到 ${distIndexPath}`)
  process.exit(1)
}

const html = fs.readFileSync(distIndexPath, 'utf-8')

const nextHtml = html
  .replace(/\s+crossorigin(?=\s|>)/g, '')
  .replace(/<script\s+type="module"([^>]*)><\/script>/g, '<script defer$1></script>')
  .replace(
    /<script(?![^>]*\bdefer\b)([^>]*\ssrc="[^"]+"[^>]*)><\/script>/gi,
    '<script defer$1></script>'
  )

if (nextHtml !== html) {
  fs.writeFileSync(distIndexPath, nextHtml, 'utf-8')
}

const scriptSrcMatch = nextHtml.match(/<script[^>]*\ssrc="([^"]+)"[^>]*><\/script>/i)
const scriptSrc = scriptSrcMatch ? scriptSrcMatch[1] : null

if (!scriptSrc) {
  process.exit(0)
}

const scriptPath = path.resolve(path.dirname(distIndexPath), scriptSrc)

if (!fs.existsSync(scriptPath)) {
  console.error(`[postbuild] 找不到入口脚本 ${scriptPath}`)
  process.exit(1)
}

const js = fs.readFileSync(scriptPath, 'utf-8')
const nextJs = js.replace(/new URL\("([^"]+)",import\.meta\.url\)\.href/g, '"./assets/$1"')

if (nextJs !== js) {
  fs.writeFileSync(scriptPath, nextJs, 'utf-8')
}

// 守卫：本地双击时产物必须能按「普通脚本」解析。
// 否则浏览器会白屏并报 "export declarations may only appear at top level of a module"。
try {
  new vm.Script(nextJs, { filename: scriptPath })
} catch (error) {
  console.error(`[postbuild] ${path.basename(scriptPath)} 不能按普通脚本解析：${error.message}`)
  console.error('[postbuild] 本地双击版本请用 `npm run build:file`（IIFE 输出）构建。')
  process.exit(1)
}
