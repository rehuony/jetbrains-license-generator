import antfu from '@antfu/eslint-config';

export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    stylistic: { indent: 2, quotes: 'single', semi: true },
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'style/brace-style': ['error', '1tbs'],
      'style/nonblock-statement-body-position': ['error', 'beside'],
    },
  },
);
