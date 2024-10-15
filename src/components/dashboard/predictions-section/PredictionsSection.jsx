import React, { useState, useEffect } from 'react';
import './PredictionsSection.css';

const PredictionsSection = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState('all');
  const [fixtureId, setFixtureId] = useState('');

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

  const renderPredictionData = () => {
    if (!predictions) return <p className="ps-no-data">No prediction data available</p>;

    switch (selectedData) {
      case 'matchWinner':
        return (
          <div className="ps-data-container">
            <h3>Match Winner</h3>
            <table className="ps-table">
              <tbody>
                <tr>
                  <th>Winner</th>
                  <td>{predictions.predictions?.winner?.name || 'Not available'}</td>
                </tr>
                <tr>
                  <th>Comment</th>
                  <td>{predictions.predictions?.winner?.comment || 'Not available'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'winOrDraw':
        return (
          <div className="ps-data-container">
            <h3>Win or Draw</h3>
            <table className="ps-table">
              <tbody>
                <tr>
                  <th>Result</th>
                  <td>{predictions.predictions?.win_or_draw ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'underOver':
        return (
          <div className="ps-data-container">
            <h3>Under/Over</h3>
            <table className="ps-table">
              <tbody>
                <tr>
                  <th>Value</th>
                  <td>{predictions.predictions?.under_over || 'Not available'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'goals':
        return (
          <div className="ps-data-container">
            <h3>Goals</h3>
            <table className="ps-table">
              <tbody>
                <tr>
                  <th>Home</th>
                  <td>{predictions.predictions?.goals?.home || 'Not available'}</td>
                </tr>
                <tr>
                  <th>Away</th>
                  <td>{predictions.predictions?.goals?.away || 'Not available'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'advice':
        return (
          <div className="ps-data-container">
            <h3>Advice</h3>
            <p className="ps-advice">{predictions.predictions?.advice || 'Not available'}</p>
          </div>
        );
      default:
        return (
          <div className="ps-data-container">
            <h3>All Predictions</h3>
            <table className="ps-table">
              <tbody>
                {Object.entries(predictions.predictions || {}).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="ps-predictions-section">
      <h2 className="ps-title">Football Match Predictions</h2>
      <div className="ps-input-container">
        <label htmlFor="fixture-id" className="ps-label">Enter Fixture ID: </label>
        <input
          id="fixture-id"
          type="number"
          value={fixtureId}
          onChange={(e) => setFixtureId(e.target.value)}
          className="ps-input"
        />
        <button onClick={fetchPredictions} className="ps-button">Get Predictions</button>
      </div>
      {loading && <div className="ps-loading">Loading predictions...</div>}
      {error && <div className="ps-error">Error: {error}</div>}
      {predictions && (
        <div className="ps-results">
          <div className="ps-data-selector">
            <label htmlFor="data-select" className="ps-label">Select data to display:</label>
            <select
              id="data-select"
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
              className="ps-select"
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