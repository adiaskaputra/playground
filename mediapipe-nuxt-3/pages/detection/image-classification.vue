<script setup lang="ts">
const { loadingModel, runningMode, detector } = useImageClassification()
</script>

<template>
  <div class="face-detection">
    <ImageClassificationVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
