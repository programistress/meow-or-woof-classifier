import * as tf from '@tensorflow/tfjs';
import { DEFAULT_CONFIG, PredictionResult } from '../types';

class AIService {
    private model: tf.LayersModel | null = null; // either a TensorFlow model OR null
    private isModelLoaded = false;

    // Load the model from the default config
    async loadModel(): Promise<void> { // returms nothing but takes time to complete
        try {
            this.model = await tf.loadLayersModel(DEFAULT_CONFIG.MODEL_URL);
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
          } catch (error) {
            console.error('Failed to load model:', error);
            throw new Error('Failed to load AI model');
          }
    }

    //resize and normalize the image before feeding it to the model
    private async preprocessImage(imageFile: File): Promise<tf.Tensor> {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            
            canvas.width = 224;
            canvas.height = 224;
            
            ctx.drawImage(img, 0, 0, 224, 224);
            
            // convert to tensor and normalize
            const tensor = tf.browser.fromPixels(canvas) //converts the canvas image into a 3D array of numbers
              .resizeNearestNeighbor([224, 224]) //resizes the image to 224x224 pixels
              .toFloat() // converts whole numbers to decimal numbers
              .div(255.0) //normalizes the image to 0-1 // divides every number by 255
              .expandDims(0); //adds a new dimension to the tensor
            
            resolve(tensor);
          };
          img.src = URL.createObjectURL(imageFile);
        });
    }

    async predict(imageFile: File): Promise<PredictionResult> {
        if (!this.isModelLoaded || !this.model) {
          throw new Error('Model not loaded');
        }
      
        // preprocess image
        const tensor = await this.preprocessImage(imageFile);
        
        // make prediction
        const prediction = this.model.predict(tensor) as tf.Tensor;
        const probabilities = await prediction.data(); //the result is typically two numbers: [cat_probability, dog_probability]
        
        // process results
        const catProbability = probabilities[0];
        const dogProbability = probabilities[1];
        
        const isCat = catProbability > dogProbability;
        const confidence = Math.max(catProbability, dogProbability);
        
        // clean up tensors
        tensor.dispose();
        prediction.dispose();
      
        return {
          className: confidence < DEFAULT_CONFIG.CONFIDENCE_THRESHOLD 
            ? 'uncertain' 
            : (isCat ? 'cat' : 'dog'),
          confidence,
          message: this.generateMessage(isCat ? 'cat' : 'dog', confidence)
        };
    }

    private generateMessage(className: string, confidence: number): string {
        const messages = {
          cat: [
            "That's definitely a cute kitty! 🐱 Meow!",
            "Purr-fect! It's a cat! 🐱",
            "I see whiskers and adorableness - it's a cat! 😸"
          ],
          dog: [
            "That's a good doggo right there! 🐶 Woof!",
            "Woof woof! Definitely a dog! 🐕",
            "Tail-wagging confirmed - it's a dog! 🐶"
          ]
        };
        
        const messageArray = messages[className as keyof typeof messages];
        return messageArray[Math.floor(Math.random() * messageArray.length)];
    }

    isLoaded(): boolean {
        return this.isModelLoaded;
    }
}

export const aiService = new AIService();