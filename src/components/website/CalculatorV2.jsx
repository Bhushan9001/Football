import React, { useState } from 'react';
import axios from 'axios';

const CalculatorV2 = () => {
 
    const [formData, setFormData] = useState({
        home_team: '',
        away_team: '',
        current_score_home: 0,
        current_score_away: 0,
        home_xg: 0,
        away_xg: 0,
        minutes_played: 0,
        possession_home: 50,
        possession_away: 50,
        shots_on_target_home: 0,
        shots_on_target_away: 0
      });
    
      const [result, setResult] = useState(null);
      const [error, setError] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: name.includes('possession') ? parseInt(value) : parseFloat(value)
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
    
        try {
          const response = await axios.post('http://45.119.47.81:5000/calculate', formData);
          setResult(response.data);
        } catch (err) {
          setError('An error occurred while calculating the probability.');
          console.error('Error:', err);
        }
      };
    
      return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Probability Calculator</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="home_team" className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
                <input type="text" id="home_team" name="home_team" value={formData.home_team} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="away_team" className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
                <input type="text" id="away_team" name="away_team" value={formData.away_team} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
    
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="current_score_home" className="block text-sm font-medium text-gray-700 mb-1">Home Score</label>
                <input type="number" id="current_score_home" name="current_score_home" value={formData.current_score_home} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="current_score_away" className="block text-sm font-medium text-gray-700 mb-1">Away Score</label>
                <input type="number" id="current_score_away" name="current_score_away" value={formData.current_score_away} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
    
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="home_xg" className="block text-sm font-medium text-gray-700 mb-1">Home xG</label>
                <input type="number" id="home_xg" name="home_xg" value={formData.home_xg} onChange={handleChange} required step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="away_xg" className="block text-sm font-medium text-gray-700 mb-1">Away xG</label>
                <input type="number" id="away_xg" name="away_xg" value={formData.away_xg} onChange={handleChange} required step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
    
            <div>
              <label htmlFor="minutes_played" className="block text-sm font-medium text-gray-700 mb-1">Minutes Played</label>
              <input type="number" id="minutes_played" name="minutes_played" value={formData.minutes_played} onChange={handleChange} required min="0" max="90" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
    
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="possession_home" className="block text-sm font-medium text-gray-700 mb-1">Home Possession %</label>
                <input type="number" id="possession_home" name="possession_home" value={formData.possession_home} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="possession_away" className="block text-sm font-medium text-gray-700 mb-1">Away Possession %</label>
                <input type="number" id="possession_away" name="possession_away" value={formData.possession_away} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
    
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="shots_on_target_home" className="block text-sm font-medium text-gray-700 mb-1">Home Shots on Target</label>
                <input type="number" id="shots_on_target_home" name="shots_on_target_home" value={formData.shots_on_target_home} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="shots_on_target_away" className="block text-sm font-medium text-gray-700 mb-1">Away Shots on Target</label>
                <input type="number" id="shots_on_target_away" name="shots_on_target_away" value={formData.shots_on_target_away} onChange={handleChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
    
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Probability
            </button>
          </form>
    
          {result && (
            <div className="mt-6 p-4 bg-green-100 rounded-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Result:</h3>
              <pre className="whitespace-pre-wrap text-sm text-green-700">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
    
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      );
}

export default CalculatorV2