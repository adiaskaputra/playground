<script setup lang="ts">
import { ImageEmbedder } from '@mediapipe/tasks-vision'

const props = defineProps<{
  detector: ImageEmbedder | undefined
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
const RefImage1 = ref()
const RefImage2 = ref()
const similarity = ref(0)

const image1 = ref(
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThNqcZJPySuBlvmNxbmxCpIlJwJeoiFXApwNd0lVHWLjNTKfyGqEaQvVBgUZ3uBr5_MSg&usqp=CAU',
)

const image2 = ref(
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThNqcZJPySuBlvmNxbmxCpIlJwJeoiFXApwNd0lVHWLjNTKfyGqEaQvVBgUZ3uBr5_MSg&usqp=CAU',
)

async function runMachine() {
  try {
    if (!props.detector) {
      alert('Wait for image embedding to load before clicking')
      return
    }

    if (mode.value === 'VIDEO') {
      mode.value = 'IMAGE'
      await props.detector.setOptions({ runningMode: 'IMAGE' })
    }

    const imageEmbedderResult0 = props.detector.embed(RefImage1.value)
    const imageEmbedderResult1 = props.detector.embed(RefImage2.value)

    const _similarity = ImageEmbedder.cosineSimilarity(
      imageEmbedderResult0.embeddings[0],
      imageEmbedderResult1.embeddings[0],
    )
    similarity.value = _similarity
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
    class="g-page__content flex flex-wrap items-start justify-center gap-6"
    :class="{
      'g-page__content--loading': loadingModel,
    }"
  >
    <div class="flex-1 text-center">
      <UButton size="lg" class="mb-10" @click.stop="runMachine">Compare</UButton>
      <div class="img-container">
        <div>
          <div class="mb-2 font-bold">Image 1</div>
          <img ref="RefImage1" :src="image1" crossorigin="anonymous" />
        </div>
        <div>
          <div class="mb-2 font-bold">Image 2</div>
          <img ref="RefImage2" :src="image2" crossorigin="anonymous" />
        </div>
      </div>
    </div>
    <div class="flex-1">
      <div class="text-lg font-bold">Result</div>
      <div v-if="similarity">Similarity: {{ similarity }}</div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.img-container {
  @apply flex flex-wrap justify-center items-start gap-6;
  img {
    @apply w-[240px];
  }
}
</style>
