import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'src')

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (/\.test\.(tsx|ts)$/.test(name)) out.push(p)
  }

  return out
}

for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8')
  if (!s.includes('render')) continue

  const orig = s

  s = s.replace(/it\((['"])((?:\\.|(?!\1).)*)\1,\s*\(\)\s*=>/g, 'it($1$2$1, async () =>')
  s = s.replace(/it\(`([^`]*)`,\s*\(\)\s*=>/g, 'it(`$1`, async () =>')
  // Word boundary: avoid matching `rerender(` -> `reawait render(`.
  s = s.replace(/(?<!await )\brender\s*\(/g, 'await render(')

  if (s !== orig) fs.writeFileSync(file, s)
}
