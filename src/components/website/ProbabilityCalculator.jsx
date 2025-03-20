import React, { useState } from 'react';
import axios from 'axios';

const ProbabilityCalculator = () => {
    const [fairOdds, setFairOdds] = useState('');
    const [probability, setProbability] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setProbability(null);
  
      try {
        const response = await axios.post('http://45.119.47.81:5000/calculate-probability', {
          fair_odds: parseFloat(fairOdds)
        });
        setProbability(response.data.probability);
      } catch (err) {
        setError('An error occurred while calculating the probability.');
        console.error('Error:', err);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Calculate Probability</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fairOdds" className="block text-sm font-medium text-gray-700 mb-1">
              Fair Odds:
            </label>
            <input
              type="number"
              id="fairOdds"
              value={fairOdds}
              onChange={(e) => setFairOdds(e.target.value)}
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </form>
        {probability !== null && (
          <p className="mt-4 text-lg font-semibold text-green-600">
            The calculated probability is: {probability.toFixed(2)}%
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    );
}

export default ProbabilityCalculator