function CorrectCornersAnalysisPrediction() {
  return (
    <section className="mb-10 flex gap-2 rounded-bl-lg rounded-br-lg px-2 pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      {/*========== Scoring Times START ========== */}
      <div className="flex-grow-[2]">
        <h3 className="mb-2 text-center font-semibold">
          Correct Corners Analysis & Prediction
        </h3>
        <div className="mb-2 flex">
          <div className="flex flex-1 items-center justify-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-dbPrimary"></span>
            <span>Analysis</span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-dbSecondary"></span>
            <span>Prediction</span>
          </div>
        </div>
        <div
          className="mb-2 flex items-center justify-center gap-2 
      "
        >
          <div>
            <span>0</span>
          </div>
          <div className="flex-1">
            <div className="flex items-end gap-[2px]">
              <div
                className="h-4 rounded-xl bg-dbPrimary pl-1"
                style={{ width: "20%" }}
              ></div>
              <span className="self-center">2</span>
            </div>
            <div className="flex items-start gap-[2px]">
              <div
                className="h-4 rounded-xl bg-dbSecondary pl-1"
                style={{ width: "20%" }}
              ></div>
              <span className="self-center">2</span>
            </div>
          </div>
        </div>
        <div
          className="mb-2 flex items-center justify-center gap-2 
      "
        >
          <div>
            <span>1</span>
          </div>
          <div className="flex-1">
            <div className="flex items-end gap-[2px]">
              <div
                className="h-4 rounded-xl bg-dbPrimary pl-1"
                style={{ width: "40%" }}
              ></div>
              <span className="self-center">4</span>
            </div>
            <div className="flex items-start gap-[2px]">
              <div
                className="h-4 rounded-xl bg-dbSecondary pl-1"
                style={{ width: "60%" }}
              ></div>
              <span className="self-center">6</span>
            </div>
          </div>
        </div>
      </div>
      {/*========== Scoring Times END ========== */}
    </section>
  );
}

export default CorrectCornersAnalysisPrediction;
