import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import { ImageUpload as ImageUploadType } from './types';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageUploadType>({
    file: null,
    previewUrl: null,
    isValid: false,
    error: null
  });

  const handleImageUpload = (imageData: ImageUploadType) => {
    setCurrentImage(imageData);
    console.log('Image uploaded:', imageData);
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
        
        {currentImage.isValid && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '10px' }}>
            <h3>Upload Success! 🎉</h3>
            <p>File: {currentImage.file?.name}</p>
            <p>Size: {currentImage.file ? Math.round(currentImage.file.size / 1024) : 0} KB</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
