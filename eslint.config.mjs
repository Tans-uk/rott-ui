import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  js.configs.recommended,
  ...fixupConfigRules(compat.extends('prettier')),
  {
    plugins: { 
      prettier, 
      react, 
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      'prettier/prettier': ['error', {
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      }],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-use-before-define': 1,
      'no-console': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'indent': ['error', 2],
      'linebreak-style': 1,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'newline-before-return': 'error',
      'react/no-array-index-key': 'error',
      'no-dupe-keys': 'error',
      'no-empty': 'error',
      'comma-dangle': ['off', 'never'],
      'curly': ['error', 'multi-or-nest']
    },
  },
  {
    ignores: ['node_modules/', 'lib/'],
  },
]);
