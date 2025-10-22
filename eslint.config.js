// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// FIX: Reverted to a known-good, simpler configuration to resolve the crash.
// This config provides the essential features for a React+TS project without being overly strict.
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    ignores: ['dist/', 'vite.config.ts', '.eslintrc.cjs'],
  }
]