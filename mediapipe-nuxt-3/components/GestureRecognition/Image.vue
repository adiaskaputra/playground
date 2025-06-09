<script setup lang="ts">
import { GestureRecognizer, DrawingUtils } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: GestureRecognizer | undefined
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

const images = ref([
  {
    url: 'https://assets.codepen.io/9177687/idea-gcbe74dc69_1920.jpg',
  },
  {
    url: 'https://assets.codepen.io/9177687/thumbs-up-ga409ddbd6_1.png',
  },
])

function drawMasking(event, results) {
  try {
    if (results.gestures.length <= 0) return

    const p = event.target.parentNode.childNodes[1]
    p.setAttribute('class', 'info')
    const categoryName = results.gestures[0][0].categoryName
    const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2)
    const handedness = results.handednesses[0][0].displayName
    p.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`
    p.style
      = 'left: 0px;'
      + 'top: '
      + event.target.height
      + 'px; '
      + 'width: '
      + (event.target.width - 10)
      + 'px;'
    const canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'canvas')
    canvas.setAttribute('width', event.target.naturalWidth + 'px')
    canvas.setAttribute('height', event.target.naturalHeight + 'px')
    canvas.style
      = 'left: 0px;'
      + 'top: 0px;'
      + 'width: '
      + event.target.width
      + 'px;'
      + 'height: '
      + event.target.height
      + 'px;'

    event.target.parentNode.appendChild(canvas)
    const canvasCtx = canvas.getContext('2d')
    const drawingUtils = new DrawingUtils(canvasCtx)
    for (const landmarks of results.landmarks) {
      drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5,
      })
      drawingUtils.drawLandmarks(landmarks, {
        color: '#FF0000',
        lineWidth: 1,
      })
    }
  }
  catch (err) {
    console.info('ERR DRAW MASKING')
    console.error(err)
  }
}

async function runMachine(event) {
  try {
    if (!props.detector) {
      alert('Please wait for gestureRecognizer to load')
      return
    }
    if (mode.value === 'VIDEO') {
      mode.value = 'IMAGE'
      await props.detector.setOptions({ runningMode: 'IMAGE' })
    }

    // Remove all previous landmarks
    const allCanvas = event.target.parentNode.getElementsByClassName('canvas')
    for (let i = allCanvas.length - 1; i >= 0; i--) {
      const n = allCanvas[i]
      n.parentNode.removeChild(n)
    }
    const results = props.detector.recognize(event.target)
    drawMasking(event, results)
  }
  catch (err) {
    console.info('ERR RUN MACHINE')
    console.error(err)
  }
}
</script>

<template>
  <div
    ref="RefContent"
    class="g-page__content flex-wrap justify-center gap-6"
    :class="{
      'g-page__content--loading': loadingModel,
    }"
  >
    <div v-for="(item, i) in images" :key="`image-${i}`" class="max-w-[50%] flex-1">
      <div class="img-label">Click to get classification!</div>
      <div class="image-container" @click.stop="($event) => runMachine($event)">
        <img
          :src="item.url"
          width="100%"
          crossorigin="anonymous"
          title="Click to get classification!"
        />
        <p class="classification"></p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
