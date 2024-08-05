
function MyPicks({data,predictions}) {
 console.log(predictions)
  return (
    <section className="text-center ">
      <h3 className="font-medium">My Picks</h3>
      <div className="rounded-bl-lg rounded-br-lg pb-4 shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
        <div className="flex items-center justify-between rounded-md bg-DbRowHeaderGradient px-3 py-1 text-white">
          <div className="flex items-center gap-2">
            <img
              className="max-h-[30px] max-w-[30px]"
              src="/assets/img/dashboard/383.png"
              alt=""
            />
            <h4 className="text-sm">Subscription of user@gmail.com</h4>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm">16/01/2024 11:00</p>
            <button>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <div className="flex bg-[#f8f9fa] py-1">
          <div className="flex-1">
            <div className="mx-auto max-h-[60px] max-w-[60px] rounded-lg bg-[rgba(0,_160,_190,_0.4)] p-1">
              <img src={data.home.logo} alt="" />
            </div>
            <p className="text-sm">{data.home.name}</p>
          </div>
          <div className="flex-1">
            <div className="mx-auto max-h-[60px] max-w-[60px] rounded-lg bg-[rgba(0,_44,_109,_0.4)] p-1">
              <img src={data.away.logo} alt="" />
            </div>
            <p className="text-sm">{data.away.name}</p>
          </div>
        </div>
        <h3 className="mt-1 mb-2 text-center text-sm font-medium">Home win ending</h3>
        <div className="flex justify-between px-10">
          <p className="text-sm font-medium ">{predictions.percent.home}</p>
          <p className="text-sm font-medium">Prediction</p>
          <p className="text-sm font-medium">{predictions.percent.away}</p>
        </div>
      </div>
    </section>
  );
}

export default MyPicks;
