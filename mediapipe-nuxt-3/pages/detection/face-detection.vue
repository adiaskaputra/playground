<script setup lang="ts">
const { loadingModel, runningMode, detector } = useFaceDetection()
</script>

<template>
  <div class="face-detection">
    <FaceDetectionVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
    <FaceDetectionImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>
