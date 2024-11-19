// StrategyContent.jsx
import React, { useState } from 'react';
import { strategyData } from './strategyData';

const StrategyContent = ({ strategy }) => {
  const [language, setLanguage] = useState('en');
  const data = strategyData[strategy];

  if (!data) {
    return (
      <div className="strategyContent__container">
        <p>Content for this strategy is coming soon...</p>
      </div>
    );
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <div className="strategyContent__container">
      <div className="strategyContent__header">
        <div className="strategyContent__titleRow">
          <h2 className="strategyContent__title">{data.title}</h2>
          <button 
            onClick={toggleLanguage} 
            className="strategyContent__languageToggle"
          >
            {language === 'en' ? 'Deutsch' : 'English'}
          </button>
        </div>
        <div className="strategyContent__meta">
          <span className="strategyContent__tag">
            {language === 'en' ? 'Market: ' + data.market : 'Markt: ' + data.marketDe}
          </span>
          <span className="strategyContent__tag">
            {language === 'en' ? 'Type: ' + data.type : 'Typ: ' + data.typeDe}
          </span>
        </div>
      </div>

      <div className="strategyContent__body">
        {data.sections[language].map((section, index) => (
          <div key={index} className="strategyContent__section">
            <h3 className="strategyContent__sectionTitle">{section.heading}</h3>
            {section.content && (
              <p className="strategyContent__text">{section.content}</p>
            )}
            {section.bullets && (
              <ul className="strategyContent__bulletList">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="strategyContent__bulletItem">{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategyContent;