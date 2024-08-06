import {useState,useEffect} from 'react';
import FavouriteAllTimeStats from "./FavouriteAllTimeStats";
import MyPicks from "./MyPicks";
import RecentForm from "./RecentForm";
import TotalStats from "./TotalStats";
import { useLocation } from "react-router-dom";
import { getFixtureHead2HeadStats } from '../../../services/apiFixtures';
import Loader from "../../../ui/Loader";
import { getMatchOutComePredictions } from "../../../services/apiPredictions";

function Diary() {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const fixtureId = searchParms.get("fixture");

  const [loading ,setLoading] = useState(true);
  const [teams , setTeams] = useState({});
  const [matchOutComePredictions, setMatchOutComePredictions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const matchOutComePredictionsResponse =
        await getMatchOutComePredictions(fixtureId);

        setMatchOutComePredictions(
        matchOutComePredictionsResponse.response[0].predictions
      );
        const response = await getFixtureHead2HeadStats(homeTeamId, awayTeamId);
        
        setTeams(response.data.response[0].teams);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div>
        <TotalStats />
        <RecentForm />
        <FavouriteAllTimeStats />
      </div>
      {fixtureId?<MyPicks data = {teams} predictions = {matchOutComePredictions} />:<Loader/>}
    </div>
  );
}

export default Diary;
