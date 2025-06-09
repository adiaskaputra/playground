import type { FaceDetectorOptions as FaceDetectorOptionsType } from '@mediapipe/tasks-vision'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export default defineNuxtPlugin((nuxtApp) => {
  const runningMode = ref<'IMAGE' | 'VIDEO'>('VIDEO')
  const loadingModel = ref(false)
  const detector = shallowRef<FaceLandmarker>()

  const loadModel = async (config: FaceDetectorOptionsType = {}) => {
    try {
      loadingModel.value = true
      const vision = await FilesetResolver.forVisionTasks('/tasks-vision/wasm/')
      detector.value = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/face-landmark.task',
          delegate: 'GPU',
        },
        runningMode: runningMode.value,
        numFaces: 10,
        minFaceDetectionConfidence: 0.5, // The minimum confidence score for the face detection to be considered successful.
        minFacePresenceConfidence: 0.5, // The minimum confidence score of face presence score in the face landmark detection.
        minTrackingConfidence: 0.5, // The minimum confidence score for the face tracking to be considered successful.
        outputFaceBlendshapes: true, // Whether Face Landmarker outputs face blendshapes. Face blendshapes are used for rendering the 3D face model.
        outputFacialTransformationMatrixes: false,
        // Whether FaceLandmarker outputs the facial transformation matrix.
        // FaceLandmarker uses the matrix to transform the face landmarks from a canonical face model
        // to the detected face, so users can apply effects on the detected landmarks.
        ...config,
      })
      loadingModel.value = false
      console.info('SUCCESS LOAD MODEL FACE API')
    }
    catch (err) {
      loadingModel.value = false
      console.info('ERR LOAD MODEL FACE API')
      console.error(err)
    }
  }

  nuxtApp.provide('loadingModel', loadingModel)
  nuxtApp.provide('loadModel', loadModel)
  nuxtApp.provide('faceDetector', detector)
})
