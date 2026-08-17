# Lint and Format Enforcement — Design

**Date:** 2026-08-17
**Status:** Approved (design), pending implementation plan
**Supersedes:** nothing

---

## Goal

ESLint and Prettier are both configured in this repository, and neither has been
enforcing anything. Give each tool one unambiguous job, and make both run on
every commit and every CI run so the codebase cannot drift again.

## Acceptance criteria

All four are falsifiable and must hold at the same time:

1. `yarn format:check` exits 0 on a clean checkout.
2. `yarn lint` exits 0 on a clean checkout.
3. A commit that stages an unformatted file produces a commit whose staged
   content is formatted — without the author running anything by hand.
4. A push containing an unformatted or lint-failing file makes CI fail.

Criterion 4 is what makes the rest real. Without a CI gate that cannot be
auto-fixed, local enforcement is advisory.

## Non-goals

- **`docs/` and `examples/`.** Both are separate projects with their own
  toolchains: every `examples/*` app ships its own `.eslintrc.js`, its own
  `eslint` dependency and its own `lint` script, and the Docusaurus site is not
  library code. Applying the library's rules there would reformat those projects
  against their own declared configuration.
- **Markdown.** See "Markdown is out of scope" below.
- **Fixing the five `no-use-before-define` warnings.** The rule is deliberately
  set to warn; changing it is a separate decision.

## Current state

Four findings from the audit that motivated this work. All were measured, not
inferred.

**Prettier has never been enforced.** It is configured, and `format` /
`format:check` scripts exist, but nothing invokes them — not the pre-commit hook,
not CI. 121 files have drifted out of format as a result.

**ESLint fought Prettier instead of complementing it.** The config extends
`eslint-config-prettier` — whose entire purpose is to switch off formatting
rules — and then re-enables `indent`, `quotes`, `semi`, `jsx-quotes` and
`linebreak-style` in a later block, which overrides it. Enabling TypeScript
linting surfaced 385 false `indent` errors that were purely this conflict.

**`eslint-plugin-prettier` is dead weight.** It is a declared dependency and is
registered as a plugin, but its `prettier/prettier` rule is never enabled, so it
does no work.

**The written config and the lived convention disagree on `curly`.** The config
says `multi-or-nest`, which forbids braces on single-statement bodies. The rule
never ran on TypeScript, so the contradiction stayed invisible until it stripped
braces at 9 sites.

There is no `curly` setting that leaves the code untouched, because the codebase
uses three styles at once: braced bodies, unbraced bodies on the same line as the
`if`, and unbraced bodies on the line below it. Measured violation counts:
`off` 0, `multi-or-nest` 9 across 4 files, `multi-line` 25 across 12,
`all` 158 across 48.

## Design

### Scope

Both tools cover the same paths — the library and the tooling that builds it:

```
src/**/*.{ts,tsx,js}
scripts/**/*.{ts,js}
types/**/*.ts
*.{js,mjs,ts,json}     # root-level configs
```

Everything else is ignored by both: `node_modules/`, `lib/`, `.yarn/`,
`.claude/`, `coverage/`, `docs/`, `examples/`. Markdown is excluded (see
"Markdown is out of scope").

### Responsibility split

Prettier owns formatting. ESLint owns code quality. No rule appears in both.

This is the decision that makes everything else simple: any given violation has
exactly one source, and the two tools can never disagree about a file.

### Three enforcement layers

| Layer | Runs | Behaviour |
| --- | --- | --- |
| Development | `yarn format`, `yarn lint:fix` | manual, optional |
| Commit (lefthook) | `eslint --fix` then `prettier --write` on staged files, then re-stage | fixes automatically, commit proceeds |
| CI | `format:check`, `lint`, `typecheck`, `test` | never fixes, fails on violation |

Order matters at commit time: ESLint fixes first, Prettier writes second, so
Prettier always has the last word on formatting and the two cannot undo each
other.

The commit layer auto-fixes rather than rejecting. This is a deliberate trade:
zero friction in exchange for the author not reviewing every change that lands.
The CI layer is what makes the trade safe — anything the hook cannot fix, or
anything committed with the hook bypassed, still fails the build.

### `eslint.config.mjs`

- Remove the formatting rules: `indent`, `quotes`, `semi`, `jsx-quotes`,
  `linebreak-style`, `comma-dangle`. `eslint-config-prettier` already disables
  them; the current config's later block was defeating it.
