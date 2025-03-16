// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  ignorePatterns: ['/dist/*'],
  env: {
    // This tells ESLint to recognize Jest globals like `it` and `expect`
    jest: true,
  },
  extends: [
    'expo',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  rules: {
    '@typescript-eslint/no-shadow': ['error', { allow: ['_'] }],
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'no-param-reassign': 'error',
    'no-var': 'warn',
    'react/self-closing-comp': 'warn',
    'require-await': 'error',
    'yoda': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
