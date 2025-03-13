import React, { useState } from 'react';
import axios from 'axios';

const scores = [
  "0-0", "0-1", "0-2", "0-3",
  "1-0", "1-1", "1-2", "1-3",
  "2-0", "2-1", "2-2", "2-3",
  "3-0", "3-1", "3-2", "3-3", 
  "AOH", "AOD", "AOA"
];

function SportsTradingBettingCalculator() {
  const [commission, setCommission] = useState(3.0);
  const [dutchingBudget, setDutchingBudget] = useState(0.0);
  const [layBudget, setLayBudget] = useState(0.0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marketData, setMarketData] = useState(
    scores.reduce((acc, score) => ({
      ...acc,
      [score]: {
        backOdds: '',
        backStake: '',
        layOdds: '',
        layStake: ''
      }
    }), {})
  );

  const validateLayOdds = (value) => {
    const odds = parseFloat(value);
    return odds > 1 ? value : '';
  };

  const handleInputChange = (score, field, value) => {
    setMarketData(prev => ({
      ...prev,
      [score]: {
        ...prev[score],
        [field]: field === 'layOdds' ? validateLayOdds(value) : value
      }
    }));
  };

  const calculatePotentials = (backOdds, backStake, layOdds, layStake) => {
    backOdds = parseFloat(backOdds) || 0;
    backStake = parseFloat(backStake) || 0;
    layOdds = parseFloat(layOdds) || 0;
    layStake = parseFloat(layStake) || 0;

    const grossBackProfit = (backOdds - 1) * backStake;
    const netBackProfit = grossBackProfit * (1 - commission / 100);
    const layLiability = layStake * (layOdds - 1);
    const netLayProfit = layStake * (1 - commission / 100);

    return {
      grossBackProfit: grossBackProfit.toFixed(2),
      netBackProfit: netBackProfit.toFixed(2),
      layLiability: layLiability.toFixed(2),
      netLayProfit: netLayProfit.toFixed(2),
      potentialWin: (netBackProfit - layLiability).toFixed(2),
      potentialLoss: (-(backStake + layLiability)).toFixed(2)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('commission', commission);
    formData.append('dutching_budget', dutchingBudget);
    formData.append('lay_budget', layBudget);

    scores.forEach(score => {
      const data = marketData[score];
      formData.append(`back_odds_${score}`, data.backOdds);
      formData.append(`back_stake_${score}`, data.backStake);
      formData.append(`lay_odds_${score}`, data.layOdds);
      formData.append(`lay_stake_${score}`, data.layStake);
    });

    try {
      const response = await axios.post('http://localhost:5000/stbetting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="commission" className="block mb-1">Commission (%)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="commission"
              value={commission}
              onChange={(e) => setCommission(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="dutching_budget" className="block mb-1">Dutching Budget</label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="dutching_budget"
              value={dutchingBudget}
              onChange={(e) => setDutchingBudget(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label htmlFor="lay_budget" className="block mb-1">Lay Budget</label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="lay_budget"
              value={layBudget}
              onChange={(e) => setLayBudget(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-300 p-2">Score</th>
                <th className="border-2 border-gray-300 p-2">Back Odds</th>
                <th className="border-2 border-gray-300 p-2">Back Stake</th>
                <th className="border-2 border-gray-300 p-2">Lay Odds</th>
                <th className="border-2 border-gray-300 p-2">Lay Stake</th>
                <th className="border-2 border-gray-300 p-2">Gross Back Profit</th>
                <th className="border-2 border-gray-300 p-2">Net Back Profit</th>
                <th className="border-2 border-gray-300 p-2">Lay Liability</th>
                <th className="border-2 border-gray-300 p-2">Net Lay Profit</th>
                <th className="border-2 border-gray-300 p-2">Potential Win</th>
                <th className="border-2 border-gray-300 p-2">Potential Loss</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => {
                const data = marketData[score];
                const potentials = calculatePotentials(
                  data.backOdds,
                  data.backStake,
                  data.layOdds,
                  data.layStake
                );
                
                return (
                  <tr key={score}>
                    <td className="border-2 border-gray-300 p-2">{score}</td>
                    <td className="border-2 border-gray-300 p-2 bg-blue-50">
                      <input
                        type="number"
                        step="0.01"
                        min="1.01"
                        value={data.backOdds}
                        onChange={(e) => handleInputChange(score, 'backOdds', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2 bg-blue-50">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.backStake}
                        onChange={(e) => handleInputChange(score, 'backStake', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2 bg-red-50">
                      <input
                        type="number"
                        step="0.01"
                        min="1.01"
                        value={data.layOdds}
                        onChange={(e) => handleInputChange(score, 'layOdds', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2 bg-red-50">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.layStake}
                        onChange={(e) => handleInputChange(score, 'layStake', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2">{potentials.grossBackProfit}</td>
                    <td className="border-2 border-gray-300 p-2">{potentials.netBackProfit}</td>
                    <td className="border-2 border-gray-300 p-2">{potentials.layLiability}</td>
                    <td className="border-2 border-gray-300 p-2">{potentials.netLayProfit}</td>
                    <td className="border-2 border-gray-300 p-2 text-green-600">{potentials.potentialWin}</td>
                    <td className="border-2 border-gray-300 p-2 text-red-600">{potentials.potentialLoss}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default SportsTradingBettingCalculator;