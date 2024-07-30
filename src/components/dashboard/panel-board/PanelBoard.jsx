import { useLocation } from "react-router-dom";
import BothTeamsToScore from "./BothTeamsToScore";
import GoalsAverageCard from "./GoalsAverageCard";
import HomeAwayGoalsCard from "./HomeAwayGoalsCard";
import LeagueSpecificStats from "./LeagueSpecificStats";
import LeagueStandings from "./LeagueStandings";
import MatchOutComePrediction from "./MatchOutComePrediction";
import MatchOverview from "./MatchOverview";
import MatchPerformanceDetails from "./MatchPerformanceDetails";
import OverUnderAnalysis from "./OverUnderAnalysis";
import OverUnderPrediction from "./OverUnderPrediction";
import PreviousMatchesList from "./PreviousMatchesList";
import TotalGoalsCard from "./TotalGoalsCard";
import { useEffect, useState } from "react";
import { getMatchOutComePredictions } from "../../../services/apiPredictions";
import Loader from "../../../ui/Loader";
import { getStandings } from "../../../services/apiStandings";
import {getOdds} from "../../../services/apiOdds";

function PanelBoard() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [leagueStandingsData, setLeagueStandingsData] = useState(null);

  const [matchOutComePredictions, setMatchOutComePredictions] = useState([]);

  const [odds , setOdds] = useState([]);

  const searchParms = new URLSearchParams(location.search);

  const fixtureId = searchParms.get("fixture");

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const league = searchParms.get("league");

  const season = searchParms.get("season");

  useEffect(() => {
    (async () => {
      try {
        const matchOutComePredictionsResponse =
          await getMatchOutComePredictions(fixtureId);

        setMatchOutComePredictions(
          matchOutComePredictionsResponse.response[0],
        );
        
        // const oddsList = await getOdds(season,fixtureId,league);
        // setOdds(oddsList);
        
        const leagueStandingsResponse = await getStandings(league, season);

        setLeagueStandingsData(leagueStandingsResponse.response[0].league);

        console.log(leagueStandingsData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <MatchOverview
        data={{
          league: matchOutComePredictions.league,
          teams: matchOutComePredictions.teams,
        }}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <LeagueSpecificStats
            data={{
              teams: matchOutComePredictions.teams,
              standings: leagueStandingsData,
            }}
          />
          <TotalGoalsCard
            goalsData={{ teams: matchOutComePredictions.teams }}
          />
          <HomeAwayGoalsCard
            goalsData={{ teams: matchOutComePredictions.teams }}
          />
        </div>
        <div>
          <MatchOutComePrediction data={matchOutComePredictions} />
          <MatchPerformanceDetails data={matchOutComePredictions} />
          {/* <GoalsAverageCard /> */}
        </div>
      </div>
      {/* <div className="grid gap-6 md:grid-cols-3">
        <OverUnderAnalysis />
        <BothTeamsToScore />
        <OverUnderPrediction />
      </div> */}
      <PreviousMatchesList data={matchOutComePredictions} />
      <LeagueStandings standingsData={leagueStandingsData} />
    </>
  );
}

export default PanelBoard;
