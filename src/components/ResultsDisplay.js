const ResultsDisplay = ({ guesses, gameState }) => {
    return (
      <div>
        <h2>Guesses: {guesses.length}/6</h2>
        <ul>
          {guesses.map((guess, index) => (
            <li key={index}>{guess}</li>
          ))}
        </ul>
        {gameState !== 'playing' && (
          <p>{gameState === 'won' ? 'You won!' : 'Game over!'}</p>
        )}
      </div>
    );
  };

export default ResultsDisplay;