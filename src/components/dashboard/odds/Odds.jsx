import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../ui/Loader";
import axios from 'axios';

function Odds() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URL parameters with validation
  const fixtureId = searchParams.get("fixture");
  const leagueId = searchParams.get("league");
  const seasonYear = searchParams.get("season");

  const [bookmakers, setBookmakers] = useState([]);
  const [selectedBookmaker, setSelectedBookmaker] = useState('');
  const [oddsData, setOddsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookmakers
  useEffect(() => {
    const fetchBookmakers = async () => {
      try {
        const response = await axios.get(
          'https://v3.football.api-sports.io/odds/bookmakers',
          {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': import.meta.env.VITE_API_KEY
            }
          }
        );
        setBookmakers(response.data?.response || []);
      } catch (err) {
        console.error('Bookmakers API Error:', err);
        setError('Failed to fetch bookmakers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookmakers();
  }, []);

  // Fetch odds when bookmaker is selected
  useEffect(() => {
    const fetchOdds = async () => {
      if (!selectedBookmaker || !fixtureId || !leagueId || !seasonYear) return;

      setLoading(true);
      setError(null);
      setOddsData(null);

      try {
        const params = {
          season: seasonYear,
          bet: 1, // Default to "Match Winner" bet type
          bookmaker: selectedBookmaker,
          fixture: fixtureId,
          league: leagueId,
          timezone: 'Europe/London',
        };

        console.log('Sending request with parameters:', params);

        const response = await axios.get(
          'https://v3.football.api-sports.io/odds',
          {
            params,
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': import.meta.env.VITE_API_KEY
            }
          }
        );

        console.log('Odds API Full Response:', response.data);

        // Handle empty response
        if (!response.data?.response?.length) {
          setError('No odds data available for this selection.');
          return;
        }

        setOddsData(response.data);
      } catch (err) {
        console.error('Odds API Error:', err);
        setError('Failed to fetch odds data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, [selectedBookmaker, fixtureId, leagueId, seasonYear]);

  if (loading) return <Loader />;

  return (
    <div className="font-sans max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Match Odds</h2>

      {/* Bookmaker selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Bookmaker:</label>
        <select
          value={selectedBookmaker}
          onChange={(e) => setSelectedBookmaker(e.target.value)}
          className="w-full p-2 border rounded-md bg-white"
        >
          <option value="">Choose a bookmaker...</option>
          {bookmakers.map((bm) => (
            <option key={bm.id} value={bm.id}>
              {bm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error messages */}
      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Data display */}
      {oddsData && oddsData.response?.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Odds Parameters:</h3>
            <pre className="text-sm bg-white p-2 rounded">
              {JSON.stringify(oddsData.parameters, null, 2)}
            </pre>
          </div>

          {/* Display odds data */}
          {oddsData.response.map((fixtureOdds, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-4">
                Bookmaker: {fixtureOdds.bookmakers[0].name}
              </h3>
              {fixtureOdds.bookmakers[0].bets.map((bet, betIndex) => (
                <div key={betIndex} className="mb-6">
                  <h4 className="text-md font-medium mb-2">{bet.name}</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border text-left">Value</th>
                        <th className="p-2 border text-left">Odd</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bet.values.map((value, valueIndex) => (
                        <tr key={valueIndex} className="hover:bg-gray-50">
                          <td className="p-2 border">{value.value}</td>
                          <td className="p-2 border">{value.odd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="text-center py-4 text-gray-500">
            No odds data available for the selected parameters.
          </div>
        )
      )}
    </div>
  );
}

export default Odds;