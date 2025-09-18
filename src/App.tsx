import { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import { ImageUpload as ImageUploadType, PredictionResult } from './types';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageUploadType>({
    file: null,
    previewUrl: null,
    isValid: false,
    error: null
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null); 
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (imageData: ImageUploadType) => {
    setCurrentImage(imageData);
    setPrediction(null); // clear previous prediction
    console.log('Image uploaded:', imageData);
  };

  const simulateAnalysis = () => {
    if (!currentImage.isValid || !currentImage.file) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Create fake result for testing
      const fakeResult: PredictionResult = {
        className: Math.random() > 0.5 ? 'cat' : 'dog',
        confidence: 0.85 + Math.random() * 0.14, // Random confidence between 85-99%
        message: Math.random() > 0.5 
          ? "That's definitely a cute kitty! 🐱 Meow!" 
          : "That's a good doggo right there! 🐶 Woof!"
      };
      
      setPrediction(fakeResult);
      setIsProcessing(false);
    }, 2000); // 2 second delay
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
        <ImageUpload 
          onImageUpload={handleImageUpload}
          currentImage={currentImage}
        />

        {currentImage.isValid && currentImage.file && (
          <button
            className="analyze-button"
            onClick={simulateAnalysis}
            disabled={isProcessing} // disable button if processing
          >
            {isProcessing ? 'Analyzing...' : '✨ Analyze Pet ✨'}
          </button>
        )}

        <ResultDisplay 
          result={prediction}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

export default App;
