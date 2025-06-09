<script setup lang="ts">
import { FaceLandmarker, DrawingUtils } from '@mediapipe/tasks-vision'

const { $loadModel, $loadingModel, $faceDetector } = useNuxtApp()

const videoWidth = 480

const RefContent = ref()
const RefVidContainer = ref()
const RefVideo = ref()
const RefCanvas = ref()
const RefBlendShapes = ref()

const isRenderCamera = ref(true)
const isCameraLive = ref(false)
const isInProgressStopFaceDetection = ref(false)
const loading = ref(false)

function drawMasking(blendShapes) {
  try {
    if (!blendShapes.length) return

    let htmlMaker = ''
    blendShapes[0].categories.map((shape) => {
      htmlMaker += `
    <li class="blend-shapes__item">
      <span class="blend-shapes__label">${shape.displayName || shape.categoryName}</span>
      <span class="blend-shapes__value" style="width: calc(${
        +shape.score * 100
      }% - 120px)">${(+shape.score).toFixed(4)}</span>
    </li>
  `
    })
    RefBlendShapes.value.innerHTML = htmlMaker
  }
  catch (err) {
    console.info('ERR DRAW MASKING')
    console.error(err)
  }
}

async function runMachine() {
  try {
    if (isInProgressStopFaceDetection.value) return
    if ($loadingModel.value) {
      alert('Wait for face landmark to load before clicking!')
      return
    }

    let lastVideoTime = -1
    let results = undefined
    const canvasCtx = RefCanvas.value.getContext('2d')
    const drawingUtils = new DrawingUtils(canvasCtx)

    const radio = RefVideo.value.videoHeight / RefVideo.value.videoWidth
    RefVideo.value.style.width = videoWidth + 'px'
    RefVideo.value.style.height = videoWidth * radio + 'px'
    RefCanvas.value.style.width = videoWidth + 'px'
    RefCanvas.value.style.height = videoWidth * radio + 'px'
    RefCanvas.value.width = RefVideo.value.videoWidth
    RefCanvas.value.height = RefVideo.value.videoHeight

    const startTimeMs = performance.now()
    if (lastVideoTime !== RefVideo.value.currentTime) {
      lastVideoTime = RefVideo.value.currentTime
      results = $faceDetector.value.detectForVideo(RefVideo.value, startTimeMs)
    }

    if (results.faceLandmarks) {
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: '#C0C0C070', lineWidth: 1 },
        )
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
          color: '#FF3030',
        })
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          { color: '#FF3030' },
        )
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
          color: '#30FF30',
        })
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          { color: '#30FF30' },
        )
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, {
          color: '#E0E0E0',
        })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
          color: '#E0E0E0',
        })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, {
          color: '#FF3030',
        })
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, {
          color: '#30FF30',
        })
      }
    }

    drawMasking(results.faceBlendshapes)
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
  if ($loadingModel.value) {
    alert('Wait! face landmark not loaded yet.')
    return
  }

  loading.value = true
  const constraints = { video: true }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
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

onMounted(() => {
  $loadModel()
})
</script>

<template>
  <div class="face-detection">
    <div
      ref="RefContent"
      class="g-page__content"
      :class="{
        'g-page__content--loading': $loadingModel,
      }"
    >
      <UButton
        v-if="isCameraLive"
        label="Close camera"
        color="red"
        class="mb-4"
        :loading="loading"
        @click.stop="closeCam()"
      />
      <UButton v-else label="Open camera" :loading="loading" @click.stop="openCam()" />

      <div class="flex flex-wrap gap-6">
        <div
          v-if="isRenderCamera"
          ref="RefVidContainer"
          class="video-container"
          style="width: 480px"
        >
          <video ref="RefVideo" autoplay playsinline style="width: 480px"></video>
          <canvas
            id="output_canvas"
            ref="RefCanvas"
            class="output_canvas"
            style="position: absolute; left: 0px; top: 0px"
          ></canvas>
        </div>
        <div v-if="isCameraLive" class="blend-shapes flex-1">
          <ul ref="RefBlendShapes" class="blend-shapes-list"></ul>
        </div>
      </div>
    </div>
  </div>
</template>
