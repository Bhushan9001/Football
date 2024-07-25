function CorrectScoreHT() {
  return (
    <section className="mb-10 flex gap-2 rounded-bl-lg rounded-br-lg px-2 pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      {/*========== Correct FT Score START ========== */}
      <div className="flex-grow-[1]">
        <h3 className="mb-2 text-center font-semibold">Correct Score HT</h3>
        <div className="mb-2 flex justify-between gap-20">
          <div className="flex-1">
            <h6 className="text-base font-medium">Analysis</h6>
            <div className="rounded-2xl bg-DbRowHeaderGradient px-5 py-1 text-white">
              <span>0</span>
              <span>-</span>
              <span>1</span>
            </div>
          </div>
          <div className="flex-1">
            <h6 className="text-base font-medium">Prediction</h6>
            <div className="rounded-2xl bg-DbRowHeaderGradient px-5 py-1 text-white">
              <span>0</span>
              <span>-</span>
              <span>1</span>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="flex rounded-xl bg-DbRowHeaderGradient p-1 text-white">
          <h6 className="flex-1">Score</h6>
          <h6 className="flex-1">Analysis</h6>
          <h6 className="flex-1">Prediction</h6>
        </div>
        {/* Body */}
        <div className="flex">
          <div className="flex-1 border-r-[1px] border-gray-400">
            <span className="inline-block py-1">0</span>
            <span className="inline-block py-1">-</span>
            <span className="inline-block py-1">1</span>
          </div>
          <p className="flex-1 border-r-[1px] border-gray-400 py-1">4.20</p>
          <p className="flex-1 py-1">8.59</p>
        </div>
        <div className="flex rounded-xl bg-[#efefef]">
          <div className="flex-1 border-r-[1px] border-gray-400">
            <span className="inline-block py-1">0</span>
            <span className="inline-block py-1">-</span>
            <span className="inline-block py-1">1</span>
          </div>
          <p className="flex-1 border-r-[1px] border-gray-400 py-1">4.20</p>
          <p className="flex-1 py-1">8.59</p>
        </div>
      </div>
      {/*========== Correct FT Score END ========== */}
    </section>
  );
}

export default CorrectScoreHT;
