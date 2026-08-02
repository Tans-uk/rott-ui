# Phase 1 — Documentation Correctness Net Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every TypeScript code block in the documentation compile and — where meaningful — render, enforced as a required CI gate, so that an AI agent copying a documented example gets working code.

**Architecture:** A new harness at `scripts/docs-verify/` extracts every `tsx` fenced block from the docs into generated `.tsx` files under `.docs-verify/`, typechecks them with the real TypeScript compiler, then renders the eligible subset in Jest. Blocks that lack imports get them generated; blocks referencing identifiers they never declare get `declare` stubs and are excluded from rendering. Failures are mapped back to `file.md:line`.

**Tech Stack:** TypeScript 5.9, ts-jest, Jest 29, `@testing-library/react-native` 13, the TypeScript compiler API (`typescript` package, already a devDependency), GitHub Actions.

## Global Constraints

- Target release: **0.9.0**. This plan does not bump the version; Phase 2 does.
- Spec of record: `docs/superpowers/specs/2026-08-02-verifiable-theme-contract-design.md`.
- Commit messages MUST be in English and follow Conventional Commits (`.cursor/rules/global-project-rules.mdc`). `commitlint` runs on `commit-msg` via lefthook.
- Node version comes from `.nvmrc`. Package manager is **yarn 3.6.1** — use `yarn`, never `npm`, in this repo.
- Real icon keys are **kebab-case** (`burgermenu`, `arrow-right`). SCREAMING_SNAKE keys do not exist anywhere and must never be introduced.
- Do not modify any file under `src/` in this plan. Phase 1 touches only `scripts/`, `docs/`, config files, and CI. If a documentation example cannot be made to compile without a library change, record it and move on — it becomes Phase 2 input.
- The harness must never make a check that cannot fail. Every verification step in this plan has a matching negative test.

---

## Background for the implementer

Rott UI is a React Native component library. Its documentation lives in
`docs/docs/**/*.md` (English) and `docs/i18n/tr/**/*.md` (Turkish), rendered by
Docusaurus. Examples are written as fenced code blocks tagged `tsx`.

Today those examples are not verified by anything. The measured state, confirmed
on 2026-08-02:

- 330 `tsx` blocks in `docs/docs/**`
- 88 of them contain an `import` line
- 72 of them reference identifiers they never declare (`date`, `setDate`, `handleSubmit`)
- 58 references across 15 files use icon or image keys that do not exist

The official Quick Start example does not compile. That is the failure this plan
removes.

Two vocabulary notes used throughout:

- **Complete block** — contains `import … from '@tansuk/rott-ui'`.
- **Fragment** — does not. Example: a bare `<Label text="Hello" />`.

These are orthogonal to whether a block references undeclared identifiers.

---

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `scripts/docs-verify/types.ts` | Shared types: `Block`, `GeneratedFile`, `VerifyResult` |
| `scripts/docs-verify/extract.ts` | Markdown → `Block[]`. Pure. |
| `scripts/docs-verify/generate.ts` | `Block` → generated `.tsx` source text. Pure. |
| `scripts/docs-verify/typecheck.ts` | Runs the TS compiler over `.docs-verify/`, returns diagnostics |
| `scripts/docs-verify/stubs.ts` | Diagnostics → `declare const` stub lines. Pure. |
| `scripts/docs-verify/canonical.ts` | Enforces the first-block rule. Pure. |
| `scripts/docs-verify/report.ts` | Diagnostics → human output mapped to `file.md:line`. Pure. |
| `scripts/docs-verify/index.ts` | CLI entry that wires the pipeline together |
| `scripts/docs-verify/fixtures/rott.config.ts` | Fixture config so the `rott.config` alias resolves |
| `scripts/docs-verify/__tests__/*.test.ts` | Unit tests for the pure modules |
| `scripts/docs-verify/__tests__/fixtures/broken.md` | Deliberately broken markdown; proves the harness can fail |
| `tsconfig.docs-verify.json` | tsconfig used only for generated snippets |
| `jest.docs-render.config.ts` | Jest config used only for the render pass |
| `.docs-verify/` | Generated output. Gitignored. |

**Modified:**

| Path | Change |
|---|---|
| `.gitignore` | Add `.docs-verify/` |
| `tsconfig.json` | Add `.docs-verify` to `exclude` |
| `jest.config.ts` | Add `.docs-verify/` to `testPathIgnorePatterns` |
| `package.json` | Add `docs:verify` script |
| `.github/workflows/ci.yml` | Add `development` to triggers; add `docs-verify` job |
| 15 documentation files | Replace 58 invalid icon/image keys |

**Why the pure modules are split this way:** `extract`, `generate`, `stubs`,
`canonical` and `report` are all pure functions of their input. Splitting them
means each gets a real unit test without touching the filesystem or the
compiler. Only `typecheck.ts` and `index.ts` do I/O, and they stay thin.

---

## Task 1: Block extractor

**Files:**
- Create: `scripts/docs-verify/types.ts`
- Create: `scripts/docs-verify/extract.ts`
- Test: `scripts/docs-verify/__tests__/extract.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `extractBlocks(markdown: string, sourcePath: string): Block[]`, and the `Block` type:
  ```ts
  export interface Block {
    sourcePath: string   // e.g. 'docs/docs/components/button.md'
    startLine: number    // 1-based line of the ``` fence opening
    code: string         // block body, no fences
    index: number        // 0-based position of this block within its file
  }
  ```

- [ ] **Step 1: Write the failing test**

Create `scripts/docs-verify/__tests__/extract.test.ts`:

```ts
import {extractBlocks} from '../extract'

