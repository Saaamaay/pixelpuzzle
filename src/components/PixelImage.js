import React, { useEffect, useRef } from 'react';

const PixelImage = ({ imageSrc, guessCount }) => {
  const canvasRef = useRef(null);
  const targetWidth = 600;
  const targetHeight = 600;
  const maxPixelSize = 60;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Draw the image first
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Then apply pixelation
      const pixelSize = Math.max(maxPixelSize - guessCount * 10, 1);
      pixelate(ctx, targetWidth, targetHeight, pixelSize);
    };
    
    img.src = imageSrc;
  }, [imageSrc, guessCount]); // Make sure guessCount is in the dependency array

  const pixelate = (ctx, width, height, pixelSize) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        // Get the color of the first pixel in the square
        const red = imageData.data[((y * width) + x) * 4];
        const green = imageData.data[((y * width) + x) * 4 + 1];
        const blue = imageData.data[((y * width) + x) * 4 + 2];

        // Draw a pixelSize x pixelSize square with that color
        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  };

  return <canvas ref={canvasRef} style={{display: 'block', margin: 'auto', maxWidth: '100%', height: 'auto'}} />;
};

export default PixelImage;