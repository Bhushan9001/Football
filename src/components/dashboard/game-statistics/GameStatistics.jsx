import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GameStatistics = () => {
  const iframeRef = useRef(null);
  const location = useLocation();
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [liveOdds, setLiveOdds] = useState([]);
  const [loadingOdds, setLoadingOdds] = useState(false);

  // Fetch live matches on component mount
  useEffect(() => {
    fetchLiveMatches();
  }, []);

  // Set the selected match based on URL or the first live match
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fixtureId = searchParams.get('fixture');

    if (fixtureId) {
      setSelectedMatch(fixtureId);
    } else if (liveMatches.length > 0) {
      setSelectedMatch(liveMatches[0].fixture.id.toString());
    }
  }, [location.search, liveMatches]);

  // Update iframe and fetch live odds when a match is selected
  useEffect(() => {
    if (selectedMatch && iframeRef.current) {
      updateIframe(selectedMatch);
      fetchLiveOdds(selectedMatch); // Fetch live odds for the selected match
    }
  }, [selectedMatch]);

  // Fetch live matches from the API
  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
        params: { live: 'all' },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_API_KEY, // Replace with your actual API key
        },
      });
      setLiveMatches(response.data.response);
    } catch (error) {
      console.error('Error fetching live matches:', error);
    }
  };

  // Fetch live odds for a specific fixture
  const fetchLiveOdds = async (fixtureId) => {
    setLoadingOdds(true);
    try {
      const response = await axios.get('https://v3.football.api-sports.io/odds/live', {
        params: { fixture: fixtureId },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_API_KEY, // Replace with your actual API key
        },
      });
      console.log('Live Odds API Response:', response.data); // Debugging: Log the API response

      // Check if the response contains odds data
      if (response.data && response.data.response && response.data.response.length > 0) {
        const oddsData = response.data.response[0].odds; // Access the odds array
        setLiveOdds(oddsData);
      } else {
        setLiveOdds([]); // Set live odds to an empty array if no data is returned
      }
    } catch (error) {
      console.error('Error fetching live odds:', error);
      setLiveOdds([]); // Set live odds to an empty array on error
    } finally {
      setLoadingOdds(false);
    }
  };

  // Update iframe source when a new match is selected
  const updateIframe = (fixtureId) => {
    const currentSrc = new URL(iframeRef.current.src);
    currentSrc.searchParams.set('id', fixtureId);
    iframeRef.current.src = currentSrc.toString();

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'UPDATE_GAME_ID',
        gameId: fixtureId,
      },
      '*'
    );
  };

  // Handle match selection from the dropdown
  const handleMatchSelect = (event) => {
    setSelectedMatch(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Game Statistics</h1>

      {/* Match Selection Dropdown */}
      {liveMatches.length > 0 ? (
        <select
          value={selectedMatch || ''}
          onChange={handleMatchSelect}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
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

      {/* Iframe for Game Statistics */}
      {selectedMatch && (
        <iframe
          ref={iframeRef}
          src={`/gameStats.html?id=${selectedMatch}`}
          width="100%"
          height="600px"
          frameBorder="0"
          title="Game Statistics"
          className="mb-8"
        />
      )}

      {/* Live Odds Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Live Odds</h2>
        {loadingOdds ? (
          <p>Loading live odds...</p>
        ) : liveOdds.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Bet</th>
                <th className="border border-gray-300 p-3 text-left">Value</th>
                <th className="border border-gray-300 p-3 text-left">Odd</th>
                <th className="border border-gray-300 p-3 text-left">Handicap</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {liveOdds.map((oddsData, index) => (
                <React.Fragment key={index}>
                  {/* Group by Bet Type */}
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="border border-gray-300 p-3 font-bold">
                      {oddsData.name}
                    </td>
                  </tr>
                  {/* Display Main Odds */}
                  {oddsData.values
                    .filter((odd) => odd.main) // Only display main odds
                    .map((odd, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{odd.value}</td>
                        <td className="border border-gray-300 p-3">{odd.odd}</td>
                        <td className="border border-gray-300 p-3">{odd.handicap}</td>
                        <td className="border border-gray-300 p-3">
                          {odd.suspended ? 'Suspended' : 'Active'}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No live odds available for this match.</p>
        )}
      </div>
    </div>
  );
};

export default GameStatistics;