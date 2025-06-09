import type { ImageEmbedderOptions as ImageEmbedderOptionsType } from '@mediapipe/tasks-vision'
import { ImageEmbedder, FilesetResolver } from '@mediapipe/tasks-vision'

export const useImageEmbedding = (config: ImageEmbedderOptionsType = {}) => {
  const runningMode = ref<'IMAGE' | 'VIDEO'>('IMAGE')
  const loadingModel = ref(false)
  const detector = shallowRef<ImageEmbedder>()

  const loadModel = async () => {
    try {
      loadingModel.value = true
      const vision = await FilesetResolver.forVisionTasks('/tasks-vision/wasm/')
      detector.value = await ImageEmbedder.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/image-embedding.tflite',
          delegate: 'GPU',
        },
        runningMode: runningMode.value,
        ...config,
      })
      loadingModel.value = false
    }
    catch (err) {
      loadingModel.value = false
      console.info('ERR LOAD MODEL IMAGE EMBEDDING')
      console.error(err)
    }
  }

  onMounted(async () => {
    if (!detector.value) {
      await loadModel()
    }
  })

  return {
    runningMode,
    loadingModel,
    detector,
  }
}
