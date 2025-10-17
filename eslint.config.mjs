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
      'better-tailwindcss': eslintBetterTailwindcss, // website: https://github.com/schoero/eslint-plugin-better-tailwindcss
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
      'style/brace-style': ['error', '1tbs'],
      'style/jsx-first-prop-new-line': ['error', 'never'],
      'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'style/jsx-quotes': ['error', 'prefer-single'],
      'style/jsx-sort-props': ['error', { ignoreCase: true, shorthandFirst: true, multiline: 'last', reservedFirst: true }],
      'style/max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'style/nonblock-statement-body-position': ['error', 'beside'],
      'better-tailwindcss/enforce-consistent-important-position': ['error', { position: 'recommended' }],
      'better-tailwindcss/enforce-consistent-line-wrapping': ['error', { printWidth: 0, preferSingleLine: true }],
    },
  },
);
