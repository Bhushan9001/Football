function MatchOverview({ data }) {
  return (
    <section className="sticky top-0 z-50 flex items-start gap-6 bg-white">
      {/* 01 */}
      <div className="mb-10 flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <h3 className="bg-dbPrimary text-center text-white">
          {data.teams.home.name}
        </h3>
        <div className="py-2">
          <img className="mx-auto max-h-20" src={data.teams.home.logo} alt="" />
        </div>
        <h3 className="bg-dbPrimary text-center text-sm text-white">
          Last 5 Matches Form
        </h3>
        <div className="flex justify-center gap-1 rounded-[inherit] bg-[#aee1ea] py-2 text-center text-sm text-white">
          {data.teams.home.league.form ? (
            data.teams.home.league.form
              .slice(-5)
              .split("")
              .map((result, index) => (
                <span
                  key={index}
                  className={`flex h-5 w-5 items-center justify-center rounded-sm ${
                    result === "W"
                      ? "bg-green-900"
                      : result === "L"
                        ? "bg-red-900"
                        : result === "D"
                          ? "bg-gray-500"
                          : ""
                  } p-1 text-xs uppercase`}
                >
                  {result}
                </span>
              ))
          ) : (
            <span className="text-black">N/A</span>
          )}
        </div>
      </div>
      {/* 02 */}
      <div className="mb-10 hidden flex-grow-[2] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] md:block">
        <h3 className="bg-DbRowHeaderGradient text-center text-white">
          {data.league.name}
          {/* - Tuesday, 16 January 2024 11:00 */}
        </h3>
        <div className="py-2">
          <img className="mx-auto max-h-20" src={data.league.logo} alt="" />
        </div>
      </div>
      {/* 03 */}
      <div className="mb-10 flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <h3 className="bg-dbSecondary text-center text-white">
          {data.teams.away.name}
        </h3>
        <div className="py-2">
          <img className="mx-auto max-h-20" src={data.teams.away.logo} alt="" />
        </div>
        <h3 className="bg-dbSecondary text-center text-sm text-white">
          Last 5 Matches Form
        </h3>
        <div className="flex justify-center gap-1 rounded-[inherit] bg-[#a9bedd] py-2 text-center text-white">
          {data.teams.away.league.form ? (
            data.teams.away.league.form
              .slice(-5)
              .split("")
              .map((result, index) => (
                <span
                  key={index}
                  className={`flex h-5 w-5 items-center justify-center rounded-sm ${
                    result === "W"
                      ? "bg-green-900"
                      : result === "L"
                        ? "bg-red-900"
                        : result === "D"
                          ? "bg-gray-500"
                          : ""
                  } p-1 text-xs uppercase`}
                >
                  {result}
                </span>
              ))
          ) : (
            <span className="text-black">N/A</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default MatchOverview;
