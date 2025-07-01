<script setup lang="ts">
//
//  SSE WITH SYNC STATUS ON RECONNECT
//
// const syncStatus = async () => {
//   const data = await $fetch("/api/my-latest-status");
//   console.log("📥 Status reloaded:", data);
// };

// useSSE(
//   "/api/sse/stream",
//   (data) => {
//     console.log("🔔 Got SSE data:", data);
//   },
//   syncStatus
// );

onMounted(() => {
  const eventSource = new EventSource("/api/sse");
  eventSource.onopen = () => {
    console.log("SSE Connection Opened");
  };

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("onmessage:", data);
  };

  eventSource.onerror = (err) => {
    console.error("onerror:", err);
    eventSource.close();
  };

  onUnmounted(() => {
    console.log("onUnmounted");
    eventSource.close();
  });
});
</script>

<template>
  <div>TES SSE</div>
</template>

<style lang="scss" scoped></style>
