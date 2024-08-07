import React, { useEffect, useState } from 'react';
import Loader from '../../../ui/Loader';

function OddsVisualizer({oddsResponse}) {
  const [oddsData, setOddsData] = useState(oddsResponse);
  console.log(oddsResponse)

  //  
  // useEffect(() => {
  //   // Replace this with the actual API call
  //   const fetchOddsData = async () => {
  //     const response = {
  //       "response": [
  //         {
  //           "league": {
  //             "id": 116,
  //             "name": "Vysshaya Liga",
  //             "country": "Belarus",
  //             "logo": "https://media.api-sports.io/football/leagues/116.png",
  //             "flag": "https://media.api-sports.io/flags/by.svg",
  //             "season": 2020
  //           },
  //           "fixture": {
  //             "id": 326090,
  //             "timezone": "UTC",
  //             "date": "2020-05-15T15:00:00+00:00",
  //             "timestamp": 1589554800
  //           },
  //           "update": "2020-05-15T09:49:32+00:00",
  //           "bookmakers": [
  //             {
  //               "id": 6,
  //               "name": "Bwin",
  //               "bets": [
  //                 {
  //                   "id": 38,
  //                   "name": "Exact Goals Number",
  //                   "values": [
  //                     { "value": 4, "odd": "7.00" },
  //                     { "value": 3, "odd": "4.40" },
  //                     { "value": 2, "odd": "3.40" },
  //                     { "value": "more 8", "odd": "251.00" },
  //                     { "value": 7, "odd": "101.00" },
  //                     { "value": "more 5", "odd": "8.00" },
  //                     { "value": 6, "odd": "31.00" },
  //                     { "value": 5, "odd": "14.00" },
  //                     { "value": 0, "odd": "6.25" },
  //                     { "value": 1, "odd": "3.90" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 20,
  //                   "name": "Double Chance - First Half",
  //                   "values": [
  //                     { "value": "Home/Draw", "odd": "1.20" },
  //                     { "value": "Home/Away", "odd": "1.75" },
  //                     { "value": "Draw/Away", "odd": "1.26" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 17,
  //                   "name": "Total - Away",
  //                   "values": [
  //                     { "value": "Under 2.5", "odd": "1.06" },
  //                     { "value": "Over 2.5", "odd": "7.25" },
  //                     { "value": "Under 1.5", "odd": "1.33" },
  //                     { "value": "Over 1.5", "odd": "3.10" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 16,
  //                   "name": "Total - Home",
  //                   "values": [
  //                     { "value": "Under 2.5", "odd": "1.09" },
  //                     { "value": "Over 2.5", "odd": "6.25" },
  //                     { "value": "Under 1.5", "odd": "1.40" },
  //                     { "value": "Over 1.5", "odd": "2.70" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 22,
  //                   "name": "Odd/Even - First Half",
  //                   "values": [
  //                     { "value": "Even", "odd": "1.60" },
  //                     { "value": "Odd", "odd": "2.20" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 30,
  //                   "name": "Win to Nil - Away",
  //                   "values": [
  //                     { "value": "Yes", "odd": "4.40" },
  //                     { "value": "No", "odd": "1.17" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 29,
  //                   "name": "Win to Nil - Home",
  //                   "values": [
  //                     { "value": "No", "odd": "1.22" },
  //                     { "value": "Yes", "odd": "3.75" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 8,
  //                   "name": "Both Teams Score",
  //                   "values": [
  //                     { "value": "No", "odd": "1.72" },
  //                     { "value": "Yes", "odd": "2.00" }
  //                   ]
  //                 }
  //               ]
  //             },
  //             {
  //               "id": 7,
  //               "name": "Bhushan",
  //               "bets": [
  //                 {
  //                   "id": 38,
  //                   "name": "Exact Goals Number",
  //                   "values": [
  //                     { "value": 4, "odd": "7.00" },
  //                     { "value": 3, "odd": "4.40" },
  //                     { "value": 2, "odd": "3.40" },
  //                     { "value": "more 8", "odd": "251.00" },
  //                     { "value": 7, "odd": "101.00" },
  //                     { "value": "more 5", "odd": "8.00" },
  //                     { "value": 6, "odd": "31.00" },
  //                     { "value": 5, "odd": "14.00" },
  //                     { "value": 0, "odd": "6.25" },
  //                     { "value": 1, "odd": "3.90" }
  //                   ]
  //                 },
  //                 {
  //                   "id": 8,
  //                   "name": "Both Teams Score",
  //                   "values": [
  //                     { "value": "No", "odd": "1.72" },
  //                     { "value": "Yes", "odd": "2.00" }
  //                   ]
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     };
  //     setOddsData(response.response);
      
  //   };

  //   fetchOddsData();
  // }, []);

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
