import TeamDetails from "../player-stats/TeamDetails";

function HomePlayerStats() {
  const searchParams = new URLSearchParams(location.search);

  const league = searchParams.get("league");

  const team = searchParams.get("home");

  const season= searchParams.get("season") ||"2024"


  return <TeamDetails seasonId={season}  teamId={team} />;
}

export default HomePlayerStats;
