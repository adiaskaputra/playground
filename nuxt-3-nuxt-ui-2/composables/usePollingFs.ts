import { ref, onMounted, onUnmounted } from 'vue'
import { useFetch } from '#app'

export function usePollingFs(intervalMs = 1000) {
  const rtData = ref<any>()
  let intervalId: NodeJS.Timeout

  const fetchAll = async () => {
    const { data, error } = await useFetch('/api/fs')
    if (!error.value && data.value) {
      rtData.value = data.value
    }
  }

  // const fetchOne = async () => {
  //   const { data, error } = await useFetch('/api/fs?id=YOFiKsrWCPSkpCNFGxo1')
  //   if (!error.value && data.value) {
  //     console.log("fetchOne", data.value)
  //     rtData.value = data.value
  //   }
  // }

  onMounted(() => {
    fetchAll()
    // fetchOne()
    intervalId = setInterval(fetchAll, intervalMs)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  return {
    rtData,
  }
}
