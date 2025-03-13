import React, { useState } from 'react';

const GreenBookCalculator = () => {
  const [backBets, setBackBets] = useState([{ odds: '', stake: '', isFree: false }]);
  const [layBets, setLayBets] = useState([{ odds: '', liability: '' }]);
  const [commission, setCommission] = useState(3);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calculationType, setCalculationType] = useState('standard');
  const [cashoutValue, setCashoutValue] = useState('');

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

  const toggleFreeBet = (index) => {
    const newBackBets = [...backBets];
    newBackBets[index].isFree = !newBackBets[index].isFree;
    setBackBets(newBackBets);
  };

  const addBackBet = () => {
    setBackBets([...backBets, { odds: '', stake: '', isFree: false }]);
  };

  const addLayBet = () => {
    setLayBets([...layBets, { odds: '', liability: '' }]);
  };

  const calculateFreeBetValue = (bet) => {
    if (!bet.isFree) return parseFloat(bet.stake);
    const potentialWin = (parseFloat(bet.odds) - 1) * parseFloat(bet.stake);
    return potentialWin / parseFloat(bet.odds);
  };

  const compareCashout = () => {
    const totalStake = backBets.reduce((acc, bet) => acc + calculateFreeBetValue(bet), 0);
    const cashoutProfit = parseFloat(cashoutValue) - totalStake;
    setResult({
      cashoutProfit,
      shouldCashout: cashoutProfit > 0
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        back_bets: backBets.map(bet => ({
          odds: parseFloat(bet.odds),
          stake: calculateFreeBetValue(bet)
        })),
        lay_bets: layBets.map(bet => ({
          odds: parseFloat(bet.odds),
          liability: parseFloat(bet.liability)
        })),
        commission: parseFloat(commission)
      };

      if (calculationType === 'cashout') {
        compareCashout();
        return;
      }

      const endpoint = calculationType === 'free' ? 'freebet_for' : 'greenbook';
      const response = await fetch(`http://localhost:5000/calculate_bets/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred while calculating bets. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Advanced Bet Calculator</h1>

        <div className="mb-4 space-x-2">
          <button
            className={`px-4 py-2 rounded ${calculationType === 'standard' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCalculationType('standard')}
          >
            Standard
          </button>
          <button
            className={`px-4 py-2 rounded ${calculationType === 'free' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCalculationType('free')}
          >
            Free Bet
          </button>
          <button
            className={`px-4 py-2 rounded ${calculationType === 'cashout' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCalculationType('cashout')}
          >
            Cash Out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Back Bets</h2>
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
                {calculationType === 'free' && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={bet.isFree}
                      onChange={() => toggleFreeBet(index)}
                      className="form-checkbox"
                    />
                    <span>Free Bet</span>
                  </label>
                )}
              </div>
            ))}
            <button type="button" onClick={addBackBet} className="bg-green-500 text-white px-4 py-2 rounded">
              Add Back Bet
            </button>
          </div>

          {calculationType !== 'cashout' && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Lay Bets</h2>
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
              <button type="button" onClick={addLayBet} className="bg-green-500 text-white px-4 py-2 rounded">
                Add Lay Bet
              </button>
            </div>
          )}

          {calculationType === 'cashout' && (
            <div>
              <label className="block mb-2">Cash Out Value</label>
              <input
                type="number"
                step="0.01"
                value={cashoutValue}
                onChange={(e) => setCashoutValue(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          <div>
            <label htmlFor="commission" className="block mb-2">Commission (%)</label>
            <input
              type="number"
              step="0.01"
              id="commission"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenBookCalculator;