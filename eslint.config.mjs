import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  js.configs.recommended,
  ...fixupConfigRules(compat.extends('prettier')),
  {
    plugins: { 
      prettier, 
      react,
      'react-hooks': reactHooks,
      // components carry `eslint-disable react-native/no-inline-styles` comments;
      // without the plugin registered those become "rule not found" errors.
      'react-native': reactNative,
      '@typescript-eslint': typescriptEslint
    },
    settings: {
      react: {version: 'detect'},
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-use-before-define': 1,
      // `warn`/`error` are deliberate diagnostics the library ships (a __DEV__
      // theme-config warning, a contact-picker failure). `log` stays banned so
      // debug leftovers are still caught.
      'no-console': ['error', {allow: ['warn', 'error']}],
      'jsx-quotes': ['error', 'prefer-single'],
      'indent': ['error', 2],
      'linebreak-style': 1,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'newline-before-return': 'error',
      'react/no-array-index-key': 'error',
      'react-native/no-inline-styles': 'error',
      // Rules the source already suppresses at specific sites. They were dropped
      // in the flat-config migration, which left those suppressions dangling.
      // Enabling them keeps the deliberate opt-outs documented and catches new ones.
      'react/no-unstable-nested-components': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'no-extend-native': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      'no-dupe-keys': 'error',
      'no-empty': 'error',
      'comma-dangle': ['off', 'never'],
      'curly': ['error', 'multi-or-nest']
    },
  },
  {
    // Flat config only matches .js by default, so .ts/.tsx are skipped unless a
    // block names them explicitly. Without this the whole library goes unlinted.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // tsc already reports undefined identifiers, and the base rule cannot see
      // type-only names, so it false-positives on every interface and generic.
      'no-undef': 'off',
      // the base rule would double-report alongside the @typescript-eslint one.
      'no-unused-vars': 'off',
      // `_`-prefixed names are deliberate: components destructure props as
      // `name: _name, ...props` to keep them out of the rest spread. Deleting
      // them would leak those props onto the underlying component.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // prettier owns indentation (tabWidth 2) and disagrees with this rule on JSX.
      'indent': 'off',
    },
  },
  {
    // Plain JS here is CommonJS tooling: the metro plugin, jest setup, configs.
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // build-time CLIs whose console output is the point, not a debug leftover.
    files: ['scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.{js,ts,tsx}', 'jest.setup*.js'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    ignores: [
      'node_modules/',
      'lib/',
      '.yarn/',
      '.claude/',
      // Separate projects that own their tooling: every examples/* app ships its
      // own .eslintrc.js and lint script, and the Docusaurus site is not library
      // code. Linting them from here applies rules that contradict their own.
      'docs/',
      'examples/',
    ],
  },
]);
