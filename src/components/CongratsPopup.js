import React, { useState, useEffect } from 'react';
import { createSquareImageDataURL } from '../ImageUtils';

const CongratsPopup = ({ guessCount, imageSrc, onClose }) => {
  const [squareImageSrc, setSquareImageSrc] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  const WEBSITE_URL = "https://yourpixelpuzzlewebsite.com";


  useEffect(() => {
    createSquareImageDataURL(imageSrc)
      .then((result) => setSquareImageSrc(result))
      .catch(error => console.error('Error creating square image:', error));
  }, [imageSrc]);

  const handleShare = () => {
    const shareText = `PixelPuzzle ${guessCount}/6\n${generateEmoji(guessCount)}\n${WEBSITE_URL}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShareMessage('Result copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000); // Clear message after 3 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
      setShareMessage('Failed to copy. Please try again.');
      setTimeout(() => setShareMessage(''), 3000);
    });
  };

  const generateEmoji = (count) => {
    const filledSquares = '🟩'.repeat(count);
    const emptySquares = '⬜'.repeat(6 - count);
    return filledSquares + emptySquares;
  };

  return (
    <div className="congrats-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Congratulations!</h2>
        <p>You solved the puzzle in {guessCount} guesses.</p>
        <div className="image-wrapper">
          {squareImageSrc ? (
            <img src={squareImageSrc} alt="Puzzle solution" className="revealed-image" />
          ) : (
            <div>Loading image...</div>
          )}
        </div>
        <button className="share-button" onClick={handleShare}>Share</button>
        {shareMessage && <p className="share-message">{shareMessage}</p>}
      </div>
    </div>
  );
};

export default CongratsPopup;