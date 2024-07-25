function GoalAnalysis() {
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 text-center font-medium">Goal Analysis HT</h3>
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
    </section>
  );
}

export default GoalAnalysis;
