import React from 'react';

const CongratsPopup = ({ guessCount, onShare, onClose }) => {
  const handleShare = () => {
    const result = `PixelPuzzle ${guessCount}/6\n${'🟩'.repeat(guessCount)}${'⬜'.repeat(6-guessCount)}`;
    navigator.clipboard.writeText(result).then(() => {
      alert('Result copied to clipboard!');
    });
    if (onShare) onShare();
  };

  return (
    <div className="congrats-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Congratulations!</h2>
        <p>You solved the puzzle in {guessCount} guesses.</p>
        <button className="share-button" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default CongratsPopup;