describe('extractBlocks', () => {
  it('returns one block with its body, 1-based fence line, and index', () => {
    const md = ['# Title', '', '```tsx', '<Label text="Hi" />', '```', ''].join('\n')

    const blocks = extractBlocks(md, 'docs/docs/components/label.md')

    expect(blocks).toEqual([
      {
        sourcePath: 'docs/docs/components/label.md',
        startLine: 3,
        code: '<Label text="Hi" />\n',
        index: 0,
      },
    ])
  })

  it('numbers multiple blocks in document order', () => {
    const md = ['```tsx', 'a', '```', '', '```tsx', 'b', '```'].join('\n')

    const blocks = extractBlocks(md, 'x.md')

    expect(blocks.map((b) => b.index)).toEqual([0, 1])
    expect(blocks.map((b) => b.startLine)).toEqual([1, 5])
  })

  it('ignores fences that are not tsx', () => {
    const md = ['```bash', 'yarn install', '```', '```ts', 'const a = 1', '```'].join('\n')

    expect(extractBlocks(md, 'x.md')).toEqual([])
  })

  it('accepts an info string after the language tag', () => {
    const md = ['```tsx title="App.tsx"', '<Label />', '```'].join('\n')

    expect(extractBlocks(md, 'x.md')).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `yarn test scripts/docs-verify/__tests__/extract.test.ts`
Expected: FAIL — `Cannot find module '../extract'`.

- [ ] **Step 3: Write the types**

Create `scripts/docs-verify/types.ts`:

```ts
export interface Block {
  sourcePath: string
  startLine: number
  code: string
  index: number
}
```

- [ ] **Step 4: Write the extractor**

Create `scripts/docs-verify/extract.ts`:

```ts
import type {Block} from './types'

const FENCE_OPEN = /^```tsx(\s.*)?$/
const FENCE_CLOSE = /^```\s*$/

/**
 * Pulls every ```tsx fenced block out of a markdown document.
 *
 * startLine is the 1-based line number of the opening fence, which is what the
 * report maps compiler errors back to.
 */
export function extractBlocks(markdown: string, sourcePath: string): Block[] {
  const lines = markdown.split('\n')
  const blocks: Block[] = []
  let index = 0
  let cursor = 0

  while (cursor < lines.length) {
    const line = lines[cursor]

    if (line !== undefined && FENCE_OPEN.test(line)) {
      const startLine = cursor + 1
      const body: string[] = []
      cursor += 1

      while (cursor < lines.length) {
        const inner = lines[cursor]
        if (inner === undefined || FENCE_CLOSE.test(inner)) break
        body.push(inner)
        cursor += 1
      }

      blocks.push({
        sourcePath,
        startLine,
        code: body.length > 0 ? `${body.join('\n')}\n` : '',
        index,
      })
      index += 1
    }

    cursor += 1
  }

  return blocks
}
```

Note: `noUncheckedIndexedAccess` is on in this repo, which is why every indexed
read is guarded with an `undefined` check.

- [ ] **Step 5: Run the test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/extract.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 6: Typecheck**

Run: `yarn typecheck`
Expected: no output (success).

- [ ] **Step 7: Commit**

```bash
git add scripts/docs-verify/types.ts scripts/docs-verify/extract.ts scripts/docs-verify/__tests__/extract.test.ts
git commit -m "feat(docs-verify): add tsx block extractor"
```

---

## Task 2: Snippet generator

**Files:**
- Create: `scripts/docs-verify/generate.ts`
- Test: `scripts/docs-verify/__tests__/generate.test.ts`

**Interfaces:**
- Consumes: `Block` from Task 1.
- Produces: `generateSnippet(block: Block, stubs?: string[]): string`.

**Design note — why we do not build an export map.** An earlier idea was to
match JSX component names against a list of Rott UI exports. That is
unnecessary: if we emit `import {Foo} from '@tansuk/rott-ui'` and `Foo` does not
exist, the TypeScript compiler reports `TS2305: Module '"@tansuk/rott-ui"' has
no exported member 'Foo'`. The compiler is the export map. This keeps the
generator pure and free of any build step.

**What the generator emits:**

- For a **complete** block (already has `import … from '@tansuk/rott-ui'`): the
  code verbatim, plus a header comment.
- For a **fragment**: a header comment, `import React from 'react'`, an
  `import { … } from '@tansuk/rott-ui'` naming every capitalized JSX element in
  the block, then the code wrapped in a component so that bare JSX is valid at
  module scope.
- Stub lines, when provided, are inserted after the imports.

- [ ] **Step 1: Write the failing test**

Create `scripts/docs-verify/__tests__/generate.test.ts`:

```ts
import {generateSnippet} from '../generate'
import type {Block} from '../types'

const block = (code: string): Block => ({
  sourcePath: 'docs/docs/components/label.md',
  startLine: 12,
  code,
  index: 0,
})

describe('generateSnippet', () => {
  it('prefixes a source header so errors can be mapped back', () => {
    const out = generateSnippet(block('<Label text="Hi" />\n'))

    expect(out.split('\n')[0]).toBe('// @source docs/docs/components/label.md:12')
  })

  it('imports every capitalized JSX element for a fragment', () => {
    const out = generateSnippet(block('<Item>\n  <Label text="Hi" />\n</Item>\n'))

    expect(out).toContain("import {Item, Label} from '@tansuk/rott-ui'")
  })

  it('wraps a fragment so bare JSX is valid at module scope', () => {
    const out = generateSnippet(block('<Label text="Hi" />\n'))

    expect(out).toContain('export default function Snippet()')
    expect(out).toContain('<Label text="Hi" />')
  })

  it('leaves a complete block untouched below the header', () => {
    const code = "import {Label} from '@tansuk/rott-ui'\n\nexport const A = () => <Label />\n"

    const out = generateSnippet(block(code))

    expect(out).toBe(`// @source docs/docs/components/label.md:12\n${code}`)
  })

  it('does not import lowercase JSX elements', () => {
    const out = generateSnippet(block('<view><Label /></view>\n'))

    expect(out).toContain("import {Label} from '@tansuk/rott-ui'")
    expect(out).not.toContain('view,')
  })

  it('inserts stub declarations after the imports', () => {
    const out = generateSnippet(block('<Label text={greeting} />\n'), [
      'declare const greeting: any',
    ])

    const importLine = out.indexOf("from '@tansuk/rott-ui'")
    const stubLine = out.indexOf('declare const greeting: any')
    const usageLine = out.indexOf('<Label text={greeting} />')

    expect(importLine).toBeLessThan(stubLine)
    expect(stubLine).toBeLessThan(usageLine)
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `yarn test scripts/docs-verify/__tests__/generate.test.ts`
Expected: FAIL — `Cannot find module '../generate'`.

- [ ] **Step 3: Write the generator**

Create `scripts/docs-verify/generate.ts`:

```ts
import type {Block} from './types'

const ROTT_IMPORT = /import\s[\s\S]*?from\s+'@tansuk\/rott-ui'/
const JSX_ELEMENT = /<([A-Z][A-Za-z0-9_]*)/g

export function isComplete(block: Block): boolean {
  return ROTT_IMPORT.test(block.code)
}

function usedComponents(code: string): string[] {
  const names = new Set<string>()
  for (const match of code.matchAll(JSX_ELEMENT)) {
    const name = match[1]
    if (name !== undefined) names.add(name)
  }
  return [...names].sort()
}

/**
 * Turns a documentation block into a standalone .tsx module.
 *
 * Complete blocks pass through with only a source header added. Fragments get
 * generated imports and a component wrapper, because bare JSX is not valid at
 * module scope.
 */
export function generateSnippet(block: Block, stubs: string[] = []): string {
  const header = `// @source ${block.sourcePath}:${block.startLine}`

  if (isComplete(block)) {
    return `${header}\n${block.code}`
  }

  const components = usedComponents(block.code)
  const lines = [header, "import React from 'react'"]

  if (components.length > 0) {
    lines.push(`import {${components.join(', ')}} from '@tansuk/rott-ui'`)
  }

  if (stubs.length > 0) {
    lines.push('', ...stubs)
  }

  const indented = block.code
    .trimEnd()
    .split('\n')
    .map((line) => (line.length > 0 ? `      ${line}` : line))
    .join('\n')

  lines.push(
    '',
    'export default function Snippet() {',
    '  return (',
    '    <>',
    indented,
    '    </>',
    '  )',
    '}',
    ''
  )

  return lines.join('\n')
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/generate.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add scripts/docs-verify/generate.ts scripts/docs-verify/__tests__/generate.test.ts
git commit -m "feat(docs-verify): add snippet generator with import synthesis"
```

---

## Task 3: Stub derivation from compiler diagnostics

**Files:**
- Create: `scripts/docs-verify/stubs.ts`
- Test: `scripts/docs-verify/__tests__/stubs.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `stubsForFile(diagnostics: SimpleDiagnostic[]): string[]` and the
  `SimpleDiagnostic` type:
  ```ts
  export interface SimpleDiagnostic {
    file: string     // absolute path of the generated .tsx
    code: number     // TypeScript error code, e.g. 2304
    message: string  // flattened message text
    line: number     // 1-based line within the generated file
  }
  ```

**Why this exists.** 72 documentation blocks reference identifiers they never
declare — `value={email}`, `onChangeText={setDate}`. Rather than reimplementing
scope analysis with regular expressions, the harness compiles once, reads the
compiler's own `TS2304: Cannot find name 'x'` diagnostics, and regenerates those
files with `declare const x: any`. The compiler does the analysis.

**Critical distinction:** `TS2304` (cannot find name) is stubbable — it is the
document author's local variable. `TS2305` (module has no exported member) is
**not** stubbable — it means the example uses a component Rott UI does not
export, which is exactly the kind of error we want to surface.

- [ ] **Step 1: Write the failing test**

Create `scripts/docs-verify/__tests__/stubs.test.ts`:

```ts
import {stubsForFile} from '../stubs'
import type {SimpleDiagnostic} from '../stubs'

const diag = (code: number, message: string): SimpleDiagnostic => ({
  file: '/tmp/.docs-verify/label-0.tsx',
  code,
  message,
  line: 4,
})

describe('stubsForFile', () => {
  it('emits a stub for each TS2304 cannot-find-name diagnostic', () => {
    const out = stubsForFile([diag(2304, "Cannot find name 'email'.")])

    expect(out).toEqual(['declare const email: any'])
  })

  it('deduplicates repeated names', () => {
    const out = stubsForFile([
      diag(2304, "Cannot find name 'email'."),
      diag(2304, "Cannot find name 'email'."),
    ])

    expect(out).toEqual(['declare const email: any'])
  })

  it('sorts names so output is deterministic', () => {
    const out = stubsForFile([
      diag(2304, "Cannot find name 'zeta'."),
      diag(2304, "Cannot find name 'alpha'."),
    ])

    expect(out).toEqual(['declare const alpha: any', 'declare const zeta: any'])
  })

  it('never stubs a missing export (TS2305)', () => {
    const out = stubsForFile([
      diag(2305, `Module '"@tansuk/rott-ui"' has no exported member 'Widget'.`),
    ])

    expect(out).toEqual([])
  })

  it('never stubs a type error (TS2322)', () => {
    const out = stubsForFile([
      diag(2322, `Type '"MENU"' is not assignable to type 'IconKeys'.`),
    ])

    expect(out).toEqual([])
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `yarn test scripts/docs-verify/__tests__/stubs.test.ts`
Expected: FAIL — `Cannot find module '../stubs'`.

- [ ] **Step 3: Write the stub deriver**

Create `scripts/docs-verify/stubs.ts`:

```ts
export interface SimpleDiagnostic {
  file: string
  code: number
  message: string
  line: number
}

const CANNOT_FIND_NAME = 2304
const NAME_IN_MESSAGE = /Cannot find name '([^']+)'/

/**
 * Derives `declare const` stubs from a file's diagnostics.
 *
 * Only TS2304 is stubbed. TS2305 (no exported member) and every type error are
 * left alone on purpose — those are the failures the harness exists to report.
 */
export function stubsForFile(diagnostics: SimpleDiagnostic[]): string[] {
  const names = new Set<string>()

  for (const diagnostic of diagnostics) {
    if (diagnostic.code !== CANNOT_FIND_NAME) continue
    const match = NAME_IN_MESSAGE.exec(diagnostic.message)
    const name = match?.[1]
    if (name !== undefined) names.add(name)
  }

  return [...names].sort().map((name) => `declare const ${name}: any`)
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/stubs.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add scripts/docs-verify/stubs.ts scripts/docs-verify/__tests__/stubs.test.ts
git commit -m "feat(docs-verify): derive declaration stubs from TS2304 diagnostics"
```

---

## Task 4: Typechecker, reporter, and the `docs:verify` CLI

**Files:**
- Create: `scripts/docs-verify/typecheck.ts`
- Create: `scripts/docs-verify/report.ts`
- Create: `scripts/docs-verify/index.ts`
- Create: `scripts/docs-verify/fixtures/rott.config.ts`
- Create: `tsconfig.docs-verify.json`
- Test: `scripts/docs-verify/__tests__/report.test.ts`
- Modify: `.gitignore`
- Modify: `tsconfig.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: `extractBlocks` (Task 1), `generateSnippet` (Task 2), `stubsForFile` and `SimpleDiagnostic` (Task 3).
- Produces:
  - `typecheckDir(dir: string, tsconfigPath: string): SimpleDiagnostic[]`
  - `formatDiagnostics(diagnostics: SimpleDiagnostic[], sourceOf: Map<string, string>): string`
  - a `yarn docs:verify` script whose exit code is 0 only when there are no diagnostics.

**Pipeline, in order:**

1. Delete and recreate `.docs-verify/`.
2. Extract blocks from `docs/docs/**/*.md` and `docs/i18n/**/*.md`.
3. Generate one `.tsx` per block, no stubs yet. Filename: `<slug-of-source>__<index>.tsx`.
4. Typecheck. Collect diagnostics.
5. For each file with TS2304 diagnostics, regenerate it with stubs and record it as **render-excluded**.
6. Typecheck again. Remaining diagnostics are real failures.
7. Print the report, print the render-excluded count, exit non-zero if anything failed.

- [ ] **Step 1: Write the failing test for the reporter**

Create `scripts/docs-verify/__tests__/report.test.ts`:

```ts
import {formatDiagnostics} from '../report'
import type {SimpleDiagnostic} from '../stubs'

describe('formatDiagnostics', () => {
  it('maps a generated-file error back to its markdown coordinate', () => {
    const sourceOf = new Map([['/abs/.docs-verify/quick-start__0.tsx', 'docs/docs/getting-started/quick-start.md:36']])

    const out = formatDiagnostics(
      [
        {
          file: '/abs/.docs-verify/quick-start__0.tsx',
          code: 2322,
          message: `Type '"MENU"' is not assignable to type 'IconKeys'.`,
          line: 6,
        },
      ],
      sourceOf
    )

    expect(out).toContain('docs/docs/getting-started/quick-start.md:36')
    expect(out).toContain('TS2322')
    expect(out).toContain(`Type '"MENU"' is not assignable to type 'IconKeys'.`)
  })

  it('returns an empty string when there are no diagnostics', () => {
    expect(formatDiagnostics([], new Map())).toBe('')
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `yarn test scripts/docs-verify/__tests__/report.test.ts`
Expected: FAIL — `Cannot find module '../report'`.

- [ ] **Step 3: Write the reporter**

Create `scripts/docs-verify/report.ts`:

```ts
import type {SimpleDiagnostic} from './stubs'

/**
 * Renders diagnostics against markdown coordinates rather than generated-file
 * coordinates. Without this a 330-block harness is unusable.
 */
export function formatDiagnostics(
  diagnostics: SimpleDiagnostic[],
  sourceOf: Map<string, string>
): string {
  if (diagnostics.length === 0) return ''

  return diagnostics
    .map((diagnostic) => {
      const source = sourceOf.get(diagnostic.file) ?? diagnostic.file
      return `${source}  TS${diagnostic.code}: ${diagnostic.message}`
    })
    .join('\n')
}
```

- [ ] **Step 4: Run the reporter test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/report.test.ts`
Expected: PASS, 2 tests.

- [ ] **Step 5: Write the typechecker**

Create `scripts/docs-verify/typecheck.ts`:

```ts
import * as fs from 'fs'
import * as path from 'path'

import * as ts from 'typescript'

import type {SimpleDiagnostic} from './stubs'

function listSnippetFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.tsx'))
    .map((name) => path.join(dir, name))
}

/**
 * Compiles every generated snippet with the real TypeScript compiler and
 * returns flattened diagnostics.
 */
export function typecheckDir(dir: string, tsconfigPath: string): SimpleDiagnostic[] {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  )

  const program = ts.createProgram(listSnippetFiles(dir), parsed.options)
  const diagnostics = [
    ...program.getSemanticDiagnostics(),
    ...program.getSyntacticDiagnostics(),
  ]

  const results: SimpleDiagnostic[] = []

  for (const diagnostic of diagnostics) {
    if (diagnostic.file === undefined || diagnostic.start === undefined) continue
    const {line} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
    results.push({
      file: diagnostic.file.fileName,
      code: diagnostic.code,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
      line: line + 1,
    })
  }

  return results
}
```

- [ ] **Step 6: Write the fixture config**

Create `scripts/docs-verify/fixtures/rott.config.ts`:

```ts
import {defaultThemeConfig} from '../../../src/providers/defaultThemeConfig'
import {defineRottConfig} from '../../../src/utils/defineRottConfig'

export const config = defineRottConfig({...defaultThemeConfig} as const)
```

- [ ] **Step 7: Write the snippet tsconfig**

Create `tsconfig.docs-verify.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@tansuk/rott-ui": ["./src"],
      "rott.config": ["./scripts/docs-verify/fixtures/rott.config.ts"]
    }
  },
  "include": [".docs-verify/**/*.tsx"]
}
```

Two deliberate deviations from the root config:

- `noUnusedLocals` and `noUnusedParameters` are disabled. A documentation example
  that imports three components but uses two is a style issue, not a correctness
  failure, and should not block the gate.
- `jsx` is `react-jsx`, not the root's `react`. Under the classic `react`
  transform, every snippet would need `React` in scope, and most documentation
  examples reasonably omit that import. The automatic runtime removes the
  requirement.

- [ ] **Step 8: Write the CLI**

Create `scripts/docs-verify/index.ts`:

```ts
import * as fs from 'fs'
import * as path from 'path'

import {extractBlocks} from './extract'
import {generateSnippet} from './generate'
import {formatDiagnostics} from './report'
import {stubsForFile} from './stubs'
import {typecheckDir} from './typecheck'

import type {Block} from './types'
import type {SimpleDiagnostic} from './stubs'

const ROOT = path.resolve(__dirname, '../..')
const OUT_DIR = path.join(ROOT, '.docs-verify')
const TSCONFIG = path.join(ROOT, 'tsconfig.docs-verify.json')
const DOC_ROOTS = [path.join(ROOT, 'docs/docs'), path.join(ROOT, 'docs/i18n')]

function findMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...findMarkdown(full))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

function slug(sourcePath: string): string {
  return sourcePath.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function fileNameFor(block: Block): string {
  return `${slug(block.sourcePath)}__${block.index}.tsx`
}

function groupByFile(diagnostics: SimpleDiagnostic[]): Map<string, SimpleDiagnostic[]> {
  const grouped = new Map<string, SimpleDiagnostic[]>()
  for (const diagnostic of diagnostics) {
    const list = grouped.get(diagnostic.file) ?? []
    list.push(diagnostic)
    grouped.set(diagnostic.file, list)
  }
  return grouped
}

function main(): void {
  fs.rmSync(OUT_DIR, {recursive: true, force: true})
  fs.mkdirSync(OUT_DIR, {recursive: true})

  const blocks: Block[] = []
  for (const root of DOC_ROOTS) {
    for (const file of findMarkdown(root)) {
      const relative = path.relative(ROOT, file)
      blocks.push(...extractBlocks(fs.readFileSync(file, 'utf8'), relative))
    }
  }

  const byGeneratedPath = new Map<string, Block>()
  for (const block of blocks) {
    const target = path.join(OUT_DIR, fileNameFor(block))
    fs.writeFileSync(target, generateSnippet(block), 'utf8')
    byGeneratedPath.set(target, block)
  }

  // Pass 1: find undeclared identifiers.
  const firstPass = typecheckDir(OUT_DIR, TSCONFIG)
  const stubbed: string[] = []

  for (const [file, diagnostics] of groupByFile(firstPass)) {
    const stubs = stubsForFile(diagnostics)
    if (stubs.length === 0) continue
    const block = byGeneratedPath.get(file)
    if (block === undefined) continue
    fs.writeFileSync(file, generateSnippet(block, stubs), 'utf8')
    stubbed.push(file)
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'render-excluded.json'),
    JSON.stringify(stubbed.map((f) => path.basename(f)).sort(), null, 2),
    'utf8'
  )

  // Pass 2: everything that remains is a real failure.
  const secondPass = typecheckDir(OUT_DIR, TSCONFIG)

  const sourceOf = new Map<string, string>()
  for (const [file, block] of byGeneratedPath) {
    sourceOf.set(file, `${block.sourcePath}:${block.startLine}`)
  }

  const report = formatDiagnostics(secondPass, sourceOf)

  /* eslint-disable no-console */
  console.log(`docs-verify: ${blocks.length} blocks, ${stubbed.length} excluded from render`)
  if (report !== '') {
    console.error(report)
    console.error(`docs-verify: ${secondPass.length} error(s)`)
    process.exit(1)
  }
  console.log('docs-verify: typecheck clean')
  /* eslint-enable no-console */
}

main()
```

- [ ] **Step 9: Wire up config files**

Append to `.gitignore`:

```
# docs-verify generated snippets
.docs-verify/
```

In `tsconfig.json`, change the `exclude` line to:

```json
  "exclude": ["examples/*", "docs/*", ".docs-verify"]
```

In `package.json`, add to `scripts` (next to `generate:assets`):

```json
    "docs:verify": "ts-node --compiler-options '{\"module\":\"commonjs\",\"moduleResolution\":\"node\"}' scripts/docs-verify/index.ts",
```

- [ ] **Step 10: Run the harness for the first time**

Run: `yarn docs:verify`
Expected: **FAIL, and that is correct.** It should print a block count near 330,
a render-excluded count near 72, and a list of errors including at least these
two, reported against `docs/docs/getting-started/quick-start.md`:

```
TS2322: Type '"COMPANY_LOGO"' is not assignable to type 'ImageTypes | undefined'
TS2322: Type '"MENU"' is not assignable to type 'IconKeys'
```

Both were reproduced by hand on 2026-08-02 by extracting that example into the
consumer app and running `tsc`, so their absence means the harness is broken,
not that the docs are correct.

If the run reports zero blocks, the doc roots are wrong. If it reports zero
errors, the harness is not working — the Quick Start error is known to exist and
must appear.

Record the exact error count in the commit message; Task 5 drives it to zero.

- [ ] **Step 11: Typecheck and lint**

Run: `yarn typecheck && yarn lint`
Expected: both clean.

- [ ] **Step 12: Commit**

```bash
git add scripts/docs-verify/ tsconfig.docs-verify.json tsconfig.json .gitignore package.json
git commit -m "feat(docs-verify): add typecheck pipeline and docs:verify script"
```

---

## Task 5: Repair the 58 invalid icon and image references

**Files:**
- Modify: `docs/docs/components/header.md`
- Modify: `docs/docs/components/icon.md`
- Modify: `docs/docs/components/image-background.md`
- Modify: `docs/docs/components/image.md`
- Modify: `docs/docs/components/item.md`
- Modify: `docs/docs/components/pressable.md`
- Modify: `docs/docs/examples/login-form.md`
- Modify: `docs/docs/getting-started/quick-start.md`
- Modify: `docs/docs/guides/accessibility.md`
- Modify: `docs/docs/intro.md`
- Modify: `docs/docs/theming/colors.md`
- Modify: `docs/docs/theming/overview.md`
- Modify: `docs/i18n/tr/docusaurus-plugin-content-docs/current/components/icon.md`
- Modify: `docs/i18n/tr/docusaurus-plugin-content-docs/current/getting-started/quick-start.md`
- Modify: `docs/i18n/tr/docusaurus-plugin-content-docs/current/intro.md`

**Interfaces:**
- Consumes: the working `yarn docs:verify` from Task 4.
- Produces: a documentation tree whose typecheck pass is clean.

**Disambiguation rule — apply before consulting the table:**

- `<Icon name="…">` takes an **icon** key.
- `<Image name="…">`, `<ImageBackground name="…">` and `<Header logo="…">` take
  an **image** key.

The two key spaces overlap in places but are not the same. When a replacement is
ambiguous, run `yarn docs:verify` — the compiler names the expected type
(`IconKeys` vs `ImageTypes`).

**Replacement table.** Left column is what appears in the docs today; right
column is a real key verified to exist in `src/providers/defaultThemeConfig.ts`.

| Invalid | Replace with | Key space |
|---|---|---|
| `MENU` | `burgermenu` | icon |
| `PLUS` | `plus` | icon |
| `ARROW_RIGHT` | `arrow-right` | icon |
| `ARROW_LEFT` | `arrow-left` | icon |
| `CHEVRON_RIGHT` | `chevron-right` | icon |
| `CHECK` | `tick` | icon |
| `CLOSE` | `remove` | icon |
| `REMOVE` | `remove` | icon |
| `SETTINGS` | `settings` | icon |
| `USER` | `user` | icon |
| `STAR` | `star` | icon |
| `HEART` | `star` | icon — no heart icon exists in the set |
| `LOGO` | `amblem` | icon |
| `COMPANY_LOGO` (on `<Icon>`) | `amblem` | icon |
| `COMPANY_LOGO` (on `logo=`) | `hgs-logo` | image |
| `APP_LOGO` | `hgs-logo` | image |
| `MY_LOGO` | `hgs-logo` | image |

Both single and double quoted forms occur (`name='HEART'` as well as
`name="HEART"`). Handle both.

- [ ] **Step 1: Confirm the current failure**

Run: `yarn docs:verify 2>&1 | grep -c TS2322`
Expected: a non-zero count. Write it down — this is the number Step 4 must
reduce to zero.

- [ ] **Step 2: Apply the replacements**

Work through the 15 files listed above. For each occurrence, decide the key
space using the disambiguation rule, then substitute from the table.

Do not use a blind global find-and-replace: `COMPANY_LOGO` maps to two different
keys depending on which prop it sits on, and a global replace would silently pick
the wrong one for half the occurrences.

- [ ] **Step 3: Confirm no SCREAMING_SNAKE keys survive**

Run:

```bash
grep -rnE "(name|logo)=['\"][A-Z][A-Z_0-9]{2,}['\"]" docs/docs docs/i18n
```

Expected: no output.

- [ ] **Step 4: Run the harness and confirm the typecheck pass is clean**

Run: `yarn docs:verify`
Expected: `docs-verify: typecheck clean`, exit code 0.

If errors remain that are **not** about icon or image keys, they are genuine
documentation bugs of another kind. Fix the ones that are documentation
mistakes. If any error can only be fixed by changing `src/`, do not change
`src/` — record it in the commit body as Phase 2 input and, if it blocks the
gate, replace that single example with a correct one.

- [ ] **Step 5: Commit**

```bash
git add docs/
git commit -m "fix(docs): replace invalid icon and image keys with real kebab-case keys"
```

---

## Task 6: Render pass

**Files:**
- Create: `jest.docs-render.config.ts`
- Create: `scripts/docs-verify/__tests__/render.test.tsx`
- Modify: `jest.config.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `.docs-verify/*.tsx` and `.docs-verify/render-excluded.json`, both produced by Task 4's CLI.
- Produces: a `yarn docs:verify:render` script, and a `docs:verify` script that runs typecheck then render.

**Why a separate Jest config.** The generated directory does not exist until the
CLI has run, so the main `yarn test` must not try to collect tests from it. The
render pass gets its own config and its own script.

- [ ] **Step 1: Exclude the generated directory from the main test run**

In `jest.config.ts`, add `'.docs-verify/'` to `testPathIgnorePatterns`:

```ts
  testPathIgnorePatterns: [
    'node_modules/',
    'examples/',
    'lib/',
    '.jest-cache/',
    '.docs-verify/',
    'src/__tests__/utils',
  ],
```

- [ ] **Step 2: Run the existing suite to confirm nothing broke**

Run: `yarn test`
Expected: PASS, same suite count as before the change.

- [ ] **Step 3: Write the render test**

Create `scripts/docs-verify/__tests__/render.test.tsx`:

```tsx
import * as fs from 'fs'
import * as path from 'path'

import React from 'react'

import {render} from '@testing-library/react-native'

import {RottProvider} from '../../../src/providers'

const OUT_DIR = path.resolve(__dirname, '../../../.docs-verify')
const EXCLUDED_FILE = path.join(OUT_DIR, 'render-excluded.json')

function excludedNames(): Set<string> {
  if (!fs.existsSync(EXCLUDED_FILE)) return new Set()
  return new Set(JSON.parse(fs.readFileSync(EXCLUDED_FILE, 'utf8')) as string[])
}

function renderableSnippets(): string[] {
  if (!fs.existsSync(OUT_DIR)) return []
  const excluded = excludedNames()
  return fs
    .readdirSync(OUT_DIR)
    .filter((name) => name.endsWith('.tsx'))
    .filter((name) => !excluded.has(name))
    .sort()
}

const snippets = renderableSnippets()

describe('documentation snippets render', () => {
  it('has snippets to render', () => {
    expect(snippets.length).toBeGreaterThan(0)
  })

  it.each(snippets)('%s renders without throwing', (name) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(path.join(OUT_DIR, name))
    const Component = mod.default

    if (typeof Component !== 'function') return

    expect(() =>
      render(
        <RottProvider>
          <Component />
        </RottProvider>
      )
    ).not.toThrow()
  })
})
```

The `typeof Component !== 'function'` guard exists because complete blocks are
passed through verbatim and many of them export named components rather than a
default. Those are covered by the typecheck pass; the render pass covers every
block that produces a default export.

- [ ] **Step 4: Write the render Jest config**

Create `jest.docs-render.config.ts`:

```ts
import type {JestConfigWithTsJest} from 'ts-jest'

import base from './jest.config'

const config: JestConfigWithTsJest = {
  ...base,
  testPathIgnorePatterns: ['node_modules/', 'examples/', 'lib/', '.jest-cache/'],
  testMatch: ['<rootDir>/scripts/docs-verify/__tests__/render.test.tsx'],
  reporters: ['default'],
  silent: false,
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {tsconfig: 'tsconfig.docs-verify.json', isolatedModules: true},
    ],
  },
}

export default config
```

- [ ] **Step 5: Add the scripts**

In `package.json`, replace the `docs:verify` entry added in Task 4 with these
three:

```json
    "docs:verify:typecheck": "ts-node --compiler-options '{\"module\":\"commonjs\",\"moduleResolution\":\"node\"}' scripts/docs-verify/index.ts",
    "docs:verify:render": "jest --config jest.docs-render.config.ts",
    "docs:verify": "yarn docs:verify:typecheck && yarn docs:verify:render",
```

- [ ] **Step 6: Run the full harness**

Run: `yarn docs:verify`
Expected: typecheck clean, then the render suite passes. The render suite should
report roughly 258 cases — 330 blocks minus the render-excluded set.

If individual snippets fail to render, fix the documentation. If a snippet fails
because of a genuine library defect, record it as Phase 2 input and simplify the
example so the gate can go green.

- [ ] **Step 7: Commit**

```bash
git add jest.config.ts jest.docs-render.config.ts scripts/docs-verify/__tests__/render.test.tsx package.json
git commit -m "feat(docs-verify): render documentation snippets under RottProvider"
```

---

## Task 7: Canonical block rule

**Files:**
- Create: `scripts/docs-verify/canonical.ts`
- Test: `scripts/docs-verify/__tests__/canonical.test.ts`
- Modify: `scripts/docs-verify/index.ts`
- Modify: documentation pages that violate the rule

**Interfaces:**
- Consumes: `Block` (Task 1), `isComplete` (Task 2).
- Produces: `canonicalViolations(blocks: Block[], stubbedIndexes: Set<string>): string[]` returning human-readable violation lines.

**The rule.** On every page under `docs/docs/components/`, the **first** `tsx`
block must be complete (carry its own imports) and must not require stubs. That
block is what a reader copies, and it is what Project C will lift into
`llms.txt`. It has to stand on its own.

- [ ] **Step 1: Write the failing test**

Create `scripts/docs-verify/__tests__/canonical.test.ts`:

```ts
import {canonicalViolations} from '../canonical'
import type {Block} from '../types'

const block = (sourcePath: string, index: number, code: string): Block => ({
  sourcePath,
  startLine: 1,
  code,
  index,
})

const COMPONENT_PAGE = 'docs/docs/components/button.md'
const IMPORTED = "import {Button} from '@tansuk/rott-ui'\nexport const A = () => <Button />\n"

describe('canonicalViolations', () => {
  it('accepts a component page whose first block is complete', () => {
    const blocks = [block(COMPONENT_PAGE, 0, IMPORTED), block(COMPONENT_PAGE, 1, '<Button />\n')]

    expect(canonicalViolations(blocks, new Set())).toEqual([])
  })

  it('rejects a component page whose first block is a fragment', () => {
    const blocks = [block(COMPONENT_PAGE, 0, '<Button />\n')]

    expect(canonicalViolations(blocks, new Set())).toEqual([
      'docs/docs/components/button.md: first tsx block must include its imports',
    ])
  })

  it('rejects a first block that needed stubs', () => {
    const blocks = [block(COMPONENT_PAGE, 0, IMPORTED)]
    const stubbed = new Set([`${COMPONENT_PAGE}#0`])

    expect(canonicalViolations(blocks, stubbed)).toEqual([
      'docs/docs/components/button.md: first tsx block must not reference undeclared identifiers',
    ])
  })

  it('ignores pages outside docs/docs/components', () => {
    const blocks = [block('docs/docs/guides/forms.md', 0, '<Button />\n')]

    expect(canonicalViolations(blocks, new Set())).toEqual([])
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `yarn test scripts/docs-verify/__tests__/canonical.test.ts`
Expected: FAIL — `Cannot find module '../canonical'`.

- [ ] **Step 3: Write the rule**

Create `scripts/docs-verify/canonical.ts`:

```ts
import {isComplete} from './generate'

import type {Block} from './types'

const COMPONENT_PAGES = 'docs/docs/components/'

/**
 * The first tsx block on a component page is the one readers copy and the one
 * Project C will publish. It must carry its own imports and must not lean on
 * generated stubs.
 */
export function canonicalViolations(blocks: Block[], stubbed: Set<string>): string[] {
  const violations: string[] = []

  for (const block of blocks) {
    if (block.index !== 0) continue
    if (!block.sourcePath.startsWith(COMPONENT_PAGES)) continue

    if (!isComplete(block)) {
      violations.push(`${block.sourcePath}: first tsx block must include its imports`)
      continue
    }

    if (stubbed.has(`${block.sourcePath}#${block.index}`)) {
      violations.push(
        `${block.sourcePath}: first tsx block must not reference undeclared identifiers`
      )
    }
  }

  return violations
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/canonical.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Wire the rule into the CLI**

In `scripts/docs-verify/index.ts`, add the import:

```ts
import {canonicalViolations} from './canonical'
```

Change the stub-collection loop so it also records a source-keyed set. Replace
the `const stubbed: string[] = []` declaration with:

```ts
  const stubbed: string[] = []
  const stubbedSources = new Set<string>()
```

and inside the loop, immediately after `stubbed.push(file)`, add:

```ts
    stubbedSources.add(`${block.sourcePath}#${block.index}`)
```

Then, immediately before the `const report = formatDiagnostics(...)` line, add:

```ts
  const violations = canonicalViolations(blocks, stubbedSources)
```

and change the final reporting block to:

```ts
  /* eslint-disable no-console */
  console.log(`docs-verify: ${blocks.length} blocks, ${stubbed.length} excluded from render`)

  let failed = false

  if (report !== '') {
    console.error(report)
    console.error(`docs-verify: ${secondPass.length} error(s)`)
    failed = true
  }

  if (violations.length > 0) {
    console.error(violations.join('\n'))
    console.error(`docs-verify: ${violations.length} canonical block violation(s)`)
    failed = true
  }

  if (failed) process.exit(1)

  console.log('docs-verify: typecheck clean')
  /* eslint-enable no-console */
```

- [ ] **Step 6: Run the harness and fix the violations**

Run: `yarn docs:verify:typecheck`
Expected: a list of component pages whose first block is a fragment.

For each one, edit the page so its first `tsx` block carries its own imports.
Example — in `docs/docs/components/label.md`, the first block becomes:

````markdown
```tsx
import {Label} from '@tansuk/rott-ui';

export const Example = () => <Label text="Hello World" />;
```
````

Do not delete the fragment examples further down the page; they remain useful
and are still typechecked.

- [ ] **Step 7: Confirm the harness is fully green**

Run: `yarn docs:verify`
Expected: `docs-verify: typecheck clean` and a passing render suite, exit 0.

- [ ] **Step 8: Commit**

```bash
git add scripts/docs-verify/ docs/
git commit -m "feat(docs-verify): require component pages to open with a self-contained example"
```

---

## Task 8: Negative fixture and CI gate

**Files:**
- Create: `scripts/docs-verify/__tests__/fixtures/broken.md`
- Create: `scripts/docs-verify/__tests__/harness-catches-errors.test.ts`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: `extractBlocks`, `generateSnippet`, `typecheckDir`.
- Produces: a CI job named `docs-verify` that must pass before merge.

**Why the negative fixture matters.** Everything up to here proves the harness
reports green. Nothing yet proves it can report red. A check that cannot fail is
a ritual, not a check.

**The CI branch problem.** `ci.yml` currently triggers only on `main`, but the
default branch is `development` and pull requests target `development` — so CI
does not run on the pull requests that actually happen. Adding a required gate
to a workflow that never fires would be theatre. This task fixes the triggers.

- [ ] **Step 1: Write the broken fixture**

Create `scripts/docs-verify/__tests__/fixtures/broken.md`:

````markdown
# Broken fixture

This file exists to prove the harness can fail. It is never rendered by
Docusaurus and is not part of the published documentation.

```tsx
import {Icon} from '@tansuk/rott-ui';

export const Broken = () => <Icon name="NOT_A_REAL_ICON_KEY" />;
```
````

- [ ] **Step 2: Write the failing test**

Create `scripts/docs-verify/__tests__/harness-catches-errors.test.ts`:

```ts
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import {extractBlocks} from '../extract'
import {generateSnippet} from '../generate'
import {typecheckDir} from '../typecheck'

const ROOT = path.resolve(__dirname, '../../..')
const FIXTURE = path.join(__dirname, 'fixtures/broken.md')
const TSCONFIG = path.join(ROOT, 'tsconfig.docs-verify.json')

describe('the harness can fail', () => {
  it('reports a type error for an invalid icon key', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-verify-'))

    try {
      const blocks = extractBlocks(fs.readFileSync(FIXTURE, 'utf8'), 'fixtures/broken.md')
      expect(blocks).toHaveLength(1)

      const first = blocks[0]
      if (first === undefined) throw new Error('no block extracted')
      fs.writeFileSync(path.join(dir, 'broken__0.tsx'), generateSnippet(first), 'utf8')

      const diagnostics = typecheckDir(dir, TSCONFIG)

      expect(diagnostics.some((d) => d.code === 2322)).toBe(true)
      expect(diagnostics.some((d) => d.message.includes('NOT_A_REAL_ICON_KEY'))).toBe(true)
    } finally {
      fs.rmSync(dir, {recursive: true, force: true})
    }
  })
})
```

- [ ] **Step 3: Run the test and confirm it passes**

Run: `yarn test scripts/docs-verify/__tests__/harness-catches-errors.test.ts`
Expected: PASS.

If this test fails, the harness is not catching invalid icon keys and Task 5's
green result was false. Stop and debug before continuing.

- [ ] **Step 4: Confirm the fixture is not picked up by the real harness**

Run: `yarn docs:verify:typecheck`
Expected: still clean. The fixture lives under `scripts/`, not `docs/`, so the
CLI's doc roots never see it.

- [ ] **Step 5: Fix the CI triggers and add the gate**

In `.github/workflows/ci.yml`, change the `on:` block to:

```yaml
on:
  push:
    branches:
      - main
      - development
  pull_request:
    branches:
      - main
      - development
  merge_group:
    types:
      - checks_requested
```

Then add this job after the existing `test` job:

```yaml
  docs-verify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup
        uses: ./.github/actions/setup

      - name: Verify documentation snippets
        run: yarn docs:verify
```

- [ ] **Step 6: Run the whole suite locally as CI would**

Run: `yarn lint && yarn typecheck && yarn test && yarn docs:verify`
Expected: all four clean.

- [ ] **Step 7: Commit**

```bash
git add scripts/docs-verify/__tests__/ .github/workflows/ci.yml
git commit -m "ci(docs-verify): add required gate and prove the harness can fail"
```

- [ ] **Step 8: Open the pull request**

```bash
git push -u origin HEAD
gh pr create --base development \
  --title "Phase 1: documentation correctness net" \
  --body "$(cat <<'EOF'
Implements Phase 1 of docs/superpowers/specs/2026-08-02-verifiable-theme-contract-design.md.

- Adds `scripts/docs-verify/`, a harness that extracts every tsx block from the docs, typechecks it with the TypeScript compiler API, and renders the eligible subset under RottProvider.
- Repairs 58 invalid icon and image references across 15 documentation files. The Quick Start example now compiles.
- Requires the first tsx block on each component page to be self-contained.
- Adds a `docs-verify` CI job, and fixes the CI triggers so they fire on pull requests targeting `development`.

Green `yarn docs:verify` is the hard gate for Phase 2.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Definition of done

- `yarn docs:verify` exits 0.
- No `(name|logo)="SCREAMING_SNAKE"` remains anywhere under `docs/`.
- The harness reports its block count and its render-excluded count on every run.
- `harness-catches-errors.test.ts` passes, proving the gate can fail.
- The `docs-verify` job runs on pull requests targeting `development`.

Phase 2 does not start until all five hold.

## Deliberate limits

- Blocks that reference undeclared identifiers are typechecked but not rendered.
  The count is printed on every run so the limit stays visible.
- Complete blocks that export named components rather than a default are
  typechecked but not rendered.
- Prose accuracy is not verified. The harness checks code, not the sentences
  around it.
