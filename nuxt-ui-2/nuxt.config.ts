// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  imports: {
    dirs: ['composables/**'],
  },
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: 'Playground Nuxt UI 2',
      link: [{ rel: 'icon', type: 'image/ico', href: '/favicon.svg' }],
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
        },
        {
          'http-equiv': 'Delegate-CH',
          'content':
            'sec-ch-ua-full-version-list https://cloud.51degrees.com; sec-ch-ua-model https://cloud.51degrees.com; sec-ch-ua-platform https://cloud.51degrees.com; sec-ch-ua-platform-version https://cloud.51degrees.com',
        },
      ],
    },
  },
  css: ['~/assets/css/transition.css', '~/assets/css/main.css'],
  colorMode: {
    preference: 'system', // [ system, dark, light, sepia ]
  },
  runtimeConfig: {
    apiBaseUrl: '',
  },
  devServer: {
    port: 8000,
  },
  compatibilityDate: '2025-11-01',
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: false,
        strictNullChecks: true,
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
        quoteProps: 'consistent-as-needed',
        commaDangle: 'always-multiline',
        blockSpacing: true,
        arrowParens: true,
      },
    },
  },
  icon: {
    serverBundle: {
      collections: ['uil'],
    },
  },
  security: {
    nonce: true,
    rateLimiter: false,
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          '\'self\'', // Fallback value, will be ignored by most modern browsers (level 3)
          '\'unsafe-inline\'', // Fallback value, will be ignored by almost any browser (level 2)
          '\'strict-dynamic\'', // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
          '\'nonce-{{nonce}}\'', // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
        ],
        'style-src': [
          '\'self\'', // Enables loading of stylesheets hosted on same origin
          'fonts.googleapis.com',
          '\'unsafe-inline\'', // Recommended default for most Nuxt apps
        ],
        'base-uri': ['\'none\''],
        'img-src': ['\'self\'', 'data:', 'avatars.githubusercontent.com'], // Add relevant https://... sources if you load images from external sources
        'font-src': ['\'self\'', 'fonts.gstatic.com'],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'frame-ancestors': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        camera: ['self'],
      },
    },
  },
})
