function CornersPrediction() {
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 font-medium">Corners Prediction</h3>
      <div className="mx-auto flex flex-col gap-3 lg:max-w-[80%] lg:flex-row lg:gap-6">
        <div className="mb-1 flex flex-1 justify-center">
          <div className="flex flex-1 flex-col md:flex-row">
            <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
              Exactly 6 Corners
            </p>
            <p className="flex-1 rounded-br-md rounded-tr-md border-[#666] py-1 md:border-2 ">
              15.91 %
            </p>
          </div>
        </div>
        <div className="mb-1 flex  flex-1 justify-center">
          <div className="flex flex-1 flex-col md:flex-row">
            <p className="flex-1 rounded-bl-md rounded-tl-md bg-DbRowHeaderGradient py-1 text-white">
              Corners in range: 4 - 8
            </p>
            <p className="flex-1 rounded-br-md rounded-tr-md border-[#666] py-1 md:border-2 ">
              68.70 %
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CornersPrediction;
