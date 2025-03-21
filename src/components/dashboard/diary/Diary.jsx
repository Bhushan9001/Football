import { useState, useEffect } from 'react';
import FavouriteAllTimeStats from "./FavouriteAllTimeStats";
import MyPicks from "./MyPicks";
import RecentForm from "./RecentForm";
import TotalStats from "./TotalStats";
import { useLocation } from "react-router-dom";
import { getFixtureHead2HeadStats } from '../../../services/apiFixtures';
import Loader from "../../../ui/Loader";
import { getMatchOutComePredictions } from "../../../services/apiPredictions";
import Odds from '../odds/Odds';

function Diary() {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const fixtureId = searchParms.get("fixture");

  const season = searchParms.get("season");

  const league = searchParms.get("league");

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState({});
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
            console.log(response.data)
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
        <TotalStats
          
          season={season}
          team={homeTeamId}
          league={league}
          
          date="2024-11-15"
        />
        <RecentForm
          title={"Home team"}
          season={season}
          team={homeTeamId}
          league={league}
          date="2024-11-15"
        />
        <RecentForm
           title={"Away team"}
          season={season}
          team={awayTeamId}
          league={league}
          date="2024-11-15"
        />
        <FavouriteAllTimeStats />
      </div>
     <div>
     {fixtureId ? <MyPicks data={teams} predictions={matchOutComePredictions} /> : <Loader />}
     <Odds/>
     </div>
      
    </div>
  );
}

export default Diary;
