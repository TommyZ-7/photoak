'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ImagePosition {
  x: number;
  y: number;
}

const LocalImageCanvas: React.FC = () => {
  // Image-related state management
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  
  // References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Canvas size
  const CANVAS_WIDTH = 750;
  const CANVAS_HEIGHT = 1050;

  // Image selection handler
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Reset scale and position after file selection
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  // Image drawing function
  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Exit if no image is selected
    if (!selectedImage) return;

    // Read image using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = imageRef.current;
      img.onload = () => {
        // Calculate original image aspect ratio
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight;

        // Scale while maintaining aspect ratio
        if (imgAspectRatio > canvasAspectRatio) {
          // Image is wider than canvas
          drawWidth = canvas.width * imageScale;
          drawHeight = drawWidth / imgAspectRatio;
        } else {
          // Image is taller than canvas
          drawHeight = canvas.height * imageScale;
          drawWidth = drawHeight * imgAspectRatio;
        }

        // Position adjustment
        const drawX = imagePosition.x + (canvas.width - drawWidth) / 2;
        const drawY = imagePosition.y + (canvas.height - drawHeight) / 2;

        // Draw image
        context.drawImage(
          img, 
          drawX, 
          drawY, 
          drawWidth, 
          drawHeight
        );
      };

      // Set image source
      img.src = e.target?.result as string;
    };

    // Read image file
    reader.readAsDataURL(selectedImage);
  };

  // Redraw image when selection or position/scale changes
  useEffect(() => {
    if (selectedImage) {
      drawImageOnCanvas();
    }
  }, [selectedImage, imagePosition, imageScale]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-center">
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*" 
          onChange={handleImageSelect}
          className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
        
        {selectedImage && (
          <div className="flex items-center space-x-1">
            <label htmlFor="scale">Zoom/Shrink:</label>
            <input 
              type="range" 
              id="scale"
              min="0.1" 
              max="2" 
              step="0.1" 
              value={imageScale}
              onChange={(e) => setImageScale(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="flex space-x-2 items-center">
          <div className="flex items-center space-x-1">
            <label>Position Adjustment:</label>
            <button 
              onClick={() => setImagePosition(prev => ({ ...prev, y: prev.y - 10 }))}
              className="p-1 bg-blue-100 rounded"
            >
              ↑
            </button>
            <button 
              onClick={() => setImagePosition(prev => ({ ...prev, y: prev.y + 10 }))}
              className="p-1 bg-blue-100 rounded"
            >
              ↓
            </button>
            <button 
              onClick={() => setImagePosition(prev => ({ ...prev, x: prev.x - 10 }))}
              className="p-1 bg-blue-100 rounded"
            >
              ←
            </button>
            <button 
              onClick={() => setImagePosition(prev => ({ ...prev, x: prev.x + 10 }))}
              className="p-1 bg-blue-100 rounded"
            >
              →
            </button>
          </div>
        </div>
      )}
      
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT} 
        className="border border-gray-300 bg-gray-50"
        style={{ maxWidth: '100%', backgroundColor: 'white' }}
      >
        Your browser does not support Canvas.
      </canvas>
    </div>
  );
};

export default LocalImageCanvas;