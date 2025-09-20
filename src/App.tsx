import { useEffect, useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import { ImageUpload as ImageUploadType, PredictionResult } from './types';
import { aiService } from './services/aiService';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageUploadType>({
    file: null,
    previewUrl: null,
    isValid: false,
    error: null
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  useEffect(() => {
    const initializeModel = async () => {
      setModelStatus('loading');
      try {
        await aiService.loadModel();
        setModelStatus('loaded');
      } catch (error) {
        setModelStatus('error');
      }
    };
  
    initializeModel();
  }, []);

  const handleImageUpload = (imageData: ImageUploadType) => {
    setCurrentImage(imageData);
    setPrediction(null); // clear previous prediction
    console.log('Image uploaded:', imageData);
  };

  const analyzeImage = async () => {
    // check if the image is valid and actually has a file
    if (!currentImage.isValid || !currentImage.file) return;
    
    setIsProcessing(true);
    
    try {
      // ensure model is loaded
      if (!aiService.isLoaded()) {
        await aiService.loadModel();
      }
      
      // Make real prediction
      const result = await aiService.predict(currentImage.file);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
      setPrediction({
        className: 'uncertain',
        confidence: 0,
        message: 'Sorry, something went wrong with the analysis. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">
          <span className="emoji">🐱</span>
          Meow or Woof?
          <span className="emoji">🐶</span>
        </h1>
        <p className="subtitle">
          Upload a photo of your adorable pet!
        </p>
      </div>

      <div className="main-content">
        {/* Model Loading State */}
        {modelStatus === 'loading' && (
          <div className="model-loading">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading AI model... 🧠</span>
            <p className="loading-subtext">Getting everything ready for you...</p>
          </div>
        )}

        {/* Model Error State */}
        {modelStatus === 'error' && (
          <div className="error-message">
            <span>❌ Failed to load AI model</span>
            <p>Please refresh the page and try again</p>
          </div>
        )}

        {/* Main App Content - Only when model is ready */}
        {modelStatus === 'loaded' && (
          <>
            <ImageUpload 
              onImageUpload={handleImageUpload}
              currentImage={currentImage}
            />

            {currentImage.isValid && currentImage.file && (
              <button
                className="analyze-button"
                onClick={analyzeImage}
                disabled={isProcessing}
              >
                {isProcessing ? 'Analyzing...' : '✨ Analyze Pet ✨'}
              </button>
            )}

            <ResultDisplay 
              result={prediction}
              isProcessing={isProcessing}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
