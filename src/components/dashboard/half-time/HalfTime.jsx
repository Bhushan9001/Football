import { useEffect, useState } from "react";
import CorrectScoreHT from "./CorrectScoreHT";
import GoalAnalysis from "./GoalAnalysis";
import GoalPrediction from "./GoalPrediction";
import Overview from "./Overview";
import PrevMatchesHalfTimeResult from "./PrevMatchesHalfTimeResult";
import ScoringTimes from "./ScoringTimes";
import { getFixtureHead2HeadStats } from "../../../services/apiFixtures";
import { useLocation } from "react-router-dom";
import Loader from "../../../ui/Loader";
import { getMatchOutComePredictions } from "../../../services/apiPredictions";

function HalfTime() {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const fixtureId = searchParms.get("fixture");

  const [h2hData, setH2hData] = useState([]);

  const [matchOutComePredictions, setMatchOutComePredictions] = useState([]);
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const matchOutComePredictionsResponse =
        await getMatchOutComePredictions(fixtureId);

      setMatchOutComePredictions(
        matchOutComePredictionsResponse.response[0],
      );
        const response = await getFixtureHead2HeadStats(homeTeamId, awayTeamId);
        setH2hData(response.data.response);
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
      <Overview data={{ h2h: h2hData, homeTeamId, awayTeamId }} />
      {/* <GoalAnalysis /> */}
      {/* <GoalPrediction /> */}
      <div className="grid gap-6 ">
        <PrevMatchesHalfTimeResult data={h2hData} />
        {/* <CorrectScoreHT /> */}
        <ScoringTimes data={matchOutComePredictions} />
      </div>
    </>
  );
}

export default HalfTime;
