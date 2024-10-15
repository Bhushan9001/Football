import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MatchOutComePrediction({ data }) {
  const location = useLocation();
  // const searchParms = new URLSearchParams(location.search);
  const away = data.predictions?.percent?.away ? parseInt(data.predictions.percent.away.match(/\d+/)[0]) : 0;
  const home = data.predictions?.percent?.home ? parseInt(data.predictions.percent.home.match(/\d+/)[0]) : 0;
  const draw = data.predictions?.percent?.draw ? parseInt(data.predictions.percent.draw.match(/\d+/)[0]) : 0;
  

  const calculatePercentage = (value) => {
    return (value === 0) ? "N/A" : Math.round((((1/value*100)) + Number.EPSILON) * 100) / 100;
  };

  const renderDataOrNA = (data) => data || 'No data available';

  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 font-medium">Match Outcome Prediction</h3>
      {/* Match Winner */}
      <div className="flex text-white mb-4">
        <div className="flex-1 text-center">
          <h3 className="rounded-bl-md rounded-tl-md bg-dbPrimary py-1">Home</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {calculatePercentage(home)}
          </p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="bg-DbRowHeaderGradient py-1">Draw</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {calculatePercentage(draw)}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="rounded-br-md rounded-tr-md bg-dbSecondary py-1 text-center">
            Away
          </h3>
          <p className="py-2 text-black">{calculatePercentage(away)}</p>
        </div>
      </div>
      <div className="flex text-white mb-4">
        <div className="flex-1 text-center">
          <h3 className="rounded-bl-md rounded-tl-md bg-dbPrimary py-1">Home</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {renderDataOrNA(data.predictions?.percent?.home)}
          </p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="bg-DbRowHeaderGradient py-1">Draw</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {renderDataOrNA(data.predictions?.percent?.draw)}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="rounded-br-md rounded-tr-md bg-dbSecondary py-1 text-center">
            Away
          </h3>
          <p className="py-2 text-black">{renderDataOrNA(data.predictions?.percent?.away)}</p>
        </div>
      </div>

      {/* Match winner */}
      <div className="mb-4">
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Match Winner</h3>
        <p className="py-2 text-black">
          {renderDataOrNA(data.predictions?.match_winner)}
        </p>
      </div>

      {/* Win or Draw */}
      <div className="mb-4">
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Win or Draw</h3>
        <p className="py-2 text-black">
          {data.predictions?.win_or_draw !== undefined ? (data.predictions.win_or_draw ? 'Yes' : 'No') : 'No data available'}
        </p>
      </div>

      {/* Under/Over */}
      <div className="mb-4">
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Under/Over</h3>
        <div className="flex flex-wrap justify-around py-2 text-black">
          {data.predictions?.under_over ? 
            Object.entries(data.predictions.under_over).map(([key, value]) => (
              <div key={key} className="px-2">
                <p>{key}: {value}</p>
              </div>
            ))
            : <p>No data available</p>
          }
        </div>
      </div>

      {/* Goals Home */}
      <div className="mb-4">
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Goals Home</h3>
        <div className="flex flex-wrap justify-around py-2 text-black">
          {data.predictions?.goals_home ? 
            Object.entries(data.predictions.goals_home).map(([key, value]) => (
              <div key={key} className="px-2">
                <p>{key}: {value}</p>
              </div>
            ))
            : <p>No data available</p>
          }
        </div>
      </div>

      {/* Goals Away */}
      <div className="mb-4">
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Goals Away</h3>
        <div className="flex flex-wrap justify-around py-2 text-black">
          {data.predictions?.goals_away ? 
            Object.entries(data.predictions.goals_away).map(([key, value]) => (
              <div key={key} className="px-2">
                <p>{key}: {value}</p>
              </div>
            ))
            : <p>No data available</p>
          }
        </div>
      </div>

      {/* Advice */}
      <div>
        <h3 className="bg-DbRowHeaderGradient py-1 text-white">Advice</h3>
        <p className="py-2 text-black">{renderDataOrNA(data.predictions?.advice)}</p>
      </div>

      {/* Hidden section */}
      <div className="!hidden text-black">
        <h3 className="rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient py-1 text-white">
          Correct FT Score
        </h3>
        <div className="flex items-center">
          <div className="flex-1 py-2">
            <span>1</span>
            <span>-</span>
            <span>1</span>
          </div>
          <div className="flex-1 py-1">
            <p className="rounded-2xl bg-DbRowHeaderGradient py-2 text-white">
              Analysis
            </p>
          </div>
          <h6 className="flex-1 py-2 font-medium">17.09%</h6>
        </div>
        <div className="flex items-center">
          <div className="flex-1 py-2">
            <span>1</span>
            <span>-</span>
            <span>1</span>
          </div>
          <div className="flex-1 py-1">
            <p className="rounded-2xl bg-DbRowHeaderGradient py-2 text-white">
              Prediction
            </p>
          </div>
          <h6 className="flex-1 py-2 font-medium">17.09%</h6>
        </div>
      </div>
    </section>
  );
}

export default MatchOutComePrediction;