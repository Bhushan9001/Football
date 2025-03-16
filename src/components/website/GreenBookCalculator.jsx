import React, { useState } from 'react';
import axios from 'axios';

const GreenBookCalculator = () => {
    const [backBets, setBackBets] = useState([{ odds: '', stake: '' }]);
    const [layBets, setLayBets] = useState([{ odds: '', liability: '' }]);
    const [commission, setCommission] = useState(3);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
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
      setLayBets([...layBets, { odds: '', liability: '' }]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
  
      const payload = {
        back_bets: backBets.map(bet => ({
          odds: parseFloat(bet.odds),
          stake: parseFloat(bet.stake)
        })),
        lay_bets: layBets.map(bet => ({
          odds: parseFloat(bet.odds),
          liability: parseFloat(bet.liability)
        })),
        commission: parseFloat(commission)
      };
  
      try {
        const response = await axios.post('http://localhost:5000/calculate_bets/greenbook', payload, {
          headers: {
            'Content-Type': 'application/json',
            // Uncomment the line below if you need to include the Authorization header
            // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWIxODMzMGY3NjI4OGM2M2FkNGE2ZWUiLCJpYXQiOjE3MDY0NTg1ODkzODR9.69Zt6CPDWgcRR4CW5zzXqst8DcFbQwoN_Md4BgQWVvk'
          }
        });
        setResult(response.data);
      } catch (err) {
        setError('An error occurred while calculating bets. Please try again.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div>
        <h1 className="text-2xl font-bold mb-4">Bet Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Back Bets</h2>
            {backBets.map((bet, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Odds"
                  value={bet.odds}
                  onChange={(e) => handleBackBetChange(index, 'odds', e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Stake"
                  value={bet.stake}
                  onChange={(e) => handleBackBetChange(index, 'stake', e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
            ))}
            <button type="button" onClick={addBackBet} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Back Bet
            </button>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold">Lay Bets</h2>
            {layBets.map((bet, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Odds"
                  value={bet.odds}
                  onChange={(e) => handleLayBetChange(index, 'odds', e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Liability"
                  value={bet.liability}
                  onChange={(e) => handleLayBetChange(index, 'liability', e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
            ))}
            <button type="button" onClick={addLayBet} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Lay Bet
            </button>
          </div>
  
          <div>
            <label htmlFor="commission" className="block">Commission (%)</label>
            <input
              type="number"
              step="0.01"
              id="commission"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
  
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>
        </div>
  
        {error && <p className="text-red-500 mt-4">{error}</p>}
  
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result</h2>
            <pre className="bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
}

export default GreenBookCalculator