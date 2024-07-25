import { useLocation } from "react-router-dom";

const LOWER_LIMIT = 2;
const LOWER_LIMIT_PERCENTAGE = 15;

function LeagueSpecificStats({ data }) {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const homeTeamRank = data.standings[0].filter(
    (team) => team.team.id == homeTeamId,
  )[0]?.rank;

  const awayTeamRank = data.standings.standings[0].filter(
    (team) => team.team.id == awayTeamId,
  )[0]?.rank;

  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="text-center font-medium">Ligat Ha"al</h3>
      <div className="my-2 grid grid-cols-3 font-medium">
        <h5>{homeTeamRank}</h5>
        <h5>Position</h5>
        <h5>{awayTeamRank}</h5>
      </div>
      {/* ===========*/}
      {/* Total Start*/}
      {/* ===========*/}
      <div className="mb-4">
        <h3 className="mx-auto min-w-1 max-w-[50%] rounded-2xl bg-DbRowHeaderGradient py-1 text-center text-white">
          Total
        </h3>
        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.wins.total <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.wins.total}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.wins.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.wins.total > LOWER_LIMIT &&
                data.teams.home.league.fixtures.wins.total}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Won
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.wins.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.wins.total > LOWER_LIMIT &&
                data.teams.away.league.fixtures.wins.total}
            </div>
            {data.teams.away.league.fixtures.wins.total <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.wins.total}
          </div>
          {/*========= Away ========= */}
        </div>

        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.draws.total <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.draws.total}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.draws.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.draws.total > LOWER_LIMIT &&
                data.teams.home.league.fixtures.draws.total}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            X
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.draws.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.draws.total > LOWER_LIMIT &&
                data.teams.away.league.fixtures.draws.total}
            </div>
            {data.teams.away.league.fixtures.draws.total <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.draws.total}
          </div>
          {/*========= Away ========= */}
        </div>
        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.loses.total <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.loses.total}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.loses.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.loses.total > LOWER_LIMIT &&
                data.teams.home.league.fixtures.loses.total}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Lost
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.loses.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.loses.total > LOWER_LIMIT &&
                data.teams.away.league.fixtures.loses.total}
            </div>
            {data.teams.away.league.fixtures.loses.total <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.loses.total}
          </div>
          {/*========= Away ========= */}
        </div>
      </div>

      {/* =======================*/}
      {/* Home/Away Matches Start
      {/* =======================*/}
      <div className="mb-4">
        <h3 className="mx-auto min-w-1 max-w-[50%] rounded-2xl bg-DbRowHeaderGradient py-1 text-center text-white">
          Home and Away Matches
        </h3>
        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.wins.home <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.wins.home}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.wins.home /
                    data.teams.home.league.fixtures.played.home) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.wins.home > LOWER_LIMIT &&
                data.teams.home.league.fixtures.wins.home}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Won
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.wins.away /
                    data.teams.away.league.fixtures.played.away) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.wins.away > LOWER_LIMIT &&
                data.teams.away.league.fixtures.wins.away}
            </div>
            {data.teams.away.league.fixtures.wins.away <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.wins.away}
          </div>
          {/*========= Away ========= */}
        </div>
        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.draws.home <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.draws.home}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.draws.home /
                    data.teams.home.league.fixtures.played.home) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.draws.home > LOWER_LIMIT &&
                data.teams.home.league.fixtures.draws.home}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            X
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.draws.away /
                    data.teams.away.league.fixtures.played.away) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.draws.away > LOWER_LIMIT &&
                data.teams.away.league.fixtures.draws.away}
            </div>
            {data.teams.away.league.fixtures.draws.away <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.draws.away}
          </div>
          {/*========= Away ========= */}
        </div>
        <div className="flex items-center">
          {/*========= Home ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {data.teams.home.league.fixtures.loses.home <= LOWER_LIMIT &&
              data.teams.home.league.fixtures.loses.home}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.loses.home /
                    data.teams.home.league.fixtures.played.home) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {data.teams.home.league.fixtures.loses.home > LOWER_LIMIT &&
                data.teams.home.league.fixtures.loses.home}
            </div>
          </div>
          {/*========= Home ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Lost
          </div>
          {/*========= Away ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.loses.away /
                    data.teams.away.league.fixtures.played.away) *
                  100
                }%`,
              }}
            >
              {data.teams.away.league.fixtures.loses.away > LOWER_LIMIT &&
                data.teams.away.league.fixtures.loses.away}
            </div>
            {data.teams.away.league.fixtures.loses.away <= LOWER_LIMIT &&
              data.teams.away.league.fixtures.loses.away}
          </div>
          {/*========= Away ========= */}
        </div>
      </div>
      {/*================*/}
      {/*Total in % Start*/}
      {/*================*/}
      <div className="mb-4">
        <h3 className="mx-auto min-w-1 max-w-[50%] rounded-2xl bg-DbRowHeaderGradient py-1 text-center text-white">
          Total in %
        </h3>
        <div className="flex items-center">
          {/*========= Home WON ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {(data.teams.home.league.fixtures.wins.total /
              data.teams.home.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.home.league.fixtures.wins.total /
                  data.teams.home.league.fixtures.played.total) *
                  100,
              )}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.wins.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {(data.teams.home.league.fixtures.wins.total /
                data.teams.home.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.home.league.fixtures.wins.total /
                    data.teams.home.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
          </div>
          {/*========= Home WON ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Won
          </div>
          {/*========= Away WON ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.wins.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {(data.teams.away.league.fixtures.wins.total /
                data.teams.away.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.away.league.fixtures.wins.total /
                    data.teams.away.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
            {(data.teams.away.league.fixtures.wins.total /
              data.teams.away.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.away.league.fixtures.wins.total /
                  data.teams.away.league.fixtures.played.total) *
                  100,
              )}
          </div>
          {/*========= Away WON ========= */}
        </div>
        <div className="flex items-center">
          {/*========= Home DRAW ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {(data.teams.home.league.fixtures.draws.total /
              data.teams.home.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.home.league.fixtures.draws.total /
                  data.teams.home.league.fixtures.played.total) *
                  100,
              )}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.draws.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {(data.teams.home.league.fixtures.draws.total /
                data.teams.home.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.home.league.fixtures.draws.total /
                    data.teams.home.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
          </div>
          {/*========= Home DRAW ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            X
          </div>
          {/*========= Away DRAW ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.draws.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {(data.teams.away.league.fixtures.draws.total /
                data.teams.away.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.away.league.fixtures.draws.total /
                    data.teams.away.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
            {(data.teams.away.league.fixtures.draws.total /
              data.teams.away.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.away.league.fixtures.draws.total /
                  data.teams.away.league.fixtures.played.total) *
                  100,
              )}
          </div>
          {/*========= Away DRAW ========= */}
        </div>
        <div className="flex items-center">
          {/*========= Home LOST ========= */}
          <div className="flex flex-1 justify-end gap-1">
            {(data.teams.home.league.fixtures.loses.total /
              data.teams.home.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.home.league.fixtures.loses.total /
                  data.teams.home.league.fixtures.played.total) *
                  100,
              )}
            <div
              style={{
                width: `${
                  (data.teams.home.league.fixtures.loses.total /
                    data.teams.home.league.fixtures.played.total) *
                  100
                }%`,
              }}
              className="min-w-1 rounded-2xl bg-dbPrimary text-white"
            >
              {(data.teams.home.league.fixtures.loses.total /
                data.teams.home.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.home.league.fixtures.loses.total /
                    data.teams.home.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
          </div>
          {/*========= Home LOST ========= */}
          <div className=" min-w-[150px] rounded-md bg-[#efefef] py-3 text-sm">
            Lost
          </div>
          {/*========= Away LOST ========= */}
          <div className="flex flex-1 gap-1">
            <div
              className="min-w-1 rounded-2xl bg-dbSecondary text-white"
              style={{
                width: `${
                  (data.teams.away.league.fixtures.loses.total /
                    data.teams.away.league.fixtures.played.total) *
                  100
                }%`,
              }}
            >
              {(data.teams.away.league.fixtures.loses.total /
                data.teams.away.league.fixtures.played.total) *
                100 >
                LOWER_LIMIT_PERCENTAGE &&
                parseInt(
                  (data.teams.away.league.fixtures.loses.total /
                    data.teams.away.league.fixtures.played.total) *
                    100,
                )}
              %
            </div>
            {(data.teams.away.league.fixtures.loses.total /
              data.teams.away.league.fixtures.played.total) *
              100 <=
              LOWER_LIMIT_PERCENTAGE &&
              parseInt(
                (data.teams.away.league.fixtures.loses.total /
                  data.teams.away.league.fixtures.played.total) *
                  100,
              )}
          </div>
          {/*========= Away LOST ========= */}
        </div>
      </div>
    </section>
  );
}

export default LeagueSpecificStats;