- Remove the `eslint-plugin-prettier` import and plugin registration.
- Set `curly` to `['error', 'multi-line']`, matching how the code is written.
- Upgrade `@typescript-eslint/*` to 8.x and replace the deprecated
  `@typescript-eslint/no-empty-interface` with `no-empty-object-type`.
- Everything else — the TypeScript block, the globals blocks, the ignore list and
  the quality rules — stays as it is.

### `.prettierignore`

Rewrite. The current file is React Native **application** boilerplate: Gradle,
Buck, Xcode, CocoaPods and Android Studio paths for directories that do not exist
in this repository, which has no `android/` or `ios/` app. Meanwhile it fails to
ignore what actually matters — `lib/`, `.yarn/`, `docs/`, `examples/`,
`coverage/`. Replace it with a short list that describes this repository.

### `package.json`

- Narrow `format` and `format:check` to the agreed scope. They currently glob
  `**/*`, which reaches into `docs/` and `examples/`.
- Drop `eslint-plugin-prettier`.
- Move `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` to 8.x.

### `lefthook.yml`

Add a Prettier command to `pre-commit` and set `stage_fixed: true` on the
commands that modify files, so fixes are re-staged rather than left in the
working tree. Keep the existing `tsc` command.

### `ci.yml`

Add a `Check formatting` step to the `lint` job. CI never writes; it only
rejects.

### One-time normalization

Run Prettier across the scope and commit the result on its own, with no other
change in the diff. Measured: **121 files** — 116 in `src/`, 3 in `scripts/`,
2 at the root, 0 in `types/`.

## Decisions and rationale

**Auto-fix at commit rather than reject.** Chosen by the user. Matches the
reference setup they already work with, which uses `lint-staged` to run
`eslint --fix` and `prettier --write` on staged files.

**Prettier scope equals ESLint scope.** One boundary to remember instead of two,
and it keeps both tools out of the projects that own their own tooling.

**`curly: multi-line`, and brace the 34 sites it flags.** This decision was taken
twice. The first time rested on a false claim of mine — that `multi-line`
described the code as written and would cost only the reversion of the 9 stripped
braces. It does not: the style where an unbraced body sits on the line below the
`if` appears 25 more times, and `multi-line` rejects it. Corrected counts went
back to the user, who kept `multi-line` and accepted bracing all 34 sites across
15 files.

`all` remains the stricter and more common industry default, and it is now a
smaller step than it looks — 158 sites rather than 25. It is still a separate
change from this one.

The lesson worth keeping: "matches the existing style" is a measurable claim, and
this spec asserted it without measuring.

**typescript-eslint 8.x.** Not cosmetic. 7.18.0 officially supports TypeScript
`<5.6` and this project is on 5.9.3, which the parser warns about on every run.
An unsupported parser can mis-parse newer syntax, and a parser that quietly fails
to see code reports no error — it simply lints less. 8.67.0 supports
`>=4.8.4 <6.1.0`. Measured: identical lint output on both versions (0 errors,
5 warnings), so the upgrade is behaviour-neutral here.

**Markdown is out of scope.** Prettier rewrites Markdown tables by padding every
column to equal width. `README.md` was hand-authored recently and its tables
would be rewritten wholesale; `AGENTS.md`, `DEPLOYMENT_SUMMARY.md` and
`DOCUMENTATION_STATUS.md` would also change. Four files of pure cosmetic churn on
hand-written prose, for no correctness gain. Markdown can be brought in later as
a deliberate, separate change.

## Risks

**Commits can contain changes the author did not see.** This is the accepted cost
of `stage_fixed: true`. Mitigation is the CI gate, which is not auto-fixable.

**The normalization commit conflicts with any open branch.** It touches 121
files. There are no open pull requests at the time of writing, so this is the
cheapest moment to do it.

**Snapshot tests may be format-sensitive.** Prettier does not change semantics,
but 43 snapshots exist and some assert on rendered structure. Verification below
covers this. If any snapshot breaks, it will be reported rather than silently
refreshed with `-u`.

## Verification

Run after each step, not only at the end:

- `yarn format:check` exits 0
- `yarn lint` exits 0
- `yarn typecheck` exits 0
- `yarn test` — 58 suites, 481 tests, 43 snapshots, all passing
- `yarn prepare` exits 0
- A deliberately unformatted staged file produces a formatted commit
- CI is green on `development` after push, with `build-library` skipped
