import React, { useState, useEffect } from 'react';
import { createSquareImageDataURL } from '../ImageUtils';

const GameOverPopup = ({ guessCount, correctAnswer, imageSrc, onClose }) => {
  const [squareImageSrc, setSquareImageSrc] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  const WEBSITE_URL = "https://yourpixelpuzzlewebsite.com";


  useEffect(() => {
    createSquareImageDataURL(imageSrc)
      .then((result) => setSquareImageSrc(result))
      .catch(error => console.error('Error creating square image:', error));
  }, [imageSrc]);

  const handleShare = () => {
    const shareText = `PixelPuzzle X/6\n${generateEmoji()}\n${WEBSITE_URL}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShareMessage('Result copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000); // Clear message after 3 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
      setShareMessage('Failed to copy. Please try again.');
      setTimeout(() => setShareMessage(''), 3000);
    });
  };

  const generateEmoji = () => {
    return '🟥'.repeat(6); // Use red squares to indicate failure
  };

  return (
    <div className="game-over-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Game Over</h2>
        <p>The correct answer was: {correctAnswer}</p>
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

export default GameOverPopup;