import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PredictionModel = () => {
  const [formData, setFormData] = useState({
    league: '',
    home_team: '',
    away_team: '',
    odds_home_win: '',
    odds_draw: '',
    odds_away_win: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://45.119.47.81:5000/predict', {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const rawData = await response.text(); // Get response as text first
      // Replace Infinity with a very large number or null
      const sanitizedData = rawData.replace(/Infinity/g, 'null');
      const data = JSON.parse(sanitizedData);
      setPredictionResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatOdds = (odds) => {
    if (odds === null || odds === undefined || odds === 'null') return '-';
    return typeof odds === 'number' ? odds.toFixed(2) : '-';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Prediction Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Match Prediction Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">League</label>
              <input
                type="text"
                name="league"
                value={formData.league}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Team</label>
              <input
                type="text"
                name="home_team"
                value={formData.home_team}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Away Team</label>
              <input
                type="text"
                name="away_team"
                value={formData.away_team}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Win Odds</label>
              <input
                type="number"
                step="0.01"
                name="odds_home_win"
                value={formData.odds_home_win}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Draw Odds</label>
              <input
                type="number"
                step="0.01"
                name="odds_draw"
                value={formData.odds_draw}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Away Win Odds</label>
              <input
                type="number"
                step="0.01"
                name="odds_away_win"
                value={formData.odds_away_win}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Predicting...' : 'Get Prediction'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Prediction Results */}
      {predictionResult && (
        <div className="space-y-8">
          {/* Match Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{formData.league}</h2>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <span className="text-xl font-semibold">{formData.home_team}</span>
                <span className="text-gray-500">vs</span>
                <span className="text-xl font-semibold">{formData.away_team}</span>
              </div>
            </div>
          </div>

          {/* Probabilities and Odds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Probabilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Match Probabilities</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Home Win</span>
                  <span className="font-semibold">
                    {(predictionResult.result.probabilities.home_win * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Draw</span>
                  <span className="font-semibold">
                    {(predictionResult.result.probabilities.draw * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Away Win</span>
                  <span className="font-semibold">
                    {(predictionResult.result.probabilities.away_win * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Expected Goals */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Expected Goals (xG)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>{formData.home_team}</span>
                  <span className="font-semibold">
                    {predictionResult.result.expected_goals.home_team.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{formData.away_team}</span>
                  <span className="font-semibold">
                    {predictionResult.result.expected_goals.away_team.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Most Likely Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Most Likely Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictionResult.result.top_6_results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="text-center text-xl font-bold">
                    {result.home_goals} - {result.away_goals}
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <div>Probability: {(result.probability * 100).toFixed(1)}%</div>
                    <div>Odds: {formatOdds(result.odds)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Over/Under Probabilities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Over/Under Probabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(predictionResult.result.over_under_probs_and_odds).map(([goals, data]) => (
                <div key={goals} className="border rounded-lg p-4">
                  <h4 className="text-center font-semibold mb-2">Over/Under {goals}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Over:</span>
                      <span>{(data.over_prob * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Under:</span>
                      <span>{(data.under_prob * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionModel;