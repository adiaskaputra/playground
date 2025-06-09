import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookie', () => {
  const myCookie = ref<string>('')
  return { myCookie }
})
