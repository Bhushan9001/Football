import { useEffect, useState } from "react";
import MoreStats from "./MoreStats";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";
import Loader from "../../../../ui/Loader";
import { getTeamPlayerDetails } from "../../../../services/apiPlayers";
import { useLocation } from "react-router-dom";

function PlayerDetails() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const leagueId = searchParams.get("league") || "";

  const teamId = searchParams.get("team") || "";

  const playerId = searchParams.get("player") || "";

  const seasonId = searchParams.get("season") || "2024";

  const [loading, setLoading] = useState(false);

  const [playerDetails, setPlayerDetails] = useState(null);

  const [selectedTeamId, setSelectedTeamId] = useState("");

  const [statsData, setStatsData] = useState([]);

  const [selectedLeagueId, setSelectedLeagueId] = useState("");

  function findSelectedTeamLeagueObjectInArray() {
    return statsData.find((obj) => obj.league.id == selectedLeagueId);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
       
        const response = await getTeamPlayerDetails(playerId, seasonId);
        console.log(response);

        setPlayerDetails(response.data.response[0]);

        setStatsData(response.data.response[0].statistics);

        if (!selectedLeagueId) {
          // SET the first league as the current
          console.log( response.data)
          setSelectedLeagueId(
            response.data.response[0].statistics[0].league.id,
          );
        } else setSelectedLeagueId(leagueId);

        if (!selectedTeamId) {
          // SET the first team as the current
          setSelectedTeamId(response.data.response[0].statistics[0].team.id);
        } else setSelectedTeamId(teamId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [location.pathname, location.search]);

  console.log("leagueId", selectedLeagueId);

  if (loading) return <Loader />;
  return (
    <>
      <div className="mb-6 grid grid-cols-3 gap-6">
        <ProfileCard
          data={{
            name: playerDetails?.player.name,
            img: playerDetails?.player.photo,
            stats: [
              {
                field: "name",
                value: playerDetails?.player.name,
              },
              {
                field: "age",
                value: playerDetails?.player.age,
              },
              {
                field: "nationality",
                value: playerDetails?.player.nationality,
              },
              {
                field: "height",
                value: playerDetails?.player.height,
              },
              {
                field: "weight",
                value: playerDetails?.player.weight,
              },
            ],
          }}
        />

        <ProfileCard
          data={{
            name: findSelectedTeamLeagueObjectInArray()?.team.name,
            img: findSelectedTeamLeagueObjectInArray()?.team.logo,
            stats: [
              {
                field: "position",
                value: findSelectedTeamLeagueObjectInArray()?.games.position,
              },
              {
                field: "injured",
                value: playerDetails?.player.injured ? "Yes" : "No",
              },
              {
                field: "captain",
                value: findSelectedTeamLeagueObjectInArray()?.games.captain
                  ? "Yes"
                  : "No",
              },
              {
                field: "number",
                value: findSelectedTeamLeagueObjectInArray()?.games.number,
              },
              {
                field: "appearences",
                value: findSelectedTeamLeagueObjectInArray()?.games.appearences,
              },
            ],
          }}
        />

        <ProfileCard
          data={{
            name: findSelectedTeamLeagueObjectInArray()?.league.name,
            img: findSelectedTeamLeagueObjectInArray()?.league.logo,
            stats: [
              {
                field: "country",
                value: findSelectedTeamLeagueObjectInArray()?.league.country,
              },
              {
                field: "season",
                value: findSelectedTeamLeagueObjectInArray()?.league.season,
              },
              {
                field: "current season",
                value:
                  findSelectedTeamLeagueObjectInArray()?.league.season ==
                  seasonId
                    ? "Yes"
                    : "No",
              },
            ],
          }}
        />
      </div>
      {statsData

        .filter((stat) => stat.league.id == selectedLeagueId)
        .map((stat, i) => {
          const { team, league, games, ...filteredStat } = stat;

          return (
            <div key={i} className="mb-6 grid grid-cols-2 gap-6">
              {Object.entries(filteredStat).map(([key, value]) => (
                <div key={key}>
                  <StatsCard
                    data={{
                      name: key,
                      stats: Object.entries(value).map(
                        ([field, fieldValue]) => ({
                          field,
                          value: fieldValue,
                          ratio: !fieldValue
                            ? fieldValue
                            : fieldValue / games.appearences,
                        }),
                      ),
                    }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      <MoreStats
        data={statsData.filter((obj) => obj.league.id != selectedLeagueId)}
        setLeagueId={setSelectedLeagueId}
      />
    </>
  );
}

export default PlayerDetails;
