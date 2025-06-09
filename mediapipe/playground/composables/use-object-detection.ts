import type { ObjectDetectorOptions as ObjectDetectorOptionsType } from '@mediapipe/tasks-vision'
import { ObjectDetector, FilesetResolver } from '@mediapipe/tasks-vision'

export const useObjectDetection = (config: ObjectDetectorOptionsType) => {
  const runningMode = ref<'IMAGE' | 'VIDEO'>('IMAGE')
  const loadingModel = ref(false)
  const detector = shallowRef<ObjectDetector>()

  const loadModel = async () => {
    try {
      loadingModel.value = true
      const vision = await FilesetResolver.forVisionTasks('/tasks-vision/wasm/')
      detector.value = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/object-detection.tflite',
          delegate: 'GPU',
        },
        runningMode: runningMode.value,
        scoreThreshold: 0.5,
        ...config,
      })
      loadingModel.value = false
    }
    catch (err) {
      loadingModel.value = false
      console.info('ERR LOAD MODEL OBJECT DETECTION')
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
