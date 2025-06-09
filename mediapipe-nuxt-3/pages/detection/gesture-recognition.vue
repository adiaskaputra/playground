<script setup lang="ts">
const { loadingModel, runningMode, detector } = useGestureRecognition()
</script>

<template>
  <div class="face-detection">
    <GestureRecognitionVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
    <GestureRecognitionImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
