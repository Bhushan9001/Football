function GoalPrediction() {
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 text-center font-medium">Goal Prediction HT</h3>
      <div className="mb-2 grid grid-cols-2 gap-16 text-white">
        <h3 className="rounded-2xl bg-DbRowHeaderGradient py-1 text-center ">
          Over
        </h3>
        <h3 className="rounded-2xl bg-DbRowHeaderGradient py-1 text-center ">
          Under
        </h3>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <div className="flex-1">
            <div
              style={{ width: "80%" }}
              className="ml-auto rounded-2xl bg-[#aee1ea] "
            >
              8
            </div>
          </div>
          <div className=" min-w-[100px] rounded-md bg-[#efefef] py-3 text-sm">
            0.5
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-[#a9bedd] " style={{ width: "40%" }}>
              4
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <div
              style={{ width: "20%" }}
              className="ml-auto rounded-2xl bg-[#aee1ea] "
            >
              2
            </div>
          </div>
          <div className=" min-w-[100px] rounded-md bg-[#efefef] py-3 text-sm">
            1.5
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-[#a9bedd] " style={{ width: "60%" }}>
              6
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <div
              style={{ width: "40%" }}
              className="ml-auto rounded-2xl bg-[#aee1ea] "
            >
              4
            </div>
          </div>
          <div className=" min-w-[100px] rounded-md bg-[#efefef] py-3 text-sm">
            2.5
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-[#a9bedd] " style={{ width: "90%" }}>
              9
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto md:max-w-[80%] lg:max-w-[60%]">
          {/* ===== FOR MOBILE ===== */}
          <div className="md:hidden">
            <div className="flex flex-1">
              <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
                Under 2.5
              </p>
              <p className="flex-1 rounded-br-md rounded-tr-md border-2 border-[#666] py-1 ">
                87.1%
              </p>
            </div>
            <div className="flex flex-1">
              <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
                Goals in 1st HT
              </p>
              <p className="flex-1 rounded-br-md rounded-tr-md border-2 border-[#666] py-1 ">
                Yes 87.1%
              </p>
            </div>
          </div>
          {/* ===== FOR DESKTOP ===== */}
          <div className="mb-1 hidden justify-center gap-6 md:flex">
            <div className="flex flex-1">
              <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
                Probability
              </p>
              <p className="flex-1 rounded-br-md rounded-tr-md border-2 border-[#666] py-1 ">
                87.1%
              </p>
            </div>
            <p className="flex-1 rounded-md bg-DbRowHeaderGradient py-1 text-white">
              Under 2.5
            </p>
          </div>
          <div className="hidden justify-center gap-6 md:flex">
            <div className="flex flex-1">
              <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
                Probability
              </p>
              <p className="flex-1 rounded-br-md rounded-tr-md border-2 border-[#666] py-1 ">
                87.1%
              </p>
            </div>
            <div className="flex flex-1 gap-4">
              <p className="flex-1 rounded-md bg-DbRowHeaderGradient py-1 text-white">
                Goals in 1st HT
              </p>
              <p className="flex-1 rounded-md bg-DbRowHeaderGradient py-1 text-white">
                No
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoalPrediction;
