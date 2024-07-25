import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getLeagueTeams } from "../../../services/apiTeams";
import Loader from "../../../ui/Loader";

const data = [
  {
    name: "Žilina",
    logo: "/assets/img/dashboard/3554.png",
    players: "27",
  },
  { name: "Aarhus", logo: "/assets/img/dashboard/406.png", players: "20" },
  { name: "Aberdeen", logo: "/assets/img/dashboard/252.png", players: "24" },
  {
    name: "Adana Demirspor",
    logo: "/assets/img/dashboard/3563.png",
    players: "30",
  },
  { name: "AEK Larnaca", logo: "/assets/img/dashboard/614.png", players: "28" },
];

function LeagueTeams({ country }) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
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

  if (loading) return <Loader />;

  return (
    <section>
      {/* <div className="mb-6 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <h3 className="bg-DbRowHeaderGradient text-white">
          UEFA Europa Conference League
        </h3>
        <p>Season 2023 of Cup in World</p>
      </div> */}
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
            {/* <p>
              {team.players} players in {team.teams} teams
            </p> */}
          </Link>
        ))}
      </section>
    </section>
  );
}

export default LeagueTeams;
