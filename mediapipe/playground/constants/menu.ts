import type { IMenu } from '@/types/index'

export const MENU: { [key: string]: IMenu[] } = {
  landing: [
    {
      label: 'Face Detection',
      caption: 'Plugin for landing soon',
      path: 'face-detection',
    },
  ],
  detection: [
    {
      label: 'Face Detection',
      caption: 'Detect faces',
      path: 'face-detection',
    },
    {
      label: 'Face Landmark',
      caption: 'Detect face landmarks and facial expressions',
      path: 'face-landmark',
    },
    {
      label: 'Gesture Recognition',
      caption: 'Recognize hand gestures in real time.',
      path: 'gesture-recognition',
    },
    {
      label: 'Pose Recognition',
      caption: 'Recognize body gestures in real time.',
      path: 'pose-recognition',
    },
    {
      label: 'Image Classification',
      caption: 'Perform classification on images',
      path: 'image-classification',
    },
    {
      label: 'Object Detection',
      caption: 'Representing an object identified',
      path: 'object-detection',
    },
  ],
  tool: [
    {
      label: 'Image Embedding',
      caption: 'Comparing the similarity of two images',
      path: 'image-embedding',
    },
  ],
}
