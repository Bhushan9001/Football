import TeamDetails from "../player-stats/TeamDetails";

function AwayPlayerStats() {
  const searchParams = new URLSearchParams(location.search);

  const league = searchParams.get("league");

  const team = searchParams.get("away");

  return <TeamDetails leagueId={league} teamId={team} />;
}

export default AwayPlayerStats;
