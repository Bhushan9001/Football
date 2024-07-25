function PreviousMatchesList({ data }) {
  const currentHomeTeamId = data.teams.home.id;

  const h2hArrayEndIndex = Math.min(data.h2h.length, 5);

  const h2h = data.h2h.slice(0, h2hArrayEndIndex);

  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 text-center text-base font-semibold">
        Previous Matches Lists
      </h3>
      {/* <div className="grid gap-6 text-sm md:grid-cols-3"> */}
      <div className="grid gap-6 text-sm">
        {/* ============ Team 1 Prev Matches ============ */}
        <div className="hidden">
          {/* Header */}
          {/* <h6 className=" rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient p-1 text-white">
            Maccabi Petah Tikva Matches
          </h6> */}
          {/* Body */}
          {/* <div className="grid grid-cols-[2fr_2fr_1fr_1fr]">
            <div className="border-r-[1px] border-gray-400">
              <span className="inline-block py-1 font-medium">
                Maccabi Haifa
              </span>
            </div>
            <p className="border-r-[1px] border-gray-400 py-1 text-dbPrimary">
              Maccabi Petah Tikva
            </p>
            <p className="py-1">5:0</p>
            <p className="py-1">1</p>
          </div> */}
          {/* <div className="grid grid-cols-[2fr_2fr_1fr_1fr] rounded-xl bg-[#efefef]">
            <div className="border-r-[1px] border-gray-400">
              <span className="inline-block py-1 text-dbPrimary">
                Maccabi Petah Tikva
              </span>
            </div>
            <p className="border-r-[1px] border-gray-400 py-1 font-medium">
              Hapoel Haifa
            </p>
            <p className="py-1">5:0</p>
            <p className="py-1">1</p>
          </div> */}
        </div>
        {/* ============ Both Teams HEAD-2-HEAD Matches ============ */}
        <div>
          {/* Header */}
          <h6 className=" rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient p-1 text-white">
            Head to Head
          </h6>
          {h2h.map((match, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2fr_2fr_1fr_1fr] ${
                (i + 1) % 2 === 0 ? "rounded-xl bg-[#efefef]" : ""
              }`}
            >
              <div className="border-r-[1px] border-gray-400">
                <span
                  className={`inline-block py-1 font-medium ${
                    match.teams.home.id == currentHomeTeamId
                      ? "text-dbPrimary"
                      : "text-black"
                  }`}
                >
                  {match.teams.home.name}
                </span>
              </div>
              <p
                className={`border-r-[1px] border-gray-400 py-1 ${
                  match.teams.away.id === currentHomeTeamId
                    ? "text-dbPrimary"
                    : "text-black"
                }`}
              >
                {match.teams.away.name}
              </p>
              <p className="py-1">
                {match.goals.home}:{match.goals.away}
              </p>
              <p className="py-1">
                {match.teams.home.winner
                  ? "1"
                  : match.teams.away.winner
                    ? "2"
                    : "X"}
              </p>
            </div>
          ))}
        </div>
        {/* ============ Team 2 Prev Matches ============ */}
        <div className="hidden">
          {/* Header */}
          {/* <h6 className=" rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient p-1 text-white">
            Ashdod Matches
          </h6> */}
          {/* Body */}
          {/* <div className="grid grid-cols-[2fr_2fr_1fr_1fr]">
            <div className="border-r-[1px] border-gray-400">
              <span className="inline-block py-1 font-medium">
                Maccabi Haifa
              </span>
            </div>
            <p className="border-r-[1px] border-gray-400 py-1 text-dbPrimary">
              Maccabi Petah Tikva
            </p>
            <p className="py-1">5:0</p>
            <p className="py-1">1</p>
          </div>
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr] rounded-xl bg-[#efefef]">
            <div className="border-r-[1px] border-gray-400">
              <span className="inline-block py-1 text-dbPrimary">
                Maccabi Petah Tikva
              </span>
            </div>
            <p className="border-r-[1px] border-gray-400 py-1 font-medium">
              Hapoel Haifa
            </p>
            <p className="py-1">5:0</p>
            <p className="py-1">1</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default PreviousMatchesList;
