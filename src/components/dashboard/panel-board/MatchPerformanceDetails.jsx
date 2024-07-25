import { useLocation } from "react-router-dom";

function MatchPerformanceDetails({ data }) {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeamId = searchParms.get("home");

  const awayTeamId = searchParms.get("away");

  const homeTeamFilteredMinuteData = Object.entries(
    data.teams.home.league.goals.for.minute,
  ).filter(([key, value]) => value.total !== null);

  const awayTeamFilteredMinuteData = Object.entries(
    data.teams.away.league.goals.for.minute,
  ).filter(([key, value]) => value.total !== null);

  return (
    <section className="mb-10 flex gap-2 rounded-bl-lg rounded-br-lg px-2 pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      {/*========== Scoring Times START ========== */}
      <div className="flex-grow-[2]">
        <h3 className="mb-2 text-center font-semibold">Scoring Times</h3>
        <div className="mb-2 flex">
          <div className="flex flex-1 items-center justify-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-dbPrimary"></span>
            <span className="text-xs">{data.teams.home.name}</span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-dbSecondary"></span>
            <span className="text-xs">{data.teams.away.name}</span>
          </div>
        </div>

        {!homeTeamFilteredMinuteData.length ||
        !awayTeamFilteredMinuteData.length
          ? "No data"
          : homeTeamFilteredMinuteData.map((minute, i) => (
              <div key={i}>
                <div className="mb-2 flex items-center justify-center gap-2 text-xs">
                  <div>
                    <span>{minute[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-end gap-[2px]">
                      <div
                        className="h-4 rounded-xl bg-dbPrimary pl-1"
                        style={{ width: `${minute[1].total}0%` }}
                      ></div>
                      <span className="self-center">{minute[1].total}</span>
                    </div>
                    <div className="flex items-start gap-[2px]">
                      <div
                        className="h-4 rounded-xl bg-dbSecondary pl-1"
                        style={{
                          width: `${
                            awayTeamFilteredMinuteData[i]?.[1]?.total || 0
                          }0%`,
                        }}
                      ></div>
                      <span className="self-center">
                        {awayTeamFilteredMinuteData[i]?.[1]?.total || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      {/*========== Scoring Times END ========== */}

      {/*========== Correct FT Score START ========== */}
      <div className="hidden flex-grow-[1] text-xs">
        <h3 className="mb-2 text-center text-base font-semibold">
          Correct FT Score
        </h3>
        {/* Header */}
        <div className="flex rounded-xl bg-DbRowHeaderGradient p-1 text-white">
          <h6 className="flex-1">Score</h6>
          <h6 className="flex-1">Analysis</h6>
          <h6 className="flex-1">Prediction</h6>
        </div>
        {/* Body */}
        <div className="flex">
          <div className="flex-1 border-r-[1px] border-gray-400">
            <span className="inline-block py-1">0</span>
            <span className="inline-block py-1">-</span>
            <span className="inline-block py-1">1</span>
          </div>
          <p className="flex-1 border-r-[1px] border-gray-400 py-1">4.20</p>
          <p className="flex-1 py-1">8.59</p>
        </div>
        <div className="flex rounded-xl bg-[#efefef]">
          <div className="flex-1 border-r-[1px] border-gray-400">
            <span className="inline-block py-1">0</span>
            <span className="inline-block py-1">-</span>
            <span className="inline-block py-1">1</span>
          </div>
          <p className="flex-1 border-r-[1px] border-gray-400 py-1">4.20</p>
          <p className="flex-1 py-1">8.59</p>
        </div>
      </div>
      {/*========== Correct FT Score END ========== */}
    </section>
  );
}

export default MatchPerformanceDetails;
