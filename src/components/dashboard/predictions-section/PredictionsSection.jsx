import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";



  
const PredictionsSection = () => {

  const location = useLocation();

const searchParms = new URLSearchParams(location.search);

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState('all');
  const [fixtureId, setFixtureId] = useState(searchParms.get("fixture"));

  useEffect(() => {
    if (fixtureId) {
      fetchPredictions();
    }
  }, [fixtureId]);

  

  const fetchPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`, {
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        },
      });
      const data = await response.json();
      console.log('API Response:', data);
      if (data.errors && Object.keys(data.errors).length > 0) {
        setError(`API Error: ${JSON.stringify(data.errors)}`);
      } else if (data.response && data.response.length > 0) {
        setPredictions(data.response[0]);
      } else {
        setError('No prediction data available');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch predictions');
    } finally {
      setLoading(false);
    }
  };

  const renderTeamHeader = () => {
    if (!predictions) return null;

    return (
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center">
          {/* Home Team */}
          <div className="flex flex-col items-center space-y-2">
            <img 
              src={predictions.teams?.home?.logo} 
              alt={predictions.teams?.home?.name}
              className="w-20 h-20 object-contain"
            />
            <h3 className="text-white font-bold text-lg">{predictions.teams?.home?.name}</h3>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center text-white">
            <div className="text-3xl font-bold mb-2">VS</div>
            <div className="bg-blue-800 px-4 py-2 rounded-full">
              <span className="font-semibold">{predictions.league?.name}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center space-y-2">
            <img 
              src={predictions.teams?.away?.logo} 
              alt={predictions.teams?.away?.name}
              className="w-20 h-20 object-contain"
            />
            <h3 className="text-white font-bold text-lg">{predictions.teams?.away?.name}</h3>
          </div>
        </div>
      </div>
    );
  };

  const renderPredictionData = () => {
    if (!predictions) return <p className="text-gray-500 text-center">No prediction data available</p>;
  
    const formatPercent = (percentObj) => {
      return (
        <div className="flex justify-between gap-4">
          <span>Home: {percentObj.home}</span>
          <span>Draw: {percentObj.draw}</span>
          <span>Away: {percentObj.away}</span>
        </div>
      );
    };
  
    const renderTable = () => (
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Winner</th>
              <td className="py-3 text-right text-gray-800">
                {predictions.predictions?.winner?.name} ({predictions.predictions?.winner?.comment})
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Win Or Draw</th>
              <td className="py-3 text-right text-gray-800">
                {predictions.predictions?.win_or_draw ? 'Yes' : 'No'}
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Under/Over</th>
              <td className="py-3 text-right text-gray-800">
                {predictions.predictions?.under_over || 'Not available'}
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Goals Prediction</th>
              <td className="py-3 text-right text-gray-800">
                Home: {predictions.predictions?.goals?.home}, 
                Away: {predictions.predictions?.goals?.away}
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Advice</th>
              <td className="py-3 text-right text-gray-800">
                {predictions.predictions?.advice}
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-3 text-left text-gray-600">Win Probability</th>
              <td className="py-3 text-right text-gray-800">
                {predictions.predictions?.percent && formatPercent(predictions.predictions.percent)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  
    // Render different sections based on selection
    switch (selectedData) {
      case 'matchWinner':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Match Winner</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg">
                <span className="font-semibold">{predictions.predictions?.winner?.name}</span> is predicted to 
                {predictions.predictions?.winner?.comment.toLowerCase()}
              </p>
            </div>
          </div>
        );
  
      case 'winOrDraw':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Win or Draw Prediction</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg">
                {predictions.predictions?.win_or_draw ? 'Yes, team will win or draw' : 'No, team might lose'}
              </p>
            </div>
          </div>
        );
  
      case 'goals':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Goals Prediction</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-600">Home Team</p>
                  <p className="text-xl font-semibold">{predictions.predictions?.goals?.home}</p>
                </div>
                <div>
                  <p className="text-gray-600">Away Team</p>
                  <p className="text-xl font-semibold">{predictions.predictions?.goals?.away}</p>
                </div>
              </div>
            </div>
          </div>
        );
  
      case 'advice':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Betting Advice</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg">{predictions.predictions?.advice}</p>
            </div>
          </div>
        );
  
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">All Predictions</h3>
            {renderTable()}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
     
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <label htmlFor="fixture-id" className="text-gray-700 font-medium">
              Fixture ID:
            </label>
            <input
              id="fixture-id"
              type="number"
              value={fixtureId}
              onChange={(e) => setFixtureId(e.target.value)}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button 
            onClick={fetchPredictions}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Predictions
          </button>
        </div>
      </div>
      {renderTeamHeader()}

      {loading && (
        <div className="text-center text-gray-600">
          Loading predictions...
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      {predictions && (
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <select
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
              className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Data</option>
              <option value="matchWinner">Match Winner</option>
              <option value="winOrDraw">Win or Draw</option>
              <option value="underOver">Under/Over</option>
              <option value="goals">Goals</option>
              <option value="advice">Advice</option>
            </select>
          </div>
          {renderPredictionData()}
        </div>
      )}
    </div>
  );
};

export default PredictionsSection;