import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllLeagues } from "../../../services/apiLeagues";
import Loader from "../../../ui/Loader";

function LeaguesList() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);

  useEffect(() => {
    const savedLeagues = JSON.parse(localStorage.getItem('favoriteLeagues') || '[]');
    setFavoriteLeagues(savedLeagues);

    (async () => {
      try {
        const response = await getAllLeagues();
        setLeagues(response.data.response);
        
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddLeague = (league) => {
    const savedLeagues = JSON.parse(localStorage.getItem('favoriteLeagues') || '[]');
    
    const leagueExists = savedLeagues.some(
      savedLeague => savedLeague.league.id === league.league.id
    );

    if (!leagueExists) {
      const updatedLeagues = [...savedLeagues, league];
      localStorage.setItem('favoriteLeagues', JSON.stringify(updatedLeagues));
      setFavoriteLeagues(updatedLeagues);
      toast.success('League added to favorites!');
    } else {
      toast.info('League already in favorites!');
    }
  };
  
  if (loading) return <Loader />;

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {leagues.map((league, i) => (
        <Link
          to={`?country=${league.country.name}`}
          key={i}
          className="rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]"
        >
          <h3 className="rounded-md bg-DbRowHeaderGradient p-1 text-white">
            {league.league.name}
          </h3>
          <img
            className="mx-auto max-h-20 py-[5px]"
            src={league.league.logo}
            alt={league.name}
          />
          <h4 className="my-2 font-medium">
            {league.league.type} in {league.country.name}
          </h4>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              handleAddLeague(league);
            }}
            className="mt-2 px-4 py-1 bg-dbPrimary text-white rounded hover:bg-dbSecondary transition"
          >
            Add to Favorites
          </button>
        </Link>
      ))}
    </section>
  );
}

export default LeaguesList;