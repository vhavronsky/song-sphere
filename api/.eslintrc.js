module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import-helpers'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
          newlinesBetween: 'ignore', // new line between groups
          groups: [
              '/helmet/',
              '/^typeorm*/',
              '/^mongoose*/',
              '/^@nestjs*/',
              '/bcrypt/',
              '/^#config*/',
              '/^#src*/',
              '/^#application*/',
              '/^#controllers*/',
              '/^#pipes*/',
              '/^#dtos*/',
              '/^#types*/',
              '/^#shared*/',
              '/^#domain*/',
              '/^#interfaces*/',
              '/^#repositories*/',
              '/^#schemas*/',
              '/^#services*/',
              '/^#infrastructure*/',
              '/^#*/',
              'module',
              ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
  ],
  },
};
