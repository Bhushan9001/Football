import React, { useEffect, useState } from 'react';
import Loader from '../../../ui/Loader';

function OddsVisualizer({oddsResponse}) {
  const [oddsData, setOddsData] = useState();
  console.log(oddsResponse)

  //  
  useEffect(() => {
    // Replace this with the actual API call
    const fetchOddsData = async () => {
    
      setOddsData(oddsResponse);
      
    };

    fetchOddsData();
  }, []);

  if (!oddsData) {
    return <h1 className='text-center'>Could not fecth the data </h1>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-4">Football Fixture Odds</h1>
      {oddsData.map((data, index) => (
        <div key={index} className="mb-6 ">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{data.league.name} - {data.league.country}</h2>
            <img src={data.league.logo} alt={`${data.league.name} logo`} className="h-8"/>
            <p>{new Date(data.fixture.date).toLocaleString()}</p>
          </div>
          {data.bookmakers && data.bookmakers.map((bookmaker, bmIndex) => (
            <div key={bmIndex} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Bookmaker: {bookmaker.name}</h2>
              {bookmaker.bets.map((bet, betIndex) => (
                <div key={betIndex} className="mb-4">
                  <h3 className="text-lg font-semibold">{bet.name}</h3>
                  <table className="min-w-full bg-white border border-gray-300 text-center">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Value</th>
                        <th className="px-4 py-2 border-b">Odd</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bet.values.map((value, valueIndex) => (
                        <tr key={valueIndex}>
                          <td className="px-4 py-2 border-b">{value.value}</td>
                          <td className="px-4 py-2 border-b">{value.odd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OddsVisualizer;
