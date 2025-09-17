

// Track the status of your AI model
type ModelState = 'idle' | 'loading' | 'loaded' | 'error';

export interface ImageUpload {
    file: File | null;               // The uploaded file
    previewUrl: string | null;       // URL for image preview
    isValid: boolean;                // Is it a valid image?
    error: string | null;            // Upload error message
  }

// Overall application state
export interface AppState {
    model: ModelState;
    image: ImageUpload;
    prediction: PredictionResult | null;
    isProcessing: boolean;           // Currently analyzing image?
  }

// Core prediction result from your model
export interface PredictionResult {
    className: 'cat' | 'dog' | 'uncertain';
    confidence: number;              // 0-1 (e.g., 0.94 = 94%)
    message: string;                 // Human-readable result
  }

// App configuration
export interface AppConfig {
    MODEL_URL: string;               // Path to your model
    CONFIDENCE_THRESHOLD: number;    // Minimum confidence (e.g., 0.7)
    MAX_FILE_SIZE: number;          // Max image size in bytes
    ACCEPTED_FORMATS: string[];      // Allowed image types
  }
  
// Default config
export const DEFAULT_CONFIG: AppConfig = {
    MODEL_URL: '/web_model/model.json',
    CONFIDENCE_THRESHOLD: 0.7,       // 70% confidence minimum
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB max
    ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp']
  };
