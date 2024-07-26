import React, { useState } from 'react';

const GuessInput = ({ onGuess, disabled }) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess.trim());
      setGuess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guess-input">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={disabled}
        placeholder="Enter your guess"
      />
      <button type="submit" disabled={disabled}>
        Guess
      </button>
    </form>
  );
};

export default GuessInput;