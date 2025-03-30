import React, { useState } from 'react';
import axios from 'axios';

const CalculatorV2 = () => {
  const [formData, setFormData] = useState({
    home_team: '',
    away_team: '',
    current_score_home: 0,
    current_score_away: 0,
    home_xg: 0,
    away_xg: 0,
    minutes_played: 0,
    possession_home: 50,
    possession_away: 50,
    shots_on_target_home: 0,
    shots_on_target_away: 0
  });

  const [result, setResult] = useState({
    "away_team": 0,
    "current_score_away": 0,
    "current_score_home": 0,
    "fair_odds_away": 0,
    "fair_odds_draw": 0,
    "fair_odds_home": 0,
    "home_team": 0,
    "overdue_goals_away": 0,
    "overdue_goals_home": 0,
    "prob_away_win": 0,
    "prob_draw": 0,
    "prob_home_win": 0
  });
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name.includes('possession') ? parseInt(value) : parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://16.16.10.60:5000/calculate', formData);
      setResult(response.data);
    } catch (err) {
      setError('An error occurred while calculating the probability.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Probability Calculator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="home_team" className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
            <input type="text" id="home_team" name="home_team" value={formData.home_team} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="away_team" className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
            <input type="text" id="away_team" name="away_team" value={formData.away_team} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="current_score_home" className="block text-sm font-medium text-gray-700 mb-1">Home Score</label>
            <input type="number" id="current_score_home" name="current_score_home" value={formData.current_score_home} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="current_score_away" className="block text-sm font-medium text-gray-700 mb-1">Away Score</label>
            <input type="number" id="current_score_away" name="current_score_away" value={formData.current_score_away} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="home_xg" className="block text-sm font-medium text-gray-700 mb-1">Home xG</label>
            <input type="number" id="home_xg" name="home_xg" value={formData.home_xg} onChange={handleChange} required step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="away_xg" className="block text-sm font-medium text-gray-700 mb-1">Away xG</label>
            <input type="number" id="away_xg" name="away_xg" value={formData.away_xg} onChange={handleChange} required step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label htmlFor="minutes_played" className="block text-sm font-medium text-gray-700 mb-1">Minutes Played</label>
          <input type="number" id="minutes_played" name="minutes_played" value={formData.minutes_played} onChange={handleChange} required min="0" max="90" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="possession_home" className="block text-sm font-medium text-gray-700 mb-1">Home Possession %</label>
            <input type="number" id="possession_home" name="possession_home" value={formData.possession_home} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="possession_away" className="block text-sm font-medium text-gray-700 mb-1">Away Possession %</label>
            <input type="number" id="possession_away" name="possession_away" value={formData.possession_away} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="shots_on_target_home" className="block text-sm font-medium text-gray-700 mb-1">Home Shots on Target</label>
            <input type="number" id="shots_on_target_home" name="shots_on_target_home" value={formData.shots_on_target_home} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="shots_on_target_away" className="block text-sm font-medium text-gray-700 mb-1">Away Shots on Target</label>
            <input type="number" id="shots_on_target_away" name="shots_on_target_away" value={formData.shots_on_target_away} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Probability
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Match Probabilities</h3>
              
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-green-700">Home Win</span>
                      <span className="ml-2 text-sm font-medium text-gray-600">{result.prob_home_win}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{width: `${result.prob_home_win}%`}}></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Draw</span>
                      <span className="ml-2 text-sm font-medium text-gray-600">{result.prob_draw}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-gray-500 rounded" style={{width: `${result.prob_draw}%`}}></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-red-700">Away Win</span>
                      <span className="ml-2 text-sm font-medium text-gray-600">{result.prob_away_win}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-red-500 rounded" style={{width: `${result.prob_away_win}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Fair Odds & Statistics</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Home Fair Odds</p>
                    <p className="text-xl font-semibold">{result.fair_odds_home.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Draw Fair Odds</p>
                    <p className="text-xl font-semibold">{result.fair_odds_draw.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Away Fair Odds</p>
                    <p className="text-xl font-semibold">{result.fair_odds_away.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Current Score</p>
                    <p className="text-xl font-semibold">{result.current_score_home} - {result.current_score_away}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Home Overdue Goals</p>
                    <p className="text-xl font-semibold">{result.overdue_goals_home}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Away Overdue Goals</p>
                    <p className="text-xl font-semibold">{result.overdue_goals_away}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default CalculatorV2;