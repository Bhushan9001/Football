import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MatchOutComePrediction({ data }) {
  const location = useLocation();
  // Math.round((((1/draw)*100) + Number.EPSILON) * 100) / 100
  const searchParms = new URLSearchParams(location.search);
  const away = parseInt(data.predictions.percent.away.match(/\d+/)[0])
  const home = parseInt(data.predictions.percent.home.match(/\d+/)[0])
  const draw = parseInt(data.predictions.percent.draw.match(/\d+/)[0])
  
  

  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 font-medium">Match Outcome Prediction</h3>
      {/* 01 */}
      <div className="flex text-white">
        <div className="flex-1 text-center">
          <h3 className="rounded-bl-md rounded-tl-md bg-dbPrimary py-1">Home</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {(home==0)?"N/A":Math.round((((1/home*100)) + Number.EPSILON) * 100) / 100}%
          </p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="bg-DbRowHeaderGradient py-1">Draw</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {(draw==0)?"N/A":Math.round((((1/draw)*100) + Number.EPSILON) * 100) / 100}%
          </p>
        </div>
        <div className="flex-1">
          <h3 className="rounded-br-md rounded-tr-md bg-dbSecondary py-1 text-center">
            Away
          </h3>
          <p className="py-2 text-black">{(away==0)?"N/A":Math.round((((1/away)*100) + Number.EPSILON) * 100) / 100}%</p>
        </div>
      </div>
      <div className="flex text-white">
        <div className="flex-1 text-center">
          <h3 className="rounded-bl-md rounded-tl-md bg-dbPrimary py-1">Home</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {data.predictions.percent.home}
          </p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="bg-DbRowHeaderGradient py-1">Draw</h3>
          <p className="border-r-[1px] border-gray-400 py-2 text-black">
            {data.predictions.percent.draw}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="rounded-br-md rounded-tr-md bg-dbSecondary py-1 text-center">
            Away
          </h3>
          <p className="py-2 text-black">{data.predictions.percent.away}</p>
        </div>
      </div>
      {/* 02 */}
      
      {/* 03 */}
      
      {/* 04 */}
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
