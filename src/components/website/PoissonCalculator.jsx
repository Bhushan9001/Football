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
      const response = await axios.post('http://localhost:5000/poisson-predictor', data, {
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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Poisson Distribution Calculator</h1>
      <div className="bg-green-600 rounded-xl shadow-lg p-8">
        <form>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Home Team Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Home Team Stats</h2>
              <input
                type="number"
                placeholder="Goals Scored"
                min="0"
                step="1"
                value={homeGoalsScored}
                onChange={(e) => setHomeGoalsScored(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="number"
                placeholder="Goals Conceded"
                min="0"
                step="1"
                value={homeGoalsConceded}
                onChange={(e) => setHomeGoalsConceded(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="number"
                placeholder="Matches Played"
                min="1"
                step="1"
                value={homeMatchesPlayed}
                onChange={(e) => setHomeMatchesPlayed(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>

            {/* Away Team Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Away Team Stats</h2>
              <input
                type="number"
                placeholder="Goals Scored"
                min="0"
                step="1"
                value={awayGoalsScored}
                onChange={(e) => setAwayGoalsScored(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="number"
                placeholder="Goals Conceded"
                min="0"
                step="1"
                value={awayGoalsConceded}
                onChange={(e) => setAwayGoalsConceded(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="number"
                placeholder="Matches Played"
                min="1"
                step="1"
                value={awayMatchesPlayed}
                onChange={(e) => setAwayMatchesPlayed(e.target.value)}
                className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={calculatePoisson}
            className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Calculate Poisson Probabilities
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

        {/* Results */}
        {results && (
          <div id="poisson-results" className="mt-8 text-gray-800 bg-gray-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Poisson Probability Results</h2>

            {/* 1X2 Probabilities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-3 text-left">Outcome</th>
                    <th className="border border-blue-200 p-3 text-left">Fair Odds</th>
                    <th className="border border-blue-200 p-3 text-left">Probability (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['1X2_fair_odds']).map(([key, odds]) => (
                    <tr key={key} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3">{key}</td>
                      <td className="border border-blue-200 p-3">{odds}</td>
                      <td className="border border-blue-200 p-3">{results['1X2_probabilities'][key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Asian Handicap Probabilities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-3 text-left">Handicap</th>
                    <th className="border border-blue-200 p-3 text-left">Win (%)</th>
                    <th className="border border-blue-200 p-3 text-left">Push (%)</th>
                    <th className="border border-blue-200 p-3 text-left">Lose (%)</th>
                    <th className="border border-blue-200 p-3 text-left">Fair Odds Win</th>
                    <th className="border border-blue-200 p-3 text-left">Fair Odds Lose</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['ah_probabilities']).map(([handicap, stats]) => (
                    <tr key={handicap} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3">{handicap}</td>
                      <td className="border border-blue-200 p-3">{stats.win_prob}</td>
                      <td className="border border-blue-200 p-3">{stats.push_prob}</td>
                      <td className="border border-blue-200 p-3">{stats.lose_prob}</td>
                      <td className="border border-blue-200 p-3">{stats.fair_odds_win}</td>
                      <td className="border border-blue-200 p-3">{stats.fair_odds_lose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Over/Under Probabilities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-3 text-left">Threshold</th>
                    <th className="border border-blue-200 p-3 text-left">Fair Odds</th>
                    <th className="border border-blue-200 p-3 text-left">Probability (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['over_under_fair_odds']).map(([key, odds]) => (
                    <tr key={key} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3">{key}</td>
                      <td className="border border-blue-200 p-3">{odds}</td>
                      <td className="border border-blue-200 p-3">{results['over_under_probabilities'][key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scoreline Probabilities Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-3 text-left">Scoreline</th>
                    <th className="border border-blue-200 p-3 text-left">Fair Odds</th>
                    <th className="border border-blue-200 p-3 text-left">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results['scoreline_fair_odds']).map(([scoreline, odds]) => (
                    <tr key={scoreline} className="hover:bg-blue-50">
                      <td className="border border-blue-200 p-3">{scoreline}</td>
                      <td className="border border-blue-200 p-3">{odds}</td>
                      <td className="border border-blue-200 p-3">{results['scoreline_probabilities'][scoreline]}</td>
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
