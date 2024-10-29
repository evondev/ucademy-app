module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-unused-vars": "error",
    "react/jsx-sort-props": [
      "error",
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will", "must", "need"],
      },
      {
        selector: "variable",
        types: ["function"],
        format: ["PascalCase", "camelCase"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: ["typeLike", "interface", "enum"],
        format: ["PascalCase"],
        custom: {
          regex: "^[^TIE]",
          match: true,
        },
      },
    ],
    "prettier/prettier": ["error", { singleQuote: true, semi: false }],
  },
};
