import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  ...tailwind.configs['flat/recommended'],
  {
    ignores: [
      // FOLDER
      '.devcontainer',
      '.nitro',
      '.nuxt',
      '.output',
      '.vscode',
      '.yarn',
      'dist',
      'example',
      'node_modules',
      // FILE
      '*.log*',
      '*.md',
      '.cache',
      '.env',
      '.gitlab-ci.yml',
      '.yarnrc.yml',
      'cloudbuild.yaml',
      'commitlint.config.js',
    ],
  },
  {
    rules: {
      '@stylistic/indent-binary-ops': 'off',
      'camelcase': 'off',
      'dot-notation': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'max-len': ['warn', { code: 140, tabWidth: 2, comments: 140 }],
      'no-console': [2, { allow: ['error', 'info', 'warn'] }],
      'no-lonely-if': 'off',
      'semi': [2, 'never'],
      'tailwindcss/no-custom-classname': 'off',
      'vue/component-tags-order': [
        'error',
        {
          order: ['script:not([setup])', 'script[setup]', 'template', 'style'],
        },
      ],
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/no-lone-template': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-mutating-props': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
  {
    files: ['.yarn/**/*'],
  },
])
