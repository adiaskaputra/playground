import { defineNuxtPlugin } from '#app'
import { useCookieStore } from '@/stores/cookie'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.server) {
    const cookieStore = useCookieStore()
    const cookie = useCookie('ella-http-only')
    cookieStore.myCookie = `${cookie.value}`
    // cookieStore.myCookie = cookie.value as unknown as string
  }
})
