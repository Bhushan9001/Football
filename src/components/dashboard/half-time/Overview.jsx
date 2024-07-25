function Overview({ data }) {
  function getTeamById(teams, id) {
    console.log("tams", teams, id);
    if (teams.home.id == id) {
      return teams.home;
    } else if (teams.away.id == id) {
      return teams.away;
    }
  }

  return (
    <section className="sticky top-0 z-50">
      <div className=" mb-10 flex items-start gap-6 bg-white">
        {/* 01 */}
        <div className="flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
          <h3 className="bg-dbPrimary text-center text-white">
            {getTeamById(data.h2h[0].teams, data.homeTeamId).name}
          </h3>
          <div className="py-2">
            <img
              className="mx-auto max-h-20"
              src={getTeamById(data.h2h[0].teams, data.homeTeamId).logo}
              alt=""
            />
          </div>
        </div>
        {/* 02 */}
        <div className="hidden flex-grow-[2] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] md:block">
          <h3 className="bg-DbRowHeaderGradient text-center text-white">
            {data.h2h[0].league.name}
          </h3>
          <div className="py-2">
            <img
              className="mx-auto max-h-20"
              src={data.h2h[0].league.logo}
              alt=""
            />
          </div>
        </div>
        {/* 03 */}
        <div className="flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
          <h3 className="bg-dbSecondary text-center text-white">
            {getTeamById(data.h2h[0].teams, data.awayTeamId).name}
          </h3>
          <div className="py-2">
            <img
              className="mx-auto max-h-20"
              src={getTeamById(data.h2h[0].teams, data.awayTeamId).logo}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="hidden rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        {/* 01 */}
        <div className="mb-[1px] flex items-start justify-between">
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white">
              Average HT Goals Team
            </p>
            <p className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium">
              0.64
            </p>
          </div>
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white">
              Average HT Goals Team
            </p>
            <p className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium">
              0.64
            </p>
          </div>
        </div>
        {/* 02 */}
        <div className="mb-[1px] flex items-start justify-between">
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white">
              Average HT Goals Match
            </p>
            <p className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium">
              0.64
            </p>
          </div>
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white">
              Average HT Goals Match
            </p>
            <p className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium">
              0.64
            </p>
          </div>
        </div>
        {/* 03 */}
        <div className="mb-[1px] flex justify-between">
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white">
              Home Matches HT Form
            </p>
            <div className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium">
              <div className="flex justify-center gap-1 rounded-[inherit] text-center text-sm text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-red-900 p-1 text-xs uppercase">
                  l
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-gray-500 p-1 text-xs uppercase">
                  d
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-[45%] text-center">
            <p className="w-full max-w-[65%] rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white">
              Home Matches HT Form
            </p>
            <div className="w-full max-w-[35%] rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium">
              <div className="flex justify-center gap-1 rounded-[inherit] text-center text-sm text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-red-900 p-1 text-xs uppercase">
                  l
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-gray-500 p-1 text-xs uppercase">
                  d
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-green-900 p-1 text-xs uppercase">
                  w
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;
