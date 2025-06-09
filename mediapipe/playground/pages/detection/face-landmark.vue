<script setup lang="ts">
const { loadingModel, runningMode, detector } = useFaceLandmark()
</script>

<template>
  <div class="face-detection">
    <FaceLandmarkVideo
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
    <FaceLandmarkImage
      v-model:running-mode="runningMode"
      :loading-model="loadingModel"
      :detector="detector"
    />
  </div>
</template>
