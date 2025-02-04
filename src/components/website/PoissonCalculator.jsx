import React, { useState } from 'react';
import axios from 'axios';

function PoissonCalculator() {
  // State for input fields
  const [homeGoalsScored, setHomeGoalsScored] = useState('');
  const [homeGoalsConceded, setHomeGoalsConceded] = useState('');
  const [homeMatchesPlayed, setHomeMatchesPlayed] = useState('');
  const [awayGoalsScored, setAwayGoalsScored] = useState('');
  const [awayGoalsConceded, setAwayGoalsConceded] = useState('');
  const [awayMatchesPlayed, setAwayMatchesPlayed] = useState('');

  // State for results and error messages
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Function to call the Flask endpoint using Axios
  const calculatePoisson = async () => {
    const data = {
      home_team_goals_scored: parseInt(homeGoalsScored, 10),
      home_team_goals_conceded: parseInt(homeGoalsConceded, 10),
      home_team_matches: parseInt(homeMatchesPlayed, 10),
      away_team_goals_scored: parseInt(awayGoalsScored, 10),
      away_goals_conceded: parseInt(awayGoalsConceded, 10),
      away_team_matches: parseInt(awayMatchesPlayed, 10),
    };

    try {
      const response = await axios.post('http://16.16.10.60:5000/poisson-predictor', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      setResults(response.data);
      setError(null);
    } catch (err) {
        console.log(err)
      setError('Error calculating Poisson probabilities.');
      setResults(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Poisson Distribution Calculator</h1>
      <div className="bg-green-600 rounded-lg shadow-lg p-6 text-white">
        <form>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Home Team Stats */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3">Home Team Stats</h2>
              <input
                type="number"
                placeholder="Goals Scored"
                min="0"
                step="1"
                value={homeGoalsScored}
                onChange={(e) => setHomeGoalsScored(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
              <input
                type="number"
                placeholder="Goals Conceded"
                min="0"
                step="1"
                value={homeGoalsConceded}
                onChange={(e) => setHomeGoalsConceded(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
              <input
                type="number"
                placeholder="Matches Played"
                min="1"
                step="1"
                value={homeMatchesPlayed}
                onChange={(e) => setHomeMatchesPlayed(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
            </div>

            {/* Away Team Stats */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3">Away Team Stats</h2>
              <input
                type="number"
                placeholder="Goals Scored"
                min="0"
                step="1"
                value={awayGoalsScored}
                onChange={(e) => setAwayGoalsScored(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
              <input
                type="number"
                placeholder="Goals Conceded"
                min="0"
                step="1"
                value={awayGoalsConceded}
                onChange={(e) => setAwayGoalsConceded(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
              <input
                type="number"
                placeholder="Matches Played"
                min="1"
                step="1"
                value={awayMatchesPlayed}
                onChange={(e) => setAwayMatchesPlayed(e.target.value)}
                className="w-full p-2 rounded mb-3 text-black"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={calculatePoisson}
            className="mt-4 bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-gray-200"
          >
            Calculate Poisson Probabilities
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-300">{error}</p>}

        {/* Results */}
        {results && (
          <div id="poisson-results" className="mt-6 text-black bg-white rounded p-4">
            <h2 className="text-2xl font-semibold mb-4">Poisson Probability Results</h2>

            {/* 1X2 Probabilities Table */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Outcome</th>
                    <th className="border p-2">Fair Odds</th>
                    <th className="border p-2">Probability (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['1X2_fair_odds']).map(([key, odds]) => (
                    <tr key={key}>
                      <td className="border p-2">{key}</td>
                      <td className="border p-2">{odds}</td>
                      <td className="border p-2">{results['1X2_probabilities'][key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Asian Handicap Probabilities Table */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Handicap</th>
                    <th className="border p-2">Win (%)</th>
                    <th className="border p-2">Push (%)</th>
                    <th className="border p-2">Lose (%)</th>
                    <th className="border p-2">Fair Odds Win</th>
                    <th className="border p-2">Fair Odds Lose</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['ah_probabilities']).map(([handicap, stats]) => (
                    <tr key={handicap}>
                      <td className="border p-2">{handicap}</td>
                      <td className="border p-2">{stats.win_prob}</td>
                      <td className="border p-2">{stats.push_prob}</td>
                      <td className="border p-2">{stats.lose_prob}</td>
                      <td className="border p-2">{stats.fair_odds_win}</td>
                      <td className="border p-2">{stats.fair_odds_lose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Over/Under Probabilities Table */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Threshold</th>
                    <th className="border p-2">Fair Odds</th>
                    <th className="border p-2">Probability (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['over_under_fair_odds']).map(([key, odds]) => (
                    <tr key={key}>
                      <td className="border p-2">{key}</td>
                      <td className="border p-2">{odds}</td>
                      <td className="border p-2">{results['over_under_probabilities'][key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scoreline Probabilities Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Scoreline</th>
                    <th className="border p-2">Fair Odds</th>
                    <th className="border p-2">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['scoreline_fair_odds']).map(([scoreline, odds]) => (
                    <tr key={scoreline}>
                      <td className="border p-2">{scoreline}</td>
                      <td className="border p-2">{odds}</td>
                      <td className="border p-2">{results['scoreline_probabilities'][scoreline]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PoissonCalculator;
