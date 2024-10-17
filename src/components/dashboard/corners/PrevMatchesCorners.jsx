function PrevMatchesCorners({data}) {
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 font-medium">
        Last Ten Matches Corners in 90 Minutes
      </h3>
      <div className="grid grid-cols-2">
        <div>
          <h4 className="rounded-xl bg-dbPrimary py-1 text-white">
            {data.home.name}
          </h4>
          {/* FOR MOBILE */}
          <div className="md:hidden">
            {/* 01 */}
            <div className="flex flex-col rounded-2xl px-2">
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
            </div>
            {/* 02 */}
            <div className="flex flex-col rounded-2xl bg-[#efefef] px-2">
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
            </div>
          </div>
          {/* FOR DESKTOP */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.home.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="rounded-2xl bg-[#efefef] py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.home.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="rounded-2xl bg-[#efefef] py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.home.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="rounded-xl bg-dbSecondary py-1 text-white">
            {data.away.name}
          </h4>
          {/* FOR MOBILE */}
          <div className="md:hidden">
            {/* 01 */}
            <div className="flex flex-col rounded-2xl px-2">
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
            </div>
            {/* 02 */}
            <div className="flex flex-col rounded-2xl bg-[#efefef] px-2">
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex-1 border-r-[1px] border-gray-400 text-start">
                    <span className="inline-block py-1">{data.league.name}</span>
                  </div>
                  <span className="max-w-[20%] flex-1 px-2 py-1">0</span>
                </div>
              </div>
            </div>
          </div>
          {/* FOR DESKTOP */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.away.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="rounded-2xl bg-[#efefef] py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.away.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="rounded-2xl bg-[#efefef] py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow-[2] border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>{data.league.name}</span>
                  <span>-</span>
                  <span>{data.away.name}</span>
                </div>
              </div>
              <div className="flex-grow border-r-[1px] border-gray-400">
                <div className="py-2">
                  <span>0</span>
                  <span className="px-1">-</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrevMatchesCorners;
