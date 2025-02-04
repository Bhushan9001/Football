import React, { useState } from 'react';
import axios from 'axios';

function SportsBettingCalculator() {
  // Form field states
  const [commission, setCommission] = useState('');
  const [dutchingBudget, setDutchingBudget] = useState('');
  const [layBudget, setLayBudget] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append('commission', commission);
    formData.append('dutching_budget', dutchingBudget);
    formData.append('lay_budget', layBudget);

    try {
      const response = await axios.post('http://16.16.10.60:5000/stbetting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Assume response.data is an array of result objects.
      setResults(response.data);
      setError(null);
    } catch (err) {
      console.error('Error calculating betting:', err);
      setError('Error calculating betting. Please try again.');
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Sports Trading Betting Calculator</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="commission" className="block font-semibold mb-2">
            Calculate Commission (%)
          </label>
          <input
            type="number"
            step="0.01"
            id="commission"
            name="commission"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dutching_budget" className="block font-semibold mb-2">
            Dutching Budget
          </label>
          <input
            type="number"
            step="0.01"
            id="dutching_budget"
            name="dutching_budget"
            value={dutchingBudget}
            onChange={(e) => setDutchingBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lay_budget" className="block font-semibold mb-2">
            Lay Dutching Budget
          </label>
          <input
            type="number"
            step="0.01"
            id="lay_budget"
            name="lay_budget"
            value={layBudget}
            onChange={(e) => setLayBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      {/* Display error message if any */}
      {error && (
        <div className="max-w-xl mx-auto mb-4 p-2 text-red-600 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto">
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
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{result.score}</td>
                  <td className="border p-2 text-center bg-blue-200">{result.back_odds}</td>
                  <td className="border p-2 text-center bg-blue-200">{result.back_stake}</td>
                  <td className="border p-2 text-center bg-pink-200">{result.lay_odds}</td>
                  <td className="border p-2 text-center bg-pink-200">{result.lay_stake}</td>
                  <td className="border p-2 text-center">{result.gross_back_profit}</td>
                  <td className="border p-2 text-center">{result.net_back_profit}</td>
                  <td className="border p-2 text-center bg-pink-200">{result.lay_liability}</td>
                  <td className="border p-2 text-center bg-pink-200">{result.net_lay_profit}</td>
                  <td className="border p-2 text-center">{result.potential_loss}</td>
                  <td className="border p-2 text-center">{result.potential_win}</td>
                  <td
                    className={`border p-2 text-center ${
                      result.total_potential > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {result.total_potential}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SportsBettingCalculator;
