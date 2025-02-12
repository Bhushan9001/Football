import { useLocation } from "react-router-dom";
import { useEffect ,useState } from "react";
import Loader from "../../../ui/Loader";
import axios from 'axios';

function Odds() {

  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const fixtureId = searchParms.get("fixture");

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const league = searchParms.get("league");

  const season = searchParms.get("season");

  const [bookmakers, setBookmakers] = useState([]);
  const [selectedBookmaker, setSelectedBookmaker] = useState('');
  const [oddsData, setOddsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBetIndex, setCurrentBetIndex] = useState(0);
  const [currentValuePage, setCurrentValuePage] = useState(1);
  const valuesPerPage = 5;

  useEffect(() => {
    const fetchBookmakers = async () => {
      try {
        const response = await axios.get(
          'https://v3.football.api-sports.io/odds/bookmakers',
          {
            headers:{
              'Content-Type': 'application/json',
              'x-rapidapi-host':'v3.football.api-sports.io',
              'x-rapidapi-key': import.meta.env.VITE_API_KEY
            } 
          }
        );
        setBookmakers(response.data.response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBookmakers();
  }, []);

  useEffect(() => {
    if (selectedBookmaker) {
      fetchOdds();
    }
  }, [selectedBookmaker]);

  const fetchOdds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://v3.football.api-sports.io/odds',
        {
          params: {
            season: season,
            bet: '4',
            bookmaker: selectedBookmaker,
            fixture: fixtureId,
            league: league,
            timezone: 'Europe/London',
          },
          headers:{
            'Content-Type': 'application/json',
            'x-rapidapi-host':'v3.football.api-sports.io',
            'x-rapidapi-key': import.meta.env.VITE_API_KEY
          } 
        }
      );
      setOddsData(response.data);
      console.log(response)
      setCurrentBetIndex(0);
      setCurrentValuePage(1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleBookmakerChange = (event) => {
    setSelectedBookmaker(event.target.value);
  };

  if (loading) return <Loader/>
  if (error) return <div>Error: {error}</div>;

  const handleNextBet = () => {
    if (oddsData && oddsData.response[0].bookmakers[0].bets) {
      setCurrentBetIndex((prevIndex) => (prevIndex + 1) % oddsData.response[0].bookmakers[0].bets.length);
      setCurrentValuePage(1);
    }
  };

  const handlePrevBet = () => {
    if (oddsData && oddsData.response[0].bookmakers[0].bets) {
      setCurrentBetIndex((prevIndex) => (prevIndex - 1 + oddsData.response[0].bookmakers[0].bets.length) % oddsData.response[0].bookmakers[0].bets.length);
      setCurrentValuePage(1);
    }
  };

  const handleNextValuePage = () => {
    if (oddsData && oddsData.response[0].bookmakers[0].bets) {
      const totalValuePages = Math.ceil(oddsData.response[0].bookmakers[0].bets[currentBetIndex].values.length / valuesPerPage);
      setCurrentValuePage((prevPage) => Math.min(prevPage + 1, totalValuePages));
    }
  };

  const handlePrevValuePage = () => {
    setCurrentValuePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="font-sans max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Odds Data</h2>
      
      <div className="mb-6">
        <label htmlFor="bookmaker-select" className="block mb-2">Select a bookmaker: </label>
        <select
          id="bookmaker-select"
          value={selectedBookmaker}
          onChange={handleBookmakerChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Bookmaker --</option>
          {bookmakers.map((bookmaker) => (
            <option key={bookmaker.id} value={bookmaker.id}>
              {bookmaker.name}
            </option>
          ))}
        </select>
      </div>

      {oddsData && oddsData.response && oddsData.response.length > 0 && oddsData.response[0].bookmakers && oddsData.response[0].bookmakers.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-center mb-4">{oddsData.response[0].bookmakers[0].name}</h3>
          
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevBet} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">&lt; Prev Bet</button>
            <h4 className="text-lg font-medium">{oddsData.response[0].bookmakers[0].bets[currentBetIndex].name}</h4>
            <button onClick={handleNextBet} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next Bet &gt;</button>
          </div>

          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border border-gray-300 text-left">Value</th>
                <th className="p-3 border border-gray-300 text-left">Odd</th>
              </tr>
            </thead>
            <tbody>
              {oddsData.response[0].bookmakers[0].bets[currentBetIndex].values
                .slice((currentValuePage - 1) * valuesPerPage, currentValuePage * valuesPerPage)
                .map((value, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border border-gray-300">{value.value}</td>
                    <td className="p-3 border border-gray-300">{value.odd}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrevValuePage} 
              disabled={currentValuePage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt; Prev Page
            </button>
            <span>
              Page {currentValuePage} of {Math.ceil(oddsData.response[0].bookmakers[0].bets[currentBetIndex].values.length / valuesPerPage)}
            </span>
            <button
              onClick={handleNextValuePage}
              disabled={currentValuePage === Math.ceil(oddsData.response[0].bookmakers[0].bets[currentBetIndex].values.length / valuesPerPage)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Page &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Odds;
