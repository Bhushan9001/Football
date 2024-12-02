import React, { useEffect, useState } from 'react';
import Loader from '../../../ui/Loader';

function OddsVisualizer({oddsResponse}) {
  const [oddsData, setOddsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOddsData = async () => {
      try {
        // Show loader for minimum 5 seconds
        const delay = new Promise(resolve => setTimeout(resolve, 10000));
        
        if (!oddsResponse?.response) {
          throw new Error('No odds data available');
        }
        
        setOddsData(oddsResponse.response);
        await delay; // Wait for 5 seconds
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOddsData();
  }, [oddsResponse]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !oddsData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-50 rounded-lg">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className='text-xl font-medium text-gray-600'>
          {error || 'Unable to load odds data. Please try again later.'}
        </h1>
      </div>
    );
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