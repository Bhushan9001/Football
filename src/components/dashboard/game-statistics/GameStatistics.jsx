import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GameStatistics = () => {
  const iframeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fixtureId = searchParams.get('fixture') || '718243'; // Use default if not provided

    if (iframeRef.current) {
      // Update the iframe src with the fixtureId
      const currentSrc = new URL(iframeRef.current.src);
      currentSrc.searchParams.set('id', fixtureId);
      iframeRef.current.src = currentSrc.toString();

      // Also send a message to the iframe
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_GAME_ID',
        gameId: fixtureId
      }, '*');
    }
  }, [location.search]);

  return (
    <div>
      <h1>Game Statistics</h1>
      <iframe
        ref={iframeRef}
        src="/gameStats.html"
        width="100%"
        height="600px"
        frameBorder="0"
        title="Game Statistics"
      />
    </div>
  );
};

export default GameStatistics;