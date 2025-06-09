<script setup lang="ts">
import { FaceLandmarker, DrawingUtils } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: FaceLandmarker | undefined
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
const RefBlendShapes = ref()

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

async function runMachine(event) {
  try {
    if (!props.detector) {
      alert('Wait for face landmark to load before clicking!')
      return
    }

    if (mode.value === 'VIDEO') {
      mode.value = 'IMAGE'
      await props.detector.setOptions({ runningMode: 'IMAGE' })
    }

    const allCanvas = event.target.parentNode.getElementsByClassName('canvas')
    for (let i = allCanvas.length - 1; i >= 0; i--) {
      const n = allCanvas[i]
      n.parentNode.removeChild(n)
    }

    const result = props.detector.detect(event.target)

    const canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'canvas')
    canvas.setAttribute('width', event.target.naturalWidth + 'px')
    canvas.setAttribute('height', event.target.naturalHeight + 'px')
    canvas.style.left = '0px'
    canvas.style.top = '0px'
    canvas.style.width = `${event.target.width}px`
    canvas.style.height = `${event.target.height}px`
    event.target.parentNode.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const drawingUtils = new DrawingUtils(ctx)
    for (const landmarks of result.faceLandmarks) {
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
        color: '#C0C0C070',
        lineWidth: 1,
      })
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
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, {
        color: '#30FF30',
      })
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
    drawMasking(result.faceBlendshapes)
  }
  catch (err) {
    console.info('ERR CLOSE CAM')
    console.error(err)
  }
}
</script>

<template>
  <div
    ref="RefContent"
    class="g-page__content flex flex-wrap gap-6"
    :class="{
      'g-page__content--loading': loadingModel,
    }"
  >
    <div class="flex-1">
      <div class="img-label">Click the image to get classification!</div>
      <div class="image-container" @click.stop="($event) => runMachine($event)">
        <img
          src="https://storage.googleapis.com/mediapipe-assets/portrait.jpg"
          width="100%"
          crossorigin="anonymous"
          title="Click to get classification!"
        />
      </div>
    </div>
    <div class="blend-shapes flex-1">
      <ul ref="RefBlendShapes" class="blend-shapes-list"></ul>
    </div>
  </div>
</template>
