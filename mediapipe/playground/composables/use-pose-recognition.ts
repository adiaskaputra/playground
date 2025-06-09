import type { PoseLandmarkerOptions as PoseLandmarkerOptionsType } from '@mediapipe/tasks-vision'
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export const usePoseRecognition = (config: PoseLandmarkerOptionsType = {}) => {
  const runningMode = ref<'IMAGE' | 'VIDEO'>('IMAGE')
  const loadingModel = ref(false)
  const detector = shallowRef<PoseLandmarker>()

  const loadModel = async () => {
    try {
      loadingModel.value = true
      const vision = await FilesetResolver.forVisionTasks('/tasks-vision/wasm/')
      detector.value = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/pose-recognition.task',
          delegate: 'GPU',
        },
        runningMode: runningMode.value,
        numPoses: 1,
        ...config,
      })
      loadingModel.value = false
    }
    catch (err) {
      loadingModel.value = false
      console.info('ERR LOAD MODEL POSE RECOGNITION')
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
