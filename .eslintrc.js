module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:unicorn/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'simple-import-sort',
    'sort-destructure-keys',
    'unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-useless-return': 'warn',
    'prefer-const': 'warn',
    'react/self-closing-comp': 'error',
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'must', 'need'],
      },
      {
        selector: 'variable',
        types: ['function'],
        format: ['PascalCase', 'camelCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: ['typeLike', 'interface', 'enum'],
        format: ['PascalCase'],
        custom: {
          regex: '^(?![TIE][A-Z])',
          match: true,
        },
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-unresolved': 'error',
    'import/order': 'off',
    'react/no-multi-comp': 'warn',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/jsx-no-leaked-render': [
      'error',
      { validStrategies: ['coerce', 'ternary'] },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: true },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
          ref: true,
          Ref: true,
          params: true,
          Params: true,
        },
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-structured-clone': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'import/named': 'off',
  },
};
