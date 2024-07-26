import React, { useEffect, useRef } from 'react';

const PixelImage = ({ imageSrc, guessCount }) => {
  const canvasRef = useRef(null);
  const targetWidth = 600;
  const targetHeight = 600;
  const maxPixelSize = 50; // Reduced from 60
  const minPixelSize = 2; // Added minimum pixel size

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // New pixelSize calculation for a more gradual progression
      const pixelSize = Math.max(
        minPixelSize,
        Math.round(maxPixelSize * Math.pow(0.78, guessCount))
      );
      
      pixelate(ctx, targetWidth, targetHeight, pixelSize);
    };
    
    img.src = imageSrc;
  }, [imageSrc, guessCount]);

  const pixelate = (ctx, width, height, pixelSize) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const red = imageData.data[((y * width) + x) * 4];
        const green = imageData.data[((y * width) + x) * 4 + 1];
        const blue = imageData.data[((y * width) + x) * 4 + 2];

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  };

  return <canvas ref={canvasRef} style={{display: 'block', margin: 'auto', maxWidth: '100%', height: 'auto'}} />;
};

export default PixelImage;