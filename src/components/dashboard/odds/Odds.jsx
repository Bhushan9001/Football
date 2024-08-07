import { useLocation } from "react-router-dom";
import OddsVisualizer from "./OddsData";
import { useEffect ,useState } from "react";
import {getOdds} from "../../../services/apiOdds";
import Loader from "../../../ui/Loader";

function Odds() {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const fixtureId = searchParms.get("fixture");

//   const homeTeamId = searchParms.get("home");

//   const awayTeamId = searchParms.get("away");

  const league = searchParms.get("league");

  const season = searchParms.get("season");
  const [loading, setLoading] = useState(true);

  const [odds , setOdds] = useState([]);

 useEffect(()=>{
   (async()=>{
    try {
        const oddsList = await getOdds(season,fixtureId,league);
    setOdds(oddsList);
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
   })()
 },[])

 if (loading) return <Loader />;
  return(
    <OddsVisualizer oddsResponse = {odds}/>
  )
}

export default Odds;
