<script setup lang="ts">
const { loadingModel, runningMode, detector } = usePoseRecognition({
  numPoses: 2,
})
</script>

<template>
  <div class="face-detection">
    <PoseRecognitionVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
    <PoseRecognitionImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
