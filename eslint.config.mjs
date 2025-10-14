import antfu from '@antfu/eslint-config';
import eslintBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    stylistic: { indent: 2, quotes: 'single', semi: true },
  },
  {
    plugins: {
      'better-tailwindcss': eslintBetterTailwindcss,
    },
    rules: {
      ...eslintBetterTailwindcss.configs.recommended.rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'source/styles/global.css',
      },
    },
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'style/max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'style/brace-style': ['error', '1tbs'],
      'style/nonblock-statement-body-position': ['error', 'beside'],
      'better-tailwindcss/enforce-consistent-line-wrapping': ['error', { printWidth: 0, preferSingleLine: true }],
      'better-tailwindcss/enforce-consistent-important-position': ['error', { position: 'recommended' }],
    },
  },
);
