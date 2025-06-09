<script setup lang="ts">
import type { ObjectDetector as ObjectDetectorType } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: ObjectDetectorType | undefined
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

const RefContent = ref()
const RefVidContainer = ref()
const RefVideo = ref()

const isRenderCamera = ref(true)
const isCameraLive = ref(false)
const isInProgressStopFaceDetection = ref(false)
const loading = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let children: any = []
let lastVideoTime = -1

function drawMasking(detections) {
  try {
    for (const child of children) {
      RefVidContainer.value.removeChild(child)
    }
    children.splice(0)

    for (const detection of detections) {
      const p = document.createElement('p')
      p.innerText
        = detection.categories[0].categoryName
        + ' - with '
        + Math.round(parseFloat(detection.categories[0].score) * 100)
        + '% confidence.'
      p.style
        = 'left: '
        + (RefVideo.value.offsetWidth
          - detection.boundingBox.width
          - detection.boundingBox.originX)
        + 'px;'
        + 'top: '
        + detection.boundingBox.originY
        + 'px; '
        + 'width: '
        + (detection.boundingBox.width - 10)
        + 'px;'

      const highlighter = document.createElement('div')
      highlighter.setAttribute('class', 'highlighter')
      highlighter.style
        = 'left: '
        + (RefVideo.value.offsetWidth
          - detection.boundingBox.width
          - detection.boundingBox.originX)
        + 'px;'
        + 'top: '
        + detection.boundingBox.originY
        + 'px;'
        + 'width: '
        + (detection.boundingBox.width - 10)
        + 'px;'
        + 'height: '
        + detection.boundingBox.height
        + 'px;'

      RefVidContainer.value.appendChild(highlighter)
      RefVidContainer.value.appendChild(p)

      children.push(highlighter)
      children.push(p)
    }
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
      alert('Wait for object detector to load before clicking!')
      return
    }

    if (mode.value === 'IMAGE') {
      mode.value = 'VIDEO'
      await props.detector.setOptions({ runningMode: 'VIDEO' })
    }

    const startTimeMs = performance.now()

    if (RefVideo.value.currentTime !== lastVideoTime) {
      lastVideoTime = RefVideo.value.currentTime
      const res = props.detector.detectForVideo(RefVideo.value, startTimeMs)
      drawMasking(res.detections)
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
      children = []
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
    alert('Object Detector is still loading. Please try again..')
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
    </div>
  </div>
</template>
