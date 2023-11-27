/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:storybook/recommended",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: ["**/*.js"],
};

module.exports = config;
