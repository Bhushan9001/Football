import React, { useState } from 'react';
import axios from 'axios';


const scores = [
  "0-0", "0-1", "0-2", "0-3",
  "1-0", "1-1", "1-2", "1-3",
  "2-0", "2-1", "2-2", "2-3",
  "3-0", "3-1", "3-2", "3-3", "AOH", "AOD", "AOA"
];

function SportsTradingBettingCalculator() {
  const [commission, setCommission] = useState(3.0);
  const [dutchingBudget, setDutchingBudget] = useState(0.0);
  const [layBudget, setLayBudget] = useState(0.0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    
    try {
      const response = await axios.post('http://localhost:5000/stbetting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setResults(response.data.results);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sports Trading Betting Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="commission" className="block mb-1">Calculate Commission (%)</label>
          <input
            type="number"
            step="0.01"
            name="commission"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div>
          <label htmlFor="dutching_budget" className="block mb-1">Dutching Budget</label>
          <input
            type="number"
            step="0.01"
            name="dutching_budget"
            value={dutchingBudget}
            onChange={(e) => setDutchingBudget(e.target.value)}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div>
          <label htmlFor="lay_budget" className="block mb-1">Lay Dutching Budget</label>
          <input
            type="number"
            step="0.01"
            name="lay_budget"
            value={layBudget}
            onChange={(e) => setLayBudget(e.target.value)}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Calculating...' : 'Calculate'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-6 border-1 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-black p-2">Score</th>
                <th className="border-2 border-black p-2">Back Odds</th>
                <th className="border-2 border-black p-2">Back Stake</th>
                <th className="border-2 border-black p-2">Lay Odds</th>
                <th className="border-2 border-black p-2">Lay Stake</th>
                <th className="border-2 border-black p-2">Gross Back Profit</th>
                <th className="border-2 border-black p-2">Net Back Profit</th>
                <th className="border-2 border-black p-2">Lay Liability</th>
                <th className="border-2 border-black p-2">Net Lay Profit</th>
                <th className="border-2 border-black p-2">Potential Loss</th>
                <th className="border-2 border-black p-2">Potential Win</th>
                <th className="border-2 border-black p-2">Total Potential</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score}>
                  <td className="border-2 border-black p-2">{score}</td>
                  <td className="border-2 border-black p-2 bg-blue-100">
                    <input type="number" step="0.01" name={`back_odds_${score}`} className="w-full bg-transparent" />
                  </td>
                  <td className="border-2 border-black p-2 bg-blue-100">
                    <input type="number" step="0.01" name={`back_stake_${score}`} className="w-full bg-transparent" />
                  </td>
                  <td className="border-2 border-black p-2 bg-red-100">
                    <input type="number" step="0.01" name={`lay_odds_${score}`} className="w-full bg-transparent" />
                  </td>
                  <td className="border-2 border-black p-2 bg-red-100">
                    <input type="number" step="0.01" name={`lay_stake_${score}`} className="w-full bg-transparent" />
                  </td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                  <td className="border-2 border-black p-2">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-2 border-black p-2">Score</th>
                  <th className="border-2 border-black p-2">Back Odds</th>
                  <th className="border-2 border-black p-2">Back Stake</th>
                  <th className="border-2 border-black p-2">Lay Odds</th>
                  <th className="border-2 border-black p-2">Lay Stake</th>
                  <th className="border-2 border-black p-2">Gross Back Profit</th>
                  <th className="border-2 border-black p-2">Net Back Profit</th>
                  <th className="border-2 border-black p-2">Lay Liability</th>
                  <th className="border-2 border-black p-2">Net Lay Profit</th>
                  <th className="border-2 border-black p-2">Potential Loss</th>
                  <th className="border-2 border-black p-2">Potential Win</th>
                  <th className="border-2 border-black p-2">Total Potential</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="border-2 border-black p-2">{result.score}</td>
                    <td className="border-2 border-black p-2 bg-blue-100">{result.back_odds}</td>
                    <td className="border-2 border-black p-2 bg-blue-100">{result.back_stake}</td>
                    <td className="border-2 border-black p-2 bg-red-100">{result.lay_odds}</td>
                    <td className="border-2 border-black p-2 bg-red-100">{result.lay_stake}</td>
                    <td className="border-2 border-black p-2">{result.gross_back_profit}</td>
                    <td className="border-2 border-black p-2">{result.net_back_profit}</td>
                    <td className="border-2 border-black p-2">{result.lay_liability}</td>
                    <td className="border-2 border-black p-2">{result.net_lay_profit}</td>
                    <td className="border-2 border-black p-2">{result.potential_loss}</td>
                    <td className="border-2 border-black p-2">{result.potential_win}</td>
                    <td className={`border-2 border-black p-2 ${result.total_potential > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.total_potential}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SportsTradingBettingCalculator;
