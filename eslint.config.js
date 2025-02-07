import js from "@eslint/js"
import globals from "globals"

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    rules: {
      semi: ["error", "never"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": ["error"],
      "no-unused-vars": ["error", {
        "vars": "all",
        "args": "after-used",
        "argsIgnorePattern": "[\\w]",
        "caughtErrors": "all",
        "ignoreRestSiblings": false,
        "reportUsedIgnorePattern": false
      }]
    }
  }
]
