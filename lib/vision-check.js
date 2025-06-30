// It checks whether the uploaded profile image is appropriate

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

let objectDetector = null;

export async function loadCocoSsdModel() {
  if (!objectDetector) {
    objectDetector = await cocoSsd.load();
  }
}

export async function detectObjects(imageElement) {
  if (!objectDetector) {
    throw new Error("COCO-SSD model not loaded yet!");
  }
  return await objectDetector.detect(imageElement);
}
