function GoalsAverageCard() {
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg pb-4 pt-1 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2  font-medium">Teams Goals Averages</h3>
      <div className="mb-[1px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-1 font-medium">
        <h6 className="rounded-md bg-dbPrimary py-1 text-white">
          Maccabi Petah Tikva
        </h6>
        <p>Over 2.5</p>
        <p className="rounded-md bg-[#aee1ea] py-1 ">54.83 %</p>
        <p>Over 1.5</p>
        <p className="rounded-md bg-[#aee1ea] py-1 ">87.09%</p>
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-1 font-medium">
        <h6 className="rounded-md bg-dbSecondary py-1 text-white">Ashdod</h6>
        <p>Over 2.5</p>
        <p className="rounded-md bg-[#aee1ea] py-1 ">54.83 %</p>
        <p>Over 1.5</p>
        <p className="rounded-md bg-[#aee1ea] py-1 ">87.09%</p>
      </div>
    </section>
  );
}

export default GoalsAverageCard;
