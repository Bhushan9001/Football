function PrevMatchesHalfTimeResult({ data }) {
  const requiredData = data.slice(0, Math.min(data.length, 10));

  console.log(requiredData.length);

  return (
    <section className="rounded-bl-lg rounded-br-lg px-4 pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 font-medium">Last Ten Matches Half Time Results</h3>
      <div className="grid">
        {/* ================== */}
        {/*        Home        */}
        {/* ================== */}
        <div>
          {/* <h4 className="rounded-xl bg-dbPrimary py-1 text-white">
            Maccabi Petah Tikva
          </h4> */}

          {requiredData.map((fixture, i) => (
            <div key={i}>
              {/* FOR DESKTOP */}
              <div className="hidden md:block">
                {(i + 1) % 2 != 0 ? (
                  <div className="flex items-center">
                    <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                      <div className="py-2">
                        <span>{fixture.teams.home.name}</span>
                        <span className="mx-2">-</span>
                        <span>{fixture.teams.away.name}</span>
                      </div>
                    </div>
                    <div className="flex-grow border-r-[1px] border-gray-400">
                      <div className="py-2">
                        <span>{fixture.score.halftime.home}</span>
                        <span className="mx-2">-</span>
                        <span>{fixture.score.halftime.away}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                      <div className="rounded-2xl bg-[#efefef] py-2">
                        <span>{fixture.teams.home.name}</span>
                        <span className="mx-2">-</span>
                        <span>{fixture.teams.away.name}</span>
                      </div>
                    </div>
                    <div className="flex-grow border-r-[1px] border-gray-400">
                      <div className="rounded-2xl bg-[#efefef] py-2">
                        <span>{fixture.score.halftime.home}</span>
                        <span className="mx-2">-</span>
                        <span>{fixture.score.halftime.away}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* FOR MOBILE */}
              <div className="md:hidden">
                {(i + 1) % 2 != 0 ? (
                  <div className="flex flex-col rounded-2xl px-2">
                    <div>
                      <div className="flex">
                        <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                          <span className="inline-block py-1">
                            {fixture.teams.home.name}
                          </span>
                        </div>
                        <span className="max-w-[20%] flex-1 px-2 py-1">
                          {fixture.score.halftime.home}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex">
                        <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                          <span className="inline-block py-1">
                            {fixture.teams.away.name}
                          </span>
                        </div>
                        <span className="max-w-[20%] flex-1 px-2 py-1">
                          {fixture.score.halftime.away}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col rounded-2xl bg-[#efefef] px-2">
                    <div>
                      <div className="flex">
                        <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                          <span className="inline-block py-1">
                            {fixture.teams.home.name}
                          </span>
                        </div>
                        <span className="max-w-[20%] flex-1 px-2 py-1">
                          {fixture.score.halftime.home}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex">
                        <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                          <span className="inline-block py-1">
                            {fixture.teams.away.name}
                          </span>
                        </div>
                        <span className="max-w-[20%] flex-1 px-2 py-1">
                          {fixture.score.halftime.away}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrevMatchesHalfTimeResult;
