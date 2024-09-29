import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GameStatistics = () => {
  const iframeRef = useRef(null);
  const location = useLocation();
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fixtureId = searchParams.get('fixture');

    if (fixtureId) {
      setSelectedMatch(fixtureId);
    } else if (liveMatches.length > 0) {
      setSelectedMatch(liveMatches[0].fixture.id.toString());
    }
  }, [location.search, liveMatches]);

  useEffect(() => {
    if (selectedMatch && iframeRef.current) {
      updateIframe(selectedMatch);
    }
  }, [selectedMatch]);

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
        params: { live: 'all' },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_API_KEY // Replace with your actual API key
        }
      });
      setLiveMatches(response.data.response);
    } catch (error) {
      console.error('Error fetching live matches:', error);
    }
  };

  const updateIframe = (fixtureId) => {
    const currentSrc = new URL(iframeRef.current.src);
    currentSrc.searchParams.set('id', fixtureId);
    iframeRef.current.src = currentSrc.toString();

    iframeRef.current.contentWindow.postMessage({
      type: 'UPDATE_GAME_ID',
      gameId: fixtureId
    }, '*');
  };

  const handleMatchSelect = (event) => {
    setSelectedMatch(event.target.value);
  };

  return (
    <div>
      <h1>Live Game Statistics</h1>
      {liveMatches.length > 0 ? (
        <select value={selectedMatch || ''} onChange={handleMatchSelect}>
          <option value="">Select a live match</option>
          {liveMatches.map((match) => (
            <option key={match.fixture.id} value={match.fixture.id}>
              {match.teams.home.name} vs {match.teams.away.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No live matches available at the moment.</p>
      )}
      {selectedMatch && (
        <iframe
          ref={iframeRef}
          src={`/gameStats.html?id=${selectedMatch}`}
          width="100%"
          height="600px"
          frameBorder="0"
          title="Game Statistics"
        />
      )}
    </div>
  );
};

export default GameStatistics;