import TeamDetails from "../player-stats/TeamDetails";

function AwayPlayerStats() {
  const searchParams = new URLSearchParams(location.search);



  const team = searchParams.get("away");

  const season = searchParams.get("season") || "2024"

  return <TeamDetails seasonId={season} teamId={team} />;
}

export default AwayPlayerStats;
