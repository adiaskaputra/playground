<script setup lang="ts">
const { loadingModel, runningMode, detector } = useObjectDetection()
</script>

<template>
  <div class="face-detection">
    <ObjectDetectionVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
    <ObjectDetectionImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>
