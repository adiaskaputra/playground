// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt-alt/proxy',
    '@pinia/nuxt'
  ],
  proxy: {
    proxies: {
      '/alt-proxy': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/alt-proxy/, '')
      },
    }
  }
})
