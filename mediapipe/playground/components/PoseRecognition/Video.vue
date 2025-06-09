<script setup lang="ts">
import { PoseLandmarker, DrawingUtils } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: PoseLandmarker | undefined
  loadingModel: boolean
  runningMode: 'IMAGE' | 'VIDEO'
}>()

const emits = defineEmits<{
  (event: 'update:runningMode', value: 'IMAGE' | 'VIDEO'): void
}>()

const mode = computed({
  get() {
    return props.runningMode
  },
  set(e) {
    emits('update:runningMode', e)
  },
})

const videoHeight = '360px'
const videoWidth = '480px'

const RefContent = ref()
const RefVidContainer = ref()
const RefVideo = ref()
const RefCanvas = ref()

const isRenderCamera = ref(true)
const isCameraLive = ref(false)
const isInProgressStopFaceDetection = ref(false)
const loading = ref(false)

let lastVideoTime = -1

function drawMasking(result) {
  try {
    const canvasCtx = RefCanvas.value.getContext('2d')
    const drawingUtils = new DrawingUtils(canvasCtx)

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, RefCanvas.value.width, RefCanvas.value.height)
    for (const landmark of result.landmarks) {
      drawingUtils.drawLandmarks(landmark, {
        radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
      })
      drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
    }
    canvasCtx.restore()
  }
  catch (err) {
    console.info('ERR DRAW MASKING')
    console.error(err)
  }
}

async function runMachine() {
  try {
    if (isInProgressStopFaceDetection.value) return
    if (!props.detector) {
      alert('Wait for pose recognition to load before clicking!')
      return
    }

    RefCanvas.value.style.height = videoHeight
    RefVideo.value.style.height = videoHeight
    RefCanvas.value.style.width = videoWidth
    RefVideo.value.style.width = videoWidth

    if (mode.value === 'IMAGE') {
      mode.value = 'VIDEO'
      await props.detector.setOptions({ runningMode: 'VIDEO' })
    }
    const startTimeMs = performance.now()
    if (lastVideoTime !== RefVideo.value.currentTime) {
      lastVideoTime = RefVideo.value.currentTime

      props.detector.detectForVideo(RefVideo.value, startTimeMs, (result) => {
        drawMasking(result)
      })
    }

    window.requestAnimationFrame(runMachine)
  }
  catch (err) {
    console.info('ERR RUN MACHINE')
    console.error(err)
  }
}

async function closeCam() {
  try {
    if (!isCameraLive.value) return
    loading.value = true
    isInProgressStopFaceDetection.value = true
    await $delay(500)

    const stream = RefVideo.value.srcObject
    const tracks = stream.getTracks()
    tracks.forEach((track) => {
      track.stop()
      RefVideo.value.srcObject = null
    })

    nextTick(() => {
      isCameraLive.value = false
      isInProgressStopFaceDetection.value = false
      isRenderCamera.value = false
      nextTick(() => {
        isRenderCamera.value = true
        loading.value = false
      })
    })
  }
  catch (err) {
    console.info('ERR CLOSE CAM')
    console.error(err)
  }
}

async function openCam() {
  if (isCameraLive.value) {
    alert('Camera still live.')
    return
  }
  if (!props.detector) {
    alert('Pose recognition is still loading. Please try again..')
    return
  }

  loading.value = true
  const constraints = { video: true }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      RefVideo.value.srcObject = stream
      RefVideo.value.addEventListener('loadeddata', () => {
        isCameraLive.value = true
        nextTick(() => {
          runMachine()
          loading.value = false
        })
      })
    })
    .catch((err) => {
      isCameraLive.value = false
      loading.value = false
      console.info('ERR OPEN CAM')
      console.error(err)
    })
}

onBeforeRouteLeave(async () => {
  await closeCam()
})
</script>

<template>
  <div
    ref="RefContent"
    class="g-page__content"
    :class="{
      'g-page__content--loading': loadingModel,
    }"
  >
    <div class="pb-4">
      <UButton
        v-if="isCameraLive"
        label="Close camera"
        color="red"
        :loading="loading"
        @click.stop="closeCam"
      />
      <UButton v-else label="Open camera" :loading="loading" @click.stop="openCam" />
    </div>
    <div v-if="isRenderCamera" ref="RefVidContainer" class="video-container">
      <video ref="RefVideo" autoplay playsinline></video>
      <canvas
        id="output_canvas"
        ref="RefCanvas"
        class="output_canvas"
        width="1280"
        height="720"
        style="position: absolute; left: 0px; top: 0px"
      ></canvas>
    </div>
  </div>
</template>
