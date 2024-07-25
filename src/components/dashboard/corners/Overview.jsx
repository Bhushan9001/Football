function Overview({ data }) {
  return (
    <>
      <section className="sticky top-0 z-50">
        <div className="mb-10 flex items-start gap-6 bg-white">
          {/* 01 */}
          <div className="flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
            <h3 className="bg-dbPrimary text-center text-white">
              {data.home.name}
            </h3>
            <div className="py-2">
              <img className="mx-auto max-h-20" src={data.home.logo} alt="" />
            </div>
          </div>
          {/* 02 */}
          <div className="hidden flex-grow-[2] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] md:block">
            <h3 className="bg-DbRowHeaderGradient text-center text-white">
              {data.league.name}
            </h3>
            <div className="py-2">
              <img className="mx-auto max-h-20" src={data.league.logo} alt="" />
            </div>
          </div>
          {/* 03 */}
          <div className="flex-grow-[1] rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
            <h3 className="bg-dbSecondary text-center text-white">
              {data.away.name}
            </h3>
            <div className="py-2">
              <img className="mx-auto max-h-20" src={data.away.logo} alt="" />
            </div>
          </div>
        </div>
      </section>
      <div className="mb-6 rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        {/* 01 */}
        <div className="mb-[1px] flex items-start justify-between gap-4 md:gap-0">
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white md:max-w-[65%]">
              Average Home Corners Team
            </p>
            <p className="w-full rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium md:max-w-[35%]">
              {(data.home.corners.value / data.home.corners.total).toFixed(2)}
            </p>
          </div>
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white md:max-w-[65%]">
              Average Away Corners Team
            </p>
            <p className="w-full rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium md:max-w-[35%]">
              {(data.away.corners.value / data.away.corners.total).toFixed(2)}
            </p>
          </div>
        </div>
        {/* 02 */}
        <div className="mb-[1px] flex items-start justify-between gap-4 md:gap-0">
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white md:max-w-[65%]">
              Average Corners Match
            </p>
            <p className="w-full rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium md:max-w-[35%]">
              0.64
            </p>
          </div>
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white md:max-w-[65%]">
              Average Corners Match
            </p>
            <p className="w-full rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium md:max-w-[35%]">
              0.64
            </p>
          </div>
        </div>
        {/* 03 */}
        <div className="mb-[1px] flex justify-between gap-4 md:gap-0">
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbPrimary py-1 text-white md:max-w-[65%]">
              Home Matches Corners Form
            </p>
            <div className="w-full rounded-br-md rounded-tr-md bg-[#ade0e9] py-1 font-medium md:max-w-[35%]">
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
          <div className="flex w-full flex-col text-center md:w-[45%] md:flex-row">
            <p className="w-full rounded-bl-md rounded-tl-md bg-dbSecondary py-1 text-white md:max-w-[65%]">
              Home Matches Corners Form
            </p>
            <div className="w-full rounded-br-md rounded-tr-md bg-[#a9bedd] py-1 font-medium md:max-w-[35%]">
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
    </>
  );
}

export default Overview;
