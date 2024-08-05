import { useLocation } from "react-router-dom";
import LeaguesList from "./LeaguesList";
import LeagueTeams from "./LeagueTeams";
import TeamDetails from "./TeamDetails";
import PlayerDetails from "./player-details/PlayerDetails";

function PlayerStats() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const country = searchParams.get("country");

  const league = searchParams.get("league") || "";

  const team = searchParams.get("team") || "";

  const player = searchParams.get("player") || "";

  const season = searchParams.get("season") || "2024";

  if (country) {
    return <LeagueTeams country={country} />;
  } else if (player) {
    return (
      <PlayerDetails
        playerId={player}
        leagueId={league}
        seasonId={season}
        teamId={team}
      />
    );
  } else if (team) {
    return <TeamDetails teamId={team} seasonId={season}  />;
  } else return <LeaguesList />;
}

export default PlayerStats;
