import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../ui/Loader";
import axios from 'axios';

function Odds() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URL parameters
  const fixtureId = searchParams.get("fixture");
  const leagueId = searchParams.get("league");
  const seasonYear = searchParams.get("season");

  // State variables
  const [bookmakers, setBookmakers] = useState([]);
  const [availableBets, setAvailableBets] = useState([]);
  const [selectedBookmaker, setSelectedBookmaker] = useState('');
  const [currentBetIndex, setCurrentBetIndex] = useState(0);
  const [oddsData, setOddsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate selected bet ID
  const selectedBetId = availableBets.length > 0 
    ? availableBets[currentBetIndex]?.id 
    : null;

  // Fetch initial data (bookmakers and bets)
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookmakersRes, betsRes] = await Promise.all([
          axios.get('https://v3.football.api-sports.io/odds/bookmakers', {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': import.meta.env.VITE_API_KEY
            }
          }),
          axios.get('https://v3.football.api-sports.io/odds/bets', {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': import.meta.env.VITE_API_KEY
            }
          })
        ]);

        // Set bookmakers
        setBookmakers(bookmakersRes.data?.response || []);

        // Set available bets and initialize index
        const betsData = betsRes.data?.response || [];
        setAvailableBets(betsData);
        
        // Find default bet (Match Winner - id: 1)
        const defaultIndex = betsData.findIndex(bet => bet.id === 1);
        if (defaultIndex !== -1) {
          setCurrentBetIndex(defaultIndex);
        } else if (betsData.length > 0) {
          setCurrentBetIndex(0);
        }

      } catch (err) {
        console.error('Initial data fetch error:', err);
        setError('Failed to load initial data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch odds when parameters change
  useEffect(() => {
    const fetchOdds = async () => {
      if (!selectedBookmaker || !fixtureId || !leagueId || !seasonYear || !selectedBetId) return;

      setLoading(true);
      setError(null);
      setOddsData(null);

      try {
        const params = {
          season: seasonYear,
          bet: selectedBetId,
          bookmaker: selectedBookmaker,
          fixture: fixtureId,
          league: leagueId,
          timezone: 'Europe/London',
        };

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
  }, [selectedBookmaker, fixtureId, leagueId, seasonYear, selectedBetId]);

  // Handle Previous button click
  const handlePrevious = () => {
    setCurrentBetIndex(prev => Math.max(0, prev - 1));
  };

  // Handle Next button click
  const handleNext = () => {
    setCurrentBetIndex(prev => Math.min(availableBets.length - 1, prev + 1));
  };

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

      {/* Betting market navigation */}
      {availableBets.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentBetIndex === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentBetIndex === availableBets.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          <div className="text-center text-lg font-semibold">
            {availableBets[currentBetIndex]?.name}
          </div>
        </div>
      )}

      {/* Error messages */}
      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Odds display */}
      {oddsData && oddsData.response?.length > 0 ? (
        <div className="space-y-4">
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