import React, { useCallback, useState } from 'react';
import { ImageUpload as ImageUploadType, DEFAULT_CONFIG } from '../types';

// prop type 
interface ImageUploadProps {
  onImageUpload: (imageData: ImageUploadType) => void;
  currentImage: ImageUploadType;
}

const ImageUploadComponent: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // validating file type and size
  // takes a file and returns an object with isValid and error
  const validateFile = (file: File): { isValid: boolean; error: string | null } => {
    if (!DEFAULT_CONFIG.ACCEPTED_FORMATS.includes(file.type)) {
      return {
        isValid: false,
        error: `Please upload a valid image file (${DEFAULT_CONFIG.ACCEPTED_FORMATS.join(', ')})`
      };
    }

    if (file.size > DEFAULT_CONFIG.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File size must be less than ${DEFAULT_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`
      };
    }

    return { isValid: true, error: null };
  };

  // if the file is valid, it creates a preview URL and calls the onImageUpload function
  // if the file is not valid, it calls the onImageUpload function with the error
  const handleFile = useCallback((file: File) => {
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      onImageUpload({
        file: null,
        previewUrl: null,
        isValid: false,
        error: validation.error
      });
      return;
    }

    // creating preview URL
    const previewUrl = URL.createObjectURL(file);
    
    onImageUpload({
      file,
      previewUrl,
      isValid: true,
      error: null
    });

  }, [onImageUpload]);


  // ********** DRAG AND DROP FUNCTIONS **********
  // when the user drops a file on the upload area, it sets the isDragOver state to false and calls the handleFile function
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  // when the user drags over the upload area, it sets the isDragOver state to true
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  // when the user drags out of the upload area, it sets the isDragOver state to false
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);


  // ********** MANUAL FILE SELECT FUNCTIONS **********
  // when the user selects a file, it calls the handleFile function
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  // when the user clicks on the upload area, it opens the file input
  const handleClick = () => {
    const input = document.getElementById('file-input') as HTMLInputElement;
    input.click();
  };


  // when the user clicks on the remove image button, it revokes the object URL and calls the onImageUpload function
  const removeImage = () => {
    if (currentImage.previewUrl) {
      URL.revokeObjectURL(currentImage.previewUrl);
    }
    onImageUpload({
      file: null,
      previewUrl: null,
      isValid: false,
      error: null
    });
  };

  return (
    <div>
      {!currentImage.previewUrl ? (
        <div
          className={`upload-area ${isDragOver ? 'dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <span className="upload-icon">📷</span>
          <div className="upload-text">
            Drop your cute pet photo here
          </div>
          <div className="upload-subtext">
            or click to browse • JPG, PNG, WebP • Max 10MB
          </div>
          <input
            id="file-input" // so handleClick can find it 
            type="file" //makes it a file picker
            accept={DEFAULT_CONFIG.ACCEPTED_FORMATS.join(',')}
            onChange={handleFileSelect}
            className="hidden-input"
          />
        </div>
      ) : (
        <div className="preview-container">
          <img
            src={currentImage.previewUrl}
            className="preview-image"
          />
          <br />
          <button
            onClick={removeImage}
            className="remove-button"
          >
            Remove Image 🗑️
          </button>
        </div>
      )}
      
      {currentImage.error && (
        <div className="error-message">
          {currentImage.error}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
