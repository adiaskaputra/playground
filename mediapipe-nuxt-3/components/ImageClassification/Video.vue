<script setup lang="ts">
import type { ImageClassifier as ImageClassifierType } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: ImageClassifierType | undefined
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
const RefPredict = ref()

const isRenderCamera = ref(true)
const isCameraLive = ref(false)
const isInProgressStopFaceDetection = ref(false)
const loading = ref(false)

const videoHeight = '360px'
const videoWidth = '480px'

async function runMachine() {
  try {
    if (isInProgressStopFaceDetection.value) return
    if (!props.detector) {
      alert('Wait for image classification to load before clicking!')
      return
    }

    if (mode.value === 'IMAGE') {
      mode.value = 'VIDEO'
      await props.detector.setOptions({ runningMode: 'VIDEO' })
    }
    const startTimeMs = performance.now()
    const classificationResult = props.detector.classifyForVideo(
      RefVideo.value,
      startTimeMs,
    )

    RefVideo.value.style.height = videoHeight
    RefVideo.value.style.width = videoWidth
    RefPredict.value.style.width = videoWidth

    const classifications = classificationResult.classifications
    RefPredict.value.className = 'webcamPredictions'
    RefPredict.value.innerText
      = 'Classification: '
      + classifications[0].categories[0].categoryName
      + '\n Confidence: '
      + Math.round(parseFloat(classifications[0].categories[0].score) * 100)
      + '%'

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
    alert('Image Classifier is still loading. Please try again..')
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

    <div class="flex flex-wrap items-start gap-6">
      <div v-if="isRenderCamera" ref="RefVidContainer" class="video-container">
        <video ref="RefVideo" autoplay playsinline></video>
      </div>
      <div v-if="isCameraLive">
        <div class="font-bold">Model: efficientnet_lite0 (float32)</div>
        <a
          href="https://storage.googleapis.com/mediapipe-tasks/image_classifier/labels.txt"
          target="_blank"
          class="cursor-pointer text-blue-600 hover:font-bold hover:text-blue-700"
          >Supported label</a>
        <div class="mt-8">
          <p ref="RefPredict"></p>
        </div>
      </div>
    </div>
  </div>
</template>
