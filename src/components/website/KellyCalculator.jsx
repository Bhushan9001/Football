// Kelly Calculator.jsx
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
      const response = await axios.post('http://45.119.47.81:5000/kelly-calculator', data, {
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
    <div className="container mx-auto p-4 max-w-4xl bg-white rounded-md">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black">Kelly Calculator</h1>
      <div className="bg-blue-500 rounded-xl  p-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-white font-semibold">Odds</label>
              <input
                type="number"
                placeholder="Odds"
                min="1"
                step="0.01"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Fair Odds</label>
              <input
                type="number"
                placeholder="Fair Odds"
                min="1"
                step="0.01"
                value={fairOdds}
                onChange={(e) => setFairOdds(e.target.value)}
                className="w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Probability (%)</label>
              <input
                type="number"
                placeholder="Probability (%)"
                min="0"
                step="0.01"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                className="w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-white font-semibold">Bankroll</label>
              <input
                type="number"
                placeholder="Bankroll"
                min="0"
                step="1"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
                className="w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={calculateKelly}
            className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Calculate Kelly Bet
          </button>
        </form>

        {/* Display error message if any */}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

        {/* Display result if available */}
        {result && (
          <div className="mt-8 text-gray-800 bg-gray-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Kelly Bet Calculation</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-200 p-3 text-left">Kelly Bet</th>
                  <th className="border border-blue-200 p-3 text-left">Kelly Fraction (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-200 p-3">{result.kelly_bet}</td>
                  <td className="border border-blue-200 p-3">{result.kelly_fraction}</td>
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