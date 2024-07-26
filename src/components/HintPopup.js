// src/components/HintPopup.js
import React from 'react';

const HintPopup = ({ hint, onClose }) => {
  return (
    <div className="hint-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Daily Hint</h2>
        <p>{hint}</p>
      </div>
    </div>
  );
};

export default HintPopup;