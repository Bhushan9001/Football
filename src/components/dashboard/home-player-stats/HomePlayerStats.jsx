import TeamDetails from "../player-stats/TeamDetails";

function HomePlayerStats() {
  const searchParams = new URLSearchParams(location.search);

  const league = searchParams.get("league");

  const team = searchParams.get("home");

  return <TeamDetails leagueId={league} teamId={team} />;
}

export default HomePlayerStats;
