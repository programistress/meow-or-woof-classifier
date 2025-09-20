import * as tf from '@tensorflow/tfjs';
import { DEFAULT_CONFIG, PredictionResult } from '../types';

class AIService {
    private model: tf.LayersModel | tf.GraphModel | null = null;
    private isModelLoaded = false;

    // Load the model
    async loadModel(): Promise<void> {
        try {
            console.log('Loading model...');
            
            // Try LayersModel first, then GraphModel if that fails
            try {
                this.model = await tf.loadLayersModel(DEFAULT_CONFIG.MODEL_URL);
            } catch {
                this.model = await tf.loadGraphModel(DEFAULT_CONFIG.MODEL_URL);
            }
            
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
            
        } catch (error) {
            console.error('Failed to load model:', error);
            throw new Error('Failed to load AI model');
        }
    }

    // Preprocess image for the model
    private async preprocessImage(imageFile: File): Promise<tf.Tensor> {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;
                
                canvas.width = 224;
                canvas.height = 224;
                ctx.drawImage(img, 0, 0, 224, 224);
                
                // Convert to tensor and normalize
                const tensor = tf.browser.fromPixels(canvas)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .div(255.0)
                    .expandDims(0);
                
                resolve(tensor);
            };
            img.src = URL.createObjectURL(imageFile);
        });
    }

    // Make prediction
    async predict(imageFile: File): Promise<PredictionResult> {
        if (!this.isModelLoaded || !this.model) {
            throw new Error('Model not loaded');
        }
      
        const tensor = await this.preprocessImage(imageFile);
        
        try {
            // Make prediction
            const prediction = this.model.predict(tensor) as tf.Tensor;
            const probabilities = await prediction.data();
            
            // Handle different output formats
            let catProbability: number;
            let dogProbability: number;
            
            if (probabilities.length === 1) {
                // Single output (0=cat, 1=dog)
                dogProbability = probabilities[0];
                catProbability = 1 - dogProbability;
            } else {
                // Two outputs [cat, dog]
                catProbability = probabilities[0];
                dogProbability = probabilities[1];
            }
            
            const isCat = catProbability > dogProbability;
            const confidence = Math.max(catProbability, dogProbability);
            
            // Clean up
            tensor.dispose();
            prediction.dispose();
          
            return {
                className: confidence < DEFAULT_CONFIG.CONFIDENCE_THRESHOLD 
                    ? 'uncertain' 
                    : (isCat ? 'cat' : 'dog'),
                confidence,
                message: this.generateMessage(isCat ? 'cat' : 'dog', confidence)
            };
            
        } catch (error) {
            tensor.dispose();
            throw new Error('Prediction failed');
        }
    }

    // Generate fun messages
    private generateMessage(className: string, confidence: number): string {
        const messages = {
            cat: [
                "That's definitely a cute kitty! 🐱",
                "Purr-fect! It's a cat! 🐱",
                "I see whiskers and adorableness! 😸"
            ],
            dog: [
                "That's a good doggy! 🐶",
                "Woof woof! Definitely a dog! 🐕",
                "Tail-wagging confirmed! 🐶"
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