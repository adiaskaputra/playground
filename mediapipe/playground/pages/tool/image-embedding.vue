<script setup lang="ts">
const { loadingModel, runningMode, detector } = useImageEmbedding()
</script>

<template>
  <div class="face-detection">
    <ImageEmbeddingImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
