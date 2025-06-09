import type { ImageClassifierOptions as ImageClassifierOptionsType } from '@mediapipe/tasks-vision'
import { ImageClassifier, FilesetResolver } from '@mediapipe/tasks-vision'

export const useImageClassification = (config: ImageClassifierOptionsType = {}) => {
  const runningMode = ref<'IMAGE' | 'VIDEO'>('IMAGE')
  const loadingModel = ref(false)
  const detector = shallowRef<ImageClassifier>()

  const loadModel = async () => {
    try {
      loadingModel.value = true
      const vision = await FilesetResolver.forVisionTasks('/tasks-vision/wasm/')
      detector.value = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/image-classification.tflite',
          delegate: 'GPU',
        },
        runningMode: runningMode.value,
        ...config,
      })
      loadingModel.value = false
    }
    catch (err) {
      loadingModel.value = false
      console.info('ERR LOAD MODEL GESTURE RECOGNITION')
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
