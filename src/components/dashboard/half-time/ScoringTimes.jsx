function ScoringTimes({ data }) {
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
          : homeTeamFilteredMinuteData.slice(0, 3).map((minute, i) => (
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
    </section>
  );
}

export default ScoringTimes;
