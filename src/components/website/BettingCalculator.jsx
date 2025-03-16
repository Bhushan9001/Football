// BettingCalculator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const scores = [
  "0-0", "0-1", "0-2", "0-3",
  "1-0", "1-1", "1-2", "1-3",
  "2-0", "2-1", "2-2", "2-3",
  "3-0", "3-1", "3-2", "3-3"
];

function BettingCalculator() {
  // Form state for commission and dutching budget
  const [commission, setCommission] = useState(3.0);
  const [dutchingBudget, setDutchingBudget] = useState(0.0);
  
  // Markets state for each score (back and lay fields)
  // We initialize an object where each key is a score and the value is an object with fields.
  const initialMarkets = scores.reduce((acc, score) => {
    acc[score] = {
      back_odds: '',
      back_stake: '',
      lay_odds: '',
      lay_stake: ''
    };
    return acc;
  }, {});

  const [markets, setMarkets] = useState(initialMarkets);
  
  // State for results (computed values returned from backend)
  const [results, setResults] = useState([]);
  
  // State for error messages (if any)
  const [error, setError] = useState(null);

  // Handler for input changes for commission and dutchingBudget
  const handleGlobalChange = (e) => {
    const { name, value } = e.target;
    if (name === 'commission') {
      setCommission(value);
    } else if (name === 'dutching_budget') {
      setDutchingBudget(value);
    }
  };

  // Handler for changes in the market (score-specific) fields
  const handleMarketChange = (score, field, value) => {
    setMarkets((prev) => ({
      ...prev,
      [score]: {
        ...prev[score],
        [field]: value
      }
    }));
  };

  // Submit handler: send form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the payload:
    // commission, dutching_budget, and for each score send the corresponding values.
    const payload = {
      commission: parseFloat(commission),
      dutching_budget: parseFloat(dutchingBudget),
      // Instead of separate keys, we send a "markets" object keyed by score.
      markets: scores.reduce((acc, score) => {
        const data = markets[score];
        acc[score] = {
          back_odds: parseFloat(data.back_odds) || 0,
          back_stake: parseFloat(data.back_stake) || 0,
          lay_odds: parseFloat(data.lay_odds) || 0,
          lay_stake: parseFloat(data.lay_stake) || 0
        };
        return acc;
      }, {})
    };

    try {
      const response = await axios.post('http://16.16.10.60:5000/stbetting', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      // Expecting the response data to have a "results" array.
      setResults(response.data.results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error calculating betting results.');
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Betting Correct Score Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="commission" className="block font-medium">
            Commission (%):
          </label>
          <input
            type="number"
            id="commission"
            name="commission"
            step="0.01"
            value={commission}
            onChange={handleGlobalChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dutching_budget" className="block font-medium">
            Dutching Budget:
          </label>
          <input
            type="number"
            id="dutching_budget"
            name="dutching_budget"
            step="0.01"
            value={dutchingBudget}
            onChange={handleGlobalChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Score</th>
                <th className="border p-2">Back Odds</th>
                <th className="border p-2">Back Stake</th>
                <th className="border p-2">Lay Odds</th>
                <th className="border p-2">Lay Stake</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score}>
                  <td className="border p-2">{score}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={markets[score].back_odds}
                      onChange={(e) => handleMarketChange(score, 'back_odds', e.target.value)}
                      className="w-full p-1 bg-lightBlue-200 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={markets[score].back_stake}
                      onChange={(e) => handleMarketChange(score, 'back_stake', e.target.value)}
                      className="w-full p-1 bg-lightBlue-200 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      min="1.01"
                      value={markets[score].lay_odds}
                      onChange={(e) => handleMarketChange(score, 'lay_odds', e.target.value)}
                      className="w-full p-1 bg-pink-200 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={markets[score].lay_stake}
                      onChange={(e) => handleMarketChange(score, 'lay_stake', e.target.value)}
                      className="w-full p-1 bg-pink-200 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Calculate
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-center text-red-500 font-medium">{error}</div>
      )}

      {/* Render results table if available */}
      {results && results.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Score</th>
                <th className="border p-2">Back Odds</th>
                <th className="border p-2">Back Stake</th>
                <th className="border p-2">Lay Odds</th>
                <th className="border p-2">Lay Stake</th>
                <th className="border p-2">Gross Back Profit</th>
                <th className="border p-2">Net Back Profit</th>
                <th className="border p-2">Lay Liability</th>
                <th className="border p-2">Net Lay Profit</th>
                <th className="border p-2">Potential Loss</th>
                <th className="border p-2">Potential Win</th>
                <th className="border p-2">Total Potential</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.score}>
                  <td className="border p-2">{result.score}</td>
                  <td className="border p-2">{result.back_odds}</td>
                  <td className="border p-2">{result.back_stake}</td>
                  <td className="border p-2">{result.lay_odds}</td>
                  <td className="border p-2">{result.lay_stake}</td>
                  <td className="border p-2">{result.gross_back_profit}</td>
                  <td className="border p-2">{result.net_back_profit}</td>
                  <td className="border p-2">{result.lay_liability}</td>
                  <td className="border p-2">{result.net_lay_profit}</td>
                  <td className="border p-2">{result.potential_loss}</td>
                  <td className="border p-2">{result.potential_win}</td>
                  <td className="border p-2">{result.total_potential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BettingCalculator;
