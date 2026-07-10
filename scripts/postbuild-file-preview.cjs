const fs = require('node:fs')
const path = require('node:path')

const distIndexPath = path.resolve(__dirname, '..', 'dist', 'index.html')

if (!fs.existsSync(distIndexPath)) {
  process.exit(0)
}

const html = fs.readFileSync(distIndexPath, 'utf-8')

const nextHtml = html
  .replace(/\s+crossorigin(?=\s|>)/g, '')
  .replace(/<script\s+type="module"([^>]*)><\/script>/g, '<script defer$1></script>')
  .replace(/<script(?![^>]*\bdefer\b)([^>]*\ssrc="[^"]+"[^>]*)><\/script>/gi, '<script defer$1></script>')

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
  process.exit(0)
}

const js = fs.readFileSync(scriptPath, 'utf-8')
const nextJs = js.replace(/new URL\("([^"]+)",import\.meta\.url\)\.href/g, '"./assets/$1"')

if (nextJs !== js) {
  fs.writeFileSync(scriptPath, nextJs, 'utf-8')
}
