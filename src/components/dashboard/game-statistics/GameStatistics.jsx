import React, { useEffect } from 'react';

const GameStatistics = () => {
  useEffect(() => {
    // Function to load the widget script
    const loadWidgetScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widgets.api-sports.io/2.0.3/widgets.js';
      script.type = 'module';
      script.async = true;
      script.onload = () => {
        console.log('Widget script loaded');
        // Manually initialize the widget if necessary
        if (window.createWidget) {
          window.createWidget();
        }
      };
      
      // Append script to the body
      document.body.appendChild(script);
    };

    // Load the widget script
    loadWidgetScript();

    // Cleanup script on unmount
    return () => {
      const script = document.querySelector('script[src="https://widgets.api-sports.io/2.0.3/widgets.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Game Statistics</h1>
      
      <div id="wg-api-football-game"
           data-host="v3.football.api-sports.io"
           data-key="0885018642406d6cbefa62b9efccd592"
           data-id="718243"
           data-theme=""
           data-refresh="15"
           data-show-errors="false"
           data-show-logos="true">
      </div>
    </div>
  );
};

export default GameStatistics;
