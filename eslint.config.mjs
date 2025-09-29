import antfu from '@antfu/eslint-config';

export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    stylistic: { indent: 2, quotes: 'single', semi: true },
    ignores: ['**/components/ui', '**/lib/utils.ts'],
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'style/max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
      'style/brace-style': ['error', '1tbs'],
      'style/nonblock-statement-body-position': ['error', 'beside'],
    },
  },
);
