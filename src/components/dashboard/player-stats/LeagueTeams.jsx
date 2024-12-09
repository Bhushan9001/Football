import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getLeagueTeams } from "../../../services/apiTeams";
import Loader from "../../../ui/Loader";

function LeagueTeams({ country }) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    // Load teams from localStorage
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    setFavoriteTeams(savedTeams);

    // Fetch teams data
    (async () => {
      try {
        const response = await getLeagueTeams(country);
        setTeams(response.data.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSaveTeam = (team) => {
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    
    const teamExists = savedTeams.some(
      savedTeam => savedTeam.team.id === team.team.id
    );

    if (!teamExists) {
      const updatedTeams = [...savedTeams, team];
      localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
      setFavoriteTeams(updatedTeams);
      toast.success('Team added to favorites!');
    } else {
      toast.info('Team already in favorites!');
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {teams.map((team, i) => (
        <Link
          to={`?team=${team.team.id}`}
          key={i}
          className="rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]"
        >
          <h3 className="rounded-md bg-DbRowHeaderGradient p-1 text-white">
            {team.team.name}
          </h3>
          <img
            className="mx-auto max-h-20 py-[5px]"
            src={team.team.logo}
            alt={team.team.name}
          />
          <h4 className="my-2 font-medium">{team.description}</h4>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              handleSaveTeam(team);
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

export default LeagueTeams;