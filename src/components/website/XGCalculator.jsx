import React, { useState } from 'react';
import axios from 'axios';

function XGCalculator() {
  const [formData, setFormData] = useState({
    home_team: '',
    away_team: '',
    home_score: '',
    away_score: '',
    xg_home: '',
    xg_away: '',
    minutes_played: '',
  });

  const [results, setResults] = useState({
    prob_home: null,
    prob_draw: null,
    prob_away: null,
    odds_home: null,
    odds_draw: null,
    odds_away: null,
    predicted_outcome: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate', formData);
      setResults({
        prob_home: response.data.prob_home_win,
        prob_draw: response.data.prob_draw,
        prob_away: response.data.prob_away_win,
        odds_home: response.data.fair_odds_home,
        odds_draw: response.data.fair_odds_draw,
        odds_away: response.data.fair_odds_away,
        predicted_outcome: response.data.predicted_outcome,
      });
    } catch (error) {
      console.error('Error calculating probabilities:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        xG-Based Probability Calculator
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-7 gap-4 mb-6">
          <div className="font-semibold text-gray-700">Home Team</div>
          <div className="font-semibold text-gray-700">Away Team</div>
          <div className="font-semibold text-gray-700">Home Score</div>
          <div className="font-semibold text-gray-700">Away Score</div>
          <div className="font-semibold text-gray-700">xG Home</div>
          <div className="font-semibold text-gray-700">xG Away</div>
          <div className="font-semibold text-gray-700">Minutes Played</div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          <input
            type="text"
            name="home_team"
            placeholder="Home Team"
            value={formData.home_team}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="away_team"
            placeholder="Away Team"
            value={formData.away_team}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="home_score"
            placeholder="Score"
            value={formData.home_score}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="away_score"
            placeholder="Score"
            value={formData.away_score}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            step="0.01"
            name="xg_home"
            placeholder="xG Home"
            value={formData.xg_home}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            step="0.01"
            name="xg_away"
            placeholder="xG Away"
            value={formData.xg_away}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="minutes_played"
            placeholder="Minutes"
            value={formData.minutes_played}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Calculate
          </button>
        </div>
      </form>

      {results.prob_home !== null && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
          <p className="text-gray-700">
            <strong>Home Win Probability:</strong> {results.prob_home}%
          </p>
          <p className="text-gray-700">
            <strong>Draw Probability:</strong> {results.prob_draw}%
          </p>
          <p className="text-gray-700">
            <strong>Away Win Probability:</strong> {results.prob_away}%
          </p>
          <p className="text-gray-700">
            <strong>Odds Home Win:</strong> {results.odds_home}
          </p>
          <p className="text-gray-700">
            <strong>Odds Draw:</strong> {results.odds_draw}
          </p>
          <p className="text-gray-700">
            <strong>Odds Away Win:</strong> {results.odds_away}
          </p>
          <p className="text-gray-700">
            <strong>Predicted Outcome:</strong> {results.predicted_outcome}
          </p>
        </div>
      )}
    </div>
  );
}

export default XGCalculator;