import React, { useState } from 'react';
import StrategyContent from './StrategyContent';
import './GameStrategies.css';

const GameStrategies = () => {
  const [activeStrategy, setActiveStrategy] = useState(null);

  const strategies = [
    "Silly Strong Favourites",
    "Upside Down Taxi",
    "Powder Keg",
    "The Singularity",
    "The Apocalypse",
    "Higher or Lower",
    "Half-time Alarm Clock",
    "Golden Hour",
    "Blitz Relay",
    "Hot Shot Passive",
    "The Glory Supporter",
    "Correct Score Killer",
    "The Atomic Bomb",
    "Live Draw Dividend"
  ];

  const handleDownload = () => {
    alert("Download started...");
  };

  return (
    <div className="gameStrategies__container">
      <div className="gameStrategies__header">
        <h1 className="gameStrategies__title">Game Strategies</h1>
        {/* <button 
          onClick={handleDownload}
          className="gameStrategies__downloadBtn"
        >
          <i className="bi bi-download"></i>
          <span>Download Strategies</span>
        </button> */}
      </div>

      <div className="gameStrategies__content">
        <div className="gameStrategies__sidebar">
          {strategies.map((strategy, index) => (
            <button
              key={index}
              className={`gameStrategies__strategyBtn ${activeStrategy === strategy ? 'active' : ''}`}
              onClick={() => setActiveStrategy(strategy)}
            >
              {strategy}
            </button>
          ))}
        </div>

        <div className="gameStrategies__mainContent">
          {activeStrategy ? (
            <StrategyContent strategy={activeStrategy} />
          ) : (
            <div className="gameStrategies__placeholder">
              Select a strategy to view its details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStrategies;