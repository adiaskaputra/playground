<script setup lang="ts">
//
//  SSE WITH SYNC STATUS ON RECONNECT
//
// const syncStatus = async () => {
//   const data = await $fetch("/api/my-latest-status");
//   console.info("📥 Status reloaded:", data);
// };

// useSSE(
//   "/api/sse/stream",
//   (data) => {
//     console.info("🔔 Got SSE data:", data);
//   },
//   syncStatus
// );

onMounted(() => {
  const eventSource = new EventSource('/api/sse')
  eventSource.onopen = () => {
    console.info('SSE Connection Opened')
  }

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.info('onmessage:', data)
  }

  eventSource.onerror = (err) => {
    console.error('onerror:', err)
    eventSource.close()
  }

  onUnmounted(() => {
    console.info('onUnmounted')
    eventSource.close()
  })
})
</script>

<template>
  <div>TES SSE</div>
</template>

<style lang="scss" scoped></style>
