import React, { useState } from 'react';
import PixelImage from './components/PixelImage';
import GuessInput from './components/GuessInput';
import ResultsDisplay from './components/ResultsDisplay';
import CongratsPopup from './components/CongratsPopup';
import GameOverPopup from './components/GameOverPopup';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);

  const defaultImage = '/default-image.jpg';
  const correctAnswer = 'cat';

  const handleGuess = (guess) => {
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    if (guess.toLowerCase() === correctAnswer) {
      setGameState('won');
      setShowCongratsPopup(true);
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
      setShowGameOverPopup(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PixelPuzzle</h1>
        {/* Future icons can go here */}
        {/* <button className="help-icon">?</button> */}
        {/* <button className="hint-icon">💡</button> */}
      </header>
      <main className="App-main">
        <div className="game-container">
          <PixelImage imageSrc={defaultImage} guessCount={guesses.length} />
          <div className="guess-input">
            <GuessInput onGuess={handleGuess} disabled={gameState !== 'playing'} />
          </div>
        </div>
        <div className="guesses-box">
          <ResultsDisplay guesses={guesses} gameState={gameState} />
        </div>
      </main>
      {showCongratsPopup && (
        <CongratsPopup 
          guessCount={guesses.length}
          imageSrc={defaultImage}
          onClose={() => setShowCongratsPopup(false)}
        />
      )}
      {showGameOverPopup && (
        <GameOverPopup
          guessCount={guesses.length}
          correctAnswer={correctAnswer}
          imageSrc={defaultImage}
          onClose={() => setShowGameOverPopup(false)}
        />
      )}
    </div>
  );
}

export default App;