import React, { useState } from 'react';
import axios from 'axios';

function KellyCalculator() {
  // State for form input fields
  const [odds, setOdds] = useState('');
  const [fairOdds, setFairOdds] = useState('');
  const [probability, setProbability] = useState(''); // As a percentage (e.g., 50 for 50%)
  const [bankroll, setBankroll] = useState('');
  
  // State for result and errors
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to send the data to the Flask endpoint using Axios
  const calculateKelly = async () => {
    // Validate required fields
    if (!odds || !fairOdds || !probability || !bankroll) {
      setError('Please fill in all fields.');
      setResult(null);
      return;
    }

    const data = {
      odds: parseFloat(odds),
      fair_odds: parseFloat(fairOdds),
      probability: parseFloat(probability), // The backend expects a percentage and divides it by 100
      bankroll: parseFloat(bankroll)
    };

    try {
      const response = await axios.post('http://16.16.10.60:5000/kelly-calculator', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Error calculating Kelly bet.');
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Kelly Calculator</h1>
      <div className="bg-blue-600 rounded-lg shadow-lg p-6 text-white">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Odds</label>
              <input
                type="number"
                placeholder="Odds"
                min="1"
                step="0.01"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-2">Fair Odds</label>
              <input
                type="number"
                placeholder="Fair Odds"
                min="1"
                step="0.01"
                value={fairOdds}
                onChange={(e) => setFairOdds(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-2">Probability (%)</label>
              <input
                type="number"
                placeholder="Probability (%)"
                min="0"
                step="0.01"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-2">Bankroll</label>
              <input
                type="number"
                placeholder="Bankroll"
                min="0"
                step="1"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={calculateKelly}
            className="mt-4 bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200"
          >
            Calculate Kelly Bet
          </button>
        </form>

        {/* Display error message if any */}
        {error && <p className="mt-4 text-red-300">{error}</p>}

        {/* Display result if available */}
        {result && (
          <div className="mt-6 text-black bg-white rounded p-4">
            <h2 className="text-2xl font-semibold mb-4">Kelly Bet Calculation</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Kelly Bet</th>
                  <th className="border p-2">Kelly Fraction (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">{result.kelly_bet}</td>
                  <td className="border p-2">{result.kelly_fraction}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default KellyCalculator;
