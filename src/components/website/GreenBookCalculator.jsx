import React, { useState, useEffect } from 'react';

const GreenBookCalculator = () => {
  const [backBets, setBackBets] = useState([{ odds: '', stake: '' }]);
  const [layBets, setLayBets] = useState([{ odds: '', liability: '', stake: '' }]);
  const [commission, setCommission] = useState(3);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Calculate lay stakes whenever lay bets change
    const updatedLayBets = layBets.map(bet => ({
      ...bet,
      stake: calculateLayStake(bet.odds, bet.liability)
    }));
    setLayBets(updatedLayBets);
  }, [layBets.map(bet => `${bet.odds}-${bet.liability}`).join()]);

  const calculateLayStake = (odds, liability) => {
    if (!odds || !liability || odds <= 1) return '';
    return (parseFloat(liability) / (parseFloat(odds) - 1)).toFixed(2);
  };

  const handleBackBetChange = (index, field, value) => {
    const newBackBets = [...backBets];
    newBackBets[index][field] = value;
    setBackBets(newBackBets);
  };

  const handleLayBetChange = (index, field, value) => {
    const newLayBets = [...layBets];
    newLayBets[index][field] = value;
    setLayBets(newLayBets);
  };

  const addBackBet = () => {
    setBackBets([...backBets, { odds: '', stake: '' }]);
  };

  const addLayBet = () => {
    setLayBets([...layBets, { odds: '', liability: '', stake: '' }]);
  };

  const handleCalculate = async (type) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        back_bets: backBets.filter(b => b.odds && b.stake).map(b => ({
          odds: parseFloat(b.odds),
          stake: parseFloat(b.stake)
        })),
        lay_bets: layBets.filter(l => l.odds && l.liability).map(l => ({
          odds: parseFloat(l.odds),
          liability: parseFloat(l.liability)
        })),
        commission: parseFloat(commission)
      };

      const response = await fetch(`http://45.119.47.81:5000/calculate_bets/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Calculation failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating bets.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-3xl font-bold mb-8">Back Lay Betting Calculator</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Back Bets Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Back Bets</h3>
          <div className="space-y-4">
            {backBets.map((bet, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="number"
                  placeholder="Back Odds"
                  value={bet.odds}
                  onChange={(e) => handleBackBetChange(index, 'odds', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Back Stake"
                  value={bet.stake}
                  onChange={(e) => handleBackBetChange(index, 'stake', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
            ))}
            <button 
              onClick={addBackBet}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Add More Back Bets
            </button>
          </div>
        </div>

        {/* Lay Bets Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Lay Bets</h3>
          <div className="space-y-4">
            {layBets.map((bet, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg space-y-2">
                <input
                  type="number"
                  placeholder="Lay Odds"
                  value={bet.odds}
                  onChange={(e) => handleLayBetChange(index, 'odds', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Lay Liability"
                  value={bet.liability}
                  onChange={(e) => handleLayBetChange(index, 'liability', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Calculated Lay Stake"
                  value={bet.stake}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            ))}
            <button 
              onClick={addLayBet}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Add More Lay Bets
            </button>
          </div>
        </div>

        {/* Commission Input */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">Commission (%)</label>
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            step="0.01"
          />
        </div>

        {/* Calculation Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => handleCalculate('greenbook')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            Calculate Greenbook
          </button>
          <button
            onClick={() => handleCalculate('freebet_for')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            Calculate Freebet For
          </button>
          <button
            onClick={() => handleCalculate('freebet_against')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            Calculate Freebet Against
          </button>
          <button
            onClick={() => handleCalculate('current_profit')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            Calculate Current Profit
          </button>
          <button
            onClick={() => handleCalculate('cashout')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            Calculate Cashout
          </button>
        </div>

        {/* Results Display */}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {result && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-center mb-4">Calculation Results:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-3 text-left">Parameter</th>
                    <th className="p-3 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result).map(([key, value]) => (
                    <tr key={key} className="even:bg-gray-50">
                      <td className="p-3 border">{key.replace(/_/g, ' ').toUpperCase()}</td>
                      <td className="p-3 border">{typeof value === 'number' ? value.toFixed(2) : value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-gray-600 mt-8">
        <p>Sports Trading AI Prediction © 2024</p>
      </footer>
    </div>
  );
};

export default GreenBookCalculator;