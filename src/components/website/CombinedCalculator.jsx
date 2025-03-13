import React, { useState } from "react";
import axios from "axios";

const CombinedCalculator = () => {
  const [activeCalculator, setActiveCalculator] = useState("poisson"); // Default to Poisson Calculator

  // Poisson Calculator States
  const [homeGoalsScored, setHomeGoalsScored] = useState("");
  const [homeGoalsConceded, setHomeGoalsConceded] = useState("");
  const [homeMatchesPlayed, setHomeMatchesPlayed] = useState("");
  const [awayGoalsScored, setAwayGoalsScored] = useState("");
  const [awayGoalsConceded, setAwayGoalsConceded] = useState("");
  const [awayMatchesPlayed, setAwayMatchesPlayed] = useState("");
  const [poissonResults, setPoissonResults] = useState(null);
  const [poissonError, setPoissonError] = useState(null);

  // Kelly Calculator States
  const [odds, setOdds] = useState("");
  const [fairOdds, setFairOdds] = useState("");
  const [bankroll, setBankroll] = useState("");
  const [kellyResult, setKellyResult] = useState(null);
  const [kellyError, setKellyError] = useState(null);

  // Calculate Probability based on Fair Odds
  const calculateProbability = () => {
    if (!fairOdds || isNaN(fairOdds) || fairOdds <= 0) return 0;
    return (1 / parseFloat(fairOdds)) * 100;
  };

  // Poisson Calculator Logic
  const calculatePoisson = async () => {
    const data = {
      home_team_goals_scored: parseInt(homeGoalsScored, 10),
      home_team_goals_conceded: parseInt(homeGoalsConceded, 10),
      home_team_matches: parseInt(homeMatchesPlayed, 10),
      away_team_goals_scored: parseInt(awayGoalsScored, 10),
      away_goals_conceded: parseInt(awayGoalsConceded, 10),
      away_team_matches: parseInt(awayMatchesPlayed, 10),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/poisson-predictor",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPoissonResults(response.data);
      setPoissonError(null);
    } catch (err) {
      console.log(err);
      setPoissonError("Error calculating Poisson probabilities.");
      setPoissonResults(null);
    }
  };

  // Kelly Calculator Logic
  const calculateKelly = async () => {
    if (!odds || !fairOdds || !bankroll) {
      setKellyError("Please fill in all fields.");
      setKellyResult(null);
      return;
    }

    if (isNaN(fairOdds) || fairOdds <= 0) {
      setKellyError("Fair Odds must be a positive number.");
      setKellyResult(null);
      return;
    }

    const data = {
      odds: parseFloat(odds),
      fair_odds: parseFloat(fairOdds),
      probability: calculateProbability(),
      bankroll: parseFloat(bankroll),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/kelly-calculator",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setKellyResult(response.data);
      setKellyError(null);
    } catch (err) {
      setKellyError("Error calculating Kelly bet.");
      setKellyResult(null);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Betting Calculators
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveCalculator("poisson")}
          className={`px-6 py-3 rounded-l-lg font-semibold ${
            activeCalculator === "poisson"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Poisson Calculator
        </button>
        <button
          onClick={() => setActiveCalculator("kelly")}
          className={`px-6 py-3 rounded-r-lg font-semibold ${
            activeCalculator === "kelly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Kelly Calculator
        </button>
      </div>

      {/* Poisson Calculator */}
      {activeCalculator === "poisson" && (
        <div className="bg-green-600 rounded-xl shadow-lg p-8">
          <form>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Home Team Stats */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Home Team Stats
                </h2>
                <input
                  type="number"
                  placeholder="Goals Scored"
                  min="0"
                  step="1"
                  value={homeGoalsScored}
                  onChange={(e) => setHomeGoalsScored(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                  type="number"
                  placeholder="Goals Conceded"
                  min="0"
                  step="1"
                  value={homeGoalsConceded}
                  onChange={(e) => setHomeGoalsConceded(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                  type="number"
                  placeholder="Matches Played"
                  min="1"
                  step="1"
                  value={homeMatchesPlayed}
                  onChange={(e) => setHomeMatchesPlayed(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </div>

              {/* Away Team Stats */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Away Team Stats
                </h2>
                <input
                  type="number"
                  placeholder="Goals Scored"
                  min="0"
                  step="1"
                  value={awayGoalsScored}
                  onChange={(e) => setAwayGoalsScored(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                  type="number"
                  placeholder="Goals Conceded"
                  min="0"
                  step="1"
                  value={awayGoalsConceded}
                  onChange={(e) => setAwayGoalsConceded(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                  type="number"
                  placeholder="Matches Played"
                  min="1"
                  step="1"
                  value={awayMatchesPlayed}
                  onChange={(e) => setAwayMatchesPlayed(e.target.value)}
                  className="w-full p-3 rounded-lg mb-4 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={calculatePoisson}
              className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Calculate Poisson Probabilities
            </button>
          </form>

          {/* Error Message */}
          {poissonError && (
            <p className="mt-4 text-red-600 font-semibold">{poissonError}</p>
          )}

          {/* Results */}
          {poissonResults && (
            <div
              id="poisson-results"
              className="mt-8 text-gray-800 bg-gray-50 rounded-xl p-6 shadow-inner"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-700">
                Poisson Probability Results
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-200 p-3 text-left">
                        Outcome
                      </th>
                      <th className="border border-blue-200 p-3 text-left">
                        Probability (%)
                      </th>
                      <th className="border border-blue-200 p-3 text-left">
                        Fair Odds
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(poissonResults["1X2_probabilities"]).map(
                      ([key, value]) => (
                        <tr key={key} className="hover:bg-blue-50">
                          <td className="border border-blue-200 p-3">{key}</td>
                          <td className="border border-blue-200 p-3">{value}</td>
                          <td className="border border-blue-200 p-3">
                            {poissonResults["1X2_fair_odds"][key]}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kelly Calculator */}
      {activeCalculator === "kelly" && (
        <div className="bg-blue-500 rounded-xl shadow-lg p-8">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-2 text-white font-semibold">
                  Odds
                </label>
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
                <label className="block mb-2 text-white font-semibold">
                  Fair Odds
                </label>
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
                <label className="block mb-2 text-white font-semibold">
                  Probability (%)
                </label>
                <input
                  type="number"
                  readOnly
                  placeholder="Auto-calculated"
                  value={fairOdds ? calculateProbability().toFixed(2) : ""}
                  className="w-full p-3 rounded-lg text-gray-800 border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block mb-2 text-white font-semibold">
                  Bankroll
                </label>
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

          {/* Error Message */}
          {kellyError && (
            <p className="mt-4 text-red-600 font-semibold">{kellyError}</p>
          )}

          {/* Results */}
          {kellyResult && (
            <div className="mt-8 text-gray-800 bg-gray-50 rounded-xl p-6 shadow-inner">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">
                Kelly Bet Calculation
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-3 text-left">
                      Kelly Bet
                    </th>
                    <th className="border border-blue-200 p-3 text-left">
                      Kelly Fraction (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border border-blue-200 p-3">
                      {kellyResult.kelly_bet}
                    </td>
                    <td className="border border-blue-200 p-3">
                      {kellyResult.kelly_fraction}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CombinedCalculator;