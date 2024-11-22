'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropperClient = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCroppedImage(null);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSelectedImage(reader.result?.toString() || null);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createCroppedImage = () => {
    if (!imageRef.current || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };

  const reset = () => {
    setSelectedImage(null);
    setCroppedImage(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="mb-4"
      />

      {selectedImage && !croppedImage && (
        <div className="w-full max-w-2xl">
          <div className="border rounded-lg overflow-hidden">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Upload"
                className="max-h-[600px] w-auto"
              />
            </ReactCrop>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={createCroppedImage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={!completedCrop}
            >
              トリミングを確定
            </button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <img 
            src={croppedImage} 
            alt="Cropped" 
            className="max-w-[300px] rounded-lg shadow-lg"
          />
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              リセット
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropperClient;