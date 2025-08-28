# Fast Api for classifying event images and match with artists

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
import numpy as np
import cv2
from io import BytesIO
from PIL import Image

import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import img_to_array

import joblib
import os
import logging

# Setup logging format and level
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s [%(levelname)s] %(message)s")

# -----------------------------
# ✅ CONFIG
# -----------------------------
IMAGE_SIZE = (224, 224)
FEATURES_FOLDER = "./"

# -----------------------------
# ✅ Load DL feature extractor
# -----------------------------
logging.info("Loading EfficientNetB0 feature extractor model...")
base_model = EfficientNetB0(weights='imagenet', include_top=False, pooling='avg', input_shape=(224, 224, 3))
feature_extractor = Model(inputs=base_model.input, outputs=base_model.output)
logging.info("Feature extractor loaded.")

# -----------------------------
# ✅ Load sklearn pipeline + label encoder + PCA
# -----------------------------
logging.info("Loading sklearn pipeline and label encoder...")
pipeline = joblib.load(os.path.join(FEATURES_FOLDER, "svm_pipeline.pkl"))
logging.debug(f"Pipeline steps: {list(pipeline.named_steps.keys())}")

pca = joblib.load(os.path.join(FEATURES_FOLDER, "pca_256.pkl"))
le = joblib.load(os.path.join(FEATURES_FOLDER, "label_encoder.pkl"))
SELECTED_CLASSES = le.classes_
logging.info(f"Loaded label encoder with classes: {SELECTED_CLASSES}")

# -----------------------------
# ✅ Setup FastAPI app
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ✅ Preprocessing helpers
# -----------------------------
def apply_clahe_rgb(img):
    logging.debug("Applying CLAHE to image...")
    lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    final = cv2.cvtColor(limg, cv2.COLOR_LAB2RGB)
    return final

def preprocess_image(img):
    logging.debug("Preprocessing image (BGR to RGB, resize, CLAHE)...")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, IMAGE_SIZE)
    img = apply_clahe_rgb(img)
    return img

# -----------------------------
# ✅ /predict-event endpoint
# -----------------------------
@app.post("/predict-event")
async def predict_event(file: UploadFile = File(...)):
    contents = await file.read()
    image = np.array(Image.open(BytesIO(contents)).convert("RGB"))
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    image = preprocess_image(image)

    arr = img_to_array(image)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)

    # Extract features (shape: (1, 1280))
    features = feature_extractor.predict(arr, verbose=0).flatten().reshape(1, -1)
    print(f"[DEBUG] Extracted features shape: {features.shape}")

    # Use full pipeline directly
    pred = pipeline.predict(features)[0]
    prob = pipeline.predict_proba(features)[0]

    class_name = SELECTED_CLASSES[int(pred)]
    confidence = np.max(prob) * 100

    print(f"[DEBUG] Predicted class: {class_name} with confidence {confidence:.2f}%")

    return JSONResponse({
        "event_class": class_name,
        "confidence": f"{confidence:.2f}%"
    })


# -----------------------------
# ✅ Local run
# -----------------------------
if __name__ == "__main__":
    logging.info("Starting FastAPI server on http://127.0.0.1:8000")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
