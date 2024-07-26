export const createSquareImageDataURL = (imageSrc, size = 150) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";  // This is necessary if loading images from a different domain
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        
        const scaleFactor = Math.max(size / img.width, size / img.height);
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;
        
        const offsetX = (size - scaledWidth) / 2;
        const offsetY = (size - scaledHeight) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };