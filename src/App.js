import React, { useState } from 'react';
import PixelImage from './components/PixelImage';
import GuessInput from './components/GuessInput';
import ResultsDisplay from './components/ResultsDisplay';
import CongratsPopup from './components/CongratsPopup';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [showPopup, setShowPopup] = useState(false);

  const defaultImage = '/default-image.jpg';
  const correctAnswer = 'cat';

  const handleGuess = (guess) => {
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    if (guess.toLowerCase() === correctAnswer) {
      setGameState('won');
      setShowPopup(true);
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
    }
  };

  return (
    <div className="App">
      <h1>PixelPuzzle</h1>
      <div className="game-container">
        <PixelImage imageSrc={defaultImage} guessCount={guesses.length} />
        <div className="guess-input">
          <GuessInput onGuess={handleGuess} disabled={gameState !== 'playing'} />
        </div>
      </div>
      <div className="guesses-box">
        <ResultsDisplay guesses={guesses} gameState={gameState} />
      </div>
      {showPopup && (
        <CongratsPopup 
          guessCount={guesses.length} 
          onClose={() => setShowPopup(false)}
          onShare={() => {/* You can add additional share logic here if needed */}}
        />
      )}
    </div>
  );
}

export default App;