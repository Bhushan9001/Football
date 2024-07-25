function ChangePlan() {
  return (
    <div>
      <div className="mx-auto mb-11 max-w-md rounded-md rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <h3 className="bg-dbPrimary py-1 text-white">
          Change or Update your Plan
        </h3>
        <p className="my-4 px-5 text-sm">
          You have to select your plan to continue using Sports Trading Ai
          Predictions. You can use{" "}
          <span className="px-1 text-dbPrimary">Freemium plan</span>
          until successful payment.
        </p>
      </div>
      <div className="mb-11 rounded-md rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <h3 className="bg-dbPrimary py-1 text-white">GOLD Membership</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Features */}
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <h2 className="mt-3 text-2xl">Features</h2>
            <p>
              Complete global football data coverage, Full analysis and
              predictions of each of the 1,000+ major football teams, leagues
              and cups.
            </p>
            <div>
              <h4 className="mb-1 text-xl">
                Analysis and predictions by our state of the art cutting edge
                football betting algorithm
              </h4>
              <p className="text-gray-600">
                Home Wins, Draws, Away Wins <br />
                Double Chance
                <br />
                Draw No Win
                <br />
                Both Team to Score
                <br />
                Over and Under Goals Half Time
                <br />
                Home Team and Away Team Half Time Win Form
                <br />
                Over and Under Goals Full Time
                <br />
                Over and Under Corner 90min
                <br />
                Home Team and Away Team Corner Match Bet Form <br />
                Corners in Range 90min
                <br />
                Daily accas tip
                <br />
              </p>
            </div>
            <div>
              <h4 className="text-xl">Full Player Statistics</h4>
              <p className="text-gray-600">
                Total shots, shots on target, key passes,
                <br />
                fouls, duels, tackles, dribbles, cards, saves
                <br />
                Goal count, assists, field penalties: won, scored, missed
              </p>
            </div>
            <div>
              <h4 className="text-xl">Betting diary</h4>
              <p className="text-gray-600">
                Your own fully automated betting diary
              </p>
            </div>
            <h4 className="text-xl">And much more...</h4>
          </div>
          {/* Payment Options */}
          <div className="pr-4">
            <h2 className="mb-4 mt-3 text-2xl">Payment Options</h2>
            {/* 01 */}
            <div className="grid grid-cols-3 items-center py-1 text-sm">
              <p className="rounded-3xl bg-[#efefef] py-2">Billed monthly</p>
              <p className="rounded-3xl bg-[#efefef] py-2">TRIAL</p>
              <button className="rounded-xl bg-[#012d43] px-4 py-2 text-white opacity-90 transition hover:opacity-100">
                Subscribe Now
              </button>
            </div>
            {/* 02 */}
            <div className="grid grid-cols-3 items-center py-1 text-sm">
              <p>Billed monthly</p>
              <p>TRIAL</p>
              <button className="rounded-xl bg-[#012d43] px-4 py-2 text-white opacity-90 transition hover:opacity-100">
                Subscribe Now
              </button>
            </div>
            {/* 03 */}
            <div className="grid grid-cols-3 items-center py-1 text-sm">
              <p className="rounded-3xl bg-[#efefef] py-2">Billed monthly</p>
              <p className="rounded-3xl bg-[#efefef] py-2">TRIAL</p>
              <button className="rounded-xl bg-[#012d43] px-4 py-2 text-white opacity-90 transition hover:opacity-100">
                Subscribe Now
              </button>
            </div>
            {/* 04 */}
            <div className="grid grid-cols-3 items-center py-1 text-sm">
              <p>Billed monthly</p>
              <p>TRIAL</p>
              <button className="rounded-xl bg-[#012d43] px-4 py-2 text-white opacity-90 transition hover:opacity-100">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePlan;
