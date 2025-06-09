export const useSSE = (
  url: string,
  onMessage: (data: any) => void,
  onReconnect?: () => Promise<void>,
) => {
  let source: EventSource | null = null

  const connect = () => {
    if (source) source.close()

    source = new EventSource(url)

    source.onopen = () => {
      console.info('✅ SSE connected:', url)
    }

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      }
      catch (err) {
        console.error('❌ Failed to parse SSE message', err)
      }
    }

    source.onerror = () => {
      console.warn('❌ SSE connection error')
      source?.close()
      source = null
      // ⚠️ Tidak ada retry otomatis
    }
  }

  const disconnect = () => {
    if (source) {
      source.close()
      source = null
      console.info('🔌 SSE disconnected')
    }
  }

  const handleVisibility = async () => {
    if (document.visibilityState === 'visible') {
      console.info('🔁 Visibility change: reconnecting SSE')

      if (onReconnect) {
        try {
          await onReconnect()
          console.info('📦 Data resynced on visibility')
        }
        catch (e) {
          console.warn('⚠️ Failed to resync data')
        }
      }

      connect()
    }
  }

  onMounted(() => {
    connect()
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onUnmounted(() => {
    disconnect()
    document.removeEventListener('visibilitychange', handleVisibility)
  })

  return { connect, disconnect }
}
