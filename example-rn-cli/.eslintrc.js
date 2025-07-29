/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    'no-use-before-define': 1,
    'no-console': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    indent: ['error', 2],
    'linebreak-style': 1,
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    'newline-before-return': 'error',
    'react/no-array-index-key': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-dupe-keys': 'error',
    'no-empty': 'error',
    'comma-dangle': ['off', 'never'],
    curly: ['error', 'multi-or-nest'],
  },
}
