// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
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
    public: {
      pathRtdb: '',
    },
  },
  devServer: {
    port: 3000,
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
})
