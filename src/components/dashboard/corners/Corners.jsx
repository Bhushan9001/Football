import { useEffect, useState } from "react";
import CornersOverUnderAnalysis from "./CornersOverUnderAnalysis";
import CornersOverUnderPrediction from "./CornersOverUnderPrediction";
import CornersPrediction from "./CornersPrediction";
import CorrectCornersAnalysisPrediction from "./CorrectCornersAnalysisPrediction";
import Overview from "./Overview";
import PrevMatchesCorners from "./PrevMatchesCorners";
import Loader from "../../../ui/Loader";
import { getAllFixtures, getFixtureStats } from "../../../services/apiFixtures";
import { useLocation } from "react-router-dom";

function Corners() {
  const [fixtureStats, setFixtureStats] = useState([]);
  const [homeTeamData, setHomeTeamData] = useState(null);
  const [awayTeamData, setAwayTeamData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);
  const homeTeamId = searchParms.get("home");
  const awayTeamId = searchParms.get("away");
  const leagueId = searchParms.get("league");
  const fixtureId = searchParms.get("fixture");
  const season = searchParms.get("season");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [homeResponse, awayResponse, fixturesResponse] = await Promise.all([
          getFixtureStats(homeTeamId, fixtureId),
          getFixtureStats(awayTeamId, fixtureId),
          getAllFixtures(leagueId, season),
        ]);

        const homeCorners = homeResponse.data.response[0]?.statistics?.find(
          (obj) => obj.type.toLowerCase() === "corner kicks"
        )?.value || 0;

        const awayCorners = awayResponse.data.response[0]?.statistics?.find(
          (obj) => obj.type.toLowerCase() === "corner kicks"
        )?.value || 0;

        const totalCornersForCurrentFixture = homeCorners + awayCorners;

        setHomeTeamData({
          name: homeResponse.data.response[0]?.team?.name || "",
          logo: homeResponse.data.response[0]?.team?.logo || "",
          corners: { value: homeCorners, total: totalCornersForCurrentFixture },
        });

        setAwayTeamData({
          name: awayResponse.data.response[0]?.team?.name || "",
          logo: awayResponse.data.response[0]?.team?.logo || "",
          corners: { value: awayCorners, total: totalCornersForCurrentFixture },
        });

        setLeagueData(fixturesResponse.data.response[0]?.league || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [homeTeamId, awayTeamId, leagueId, fixtureId]);

  if (loading) return <Loader />;
  
  return (
    <>
      <Overview data={{ home: homeTeamData, away: awayTeamData, league: leagueData }} />
      <CornersOverUnderAnalysis />
      <PrevMatchesCorners data={{home: homeTeamData, away: awayTeamData,league: leagueData }}/>
      <CornersOverUnderPrediction />
      <CornersPrediction />
      <CorrectCornersAnalysisPrediction />
    </>
  );
}

export default Corners;
