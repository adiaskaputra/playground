import tensorflow as tf
import tensorflow_hub as hub
from tensorflow.keras import layers

# Cek versi TensorFlow & TensorFlow Hub
print("TF Version:", tf.__version__)
print("TF Hub Version:", hub.__version__)

# Load EfficientNet-Lite0 sebagai feature extractor
efficientnet_lite0 = hub.KerasLayer(
    "https://tfhub.dev/tensorflow/efficientnet/lite0/feature-vector/2",
    input_shape=(224, 224, 3),  # Sesuaikan input shape
    trainable=False  # Freeze pretrained weights
)

# Definisi model menggunakan Functional API (Menghindari error Sequential)
inputs = tf.keras.Input(shape=(224, 224, 3))
x = efficientnet_lite0(inputs)  # Feature extractor
x = layers.Dense(128, activation='relu')(x)  # Fully connected layer
x = layers.Dropout(0.5)(x)  # Regularisasi
outputs = layers.Dense(1, activation='sigmoid')(x)  # Output untuk binary classification

# Bangun model
model = tf.keras.Model(inputs, outputs)

# Compile model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Print model summary
model.summary()
