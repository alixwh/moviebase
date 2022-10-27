module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  overrides: [
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'vue/no-unused-vars': ['warn'],
    'vue/multi-word-component-names': 'off',
    'vue/html-quotes': ['warn', 'single', { avoidEscape: true }],
  },
};
