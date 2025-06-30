export function useIsMobile() {
  const isMobile = ref(false)

  const detectMobile = async () => {
    if (import.meta.server) return // hanya jalan di client

    // Modern browser API (jika tersedia)
    if (navigator.userAgentData) {
      try {
        const data = await navigator.userAgentData.getHighEntropyValues(['mobile'])
        isMobile.value = data.mobile
        return
      }
      catch (e) {
        // fallback jika gagal
      }
    }

    // Fallback ke regex userAgent
    const userAgent = navigator.userAgent || ''
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    isMobile.value = mobileRegex.test(userAgent)
  }

  onMounted(() => {
    detectMobile()
  })

  return {
    isMobile,
  }
}
