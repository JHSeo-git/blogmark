/**
 * @see https://github.com/daangn/stackflow/blob/main/.eslintrc.js
 */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'airbnb',
    'prettier',
  ],
  plugins: ['json-format', 'simple-import-sort', 'react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'camelcase': 'off',
    'jsx-a11y/anchor-is-valid': 'off', // next/link
    'no-nested-ternary': 'off',
    'no-restricted-exports': 'off',
    'no-shadow': 'off',
    'no-useless-return': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
  },
  ignorePatterns: ['**/dist/**/*', '**/.next/**/*', '**/node_modules/**/*'],
};
