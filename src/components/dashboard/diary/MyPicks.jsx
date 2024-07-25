function MyPicks() {
  return (
    <section className="text-center ">
      <h3 className="font-medium">My Picks</h3>
      <div className="mb-5 rounded-bl-lg rounded-br-lg pb-4 shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
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
              <img src="/assets/img/dashboard/2253.png" alt="" />
            </div>
            <p className="text-sm">Hapoel Haifa</p>
          </div>
          <div className="flex-1">
            <div className="mx-auto max-h-[60px] max-w-[60px] rounded-lg bg-[rgba(0,_44,_109,_0.4)] p-1">
              <img src="/assets/img/dashboard/4500.png" alt="" />
            </div>
            <p className="text-sm">Hapoel Hadera</p>
          </div>
        </div>
        <h3 className="mt-1 mb-2 text-center text-sm font-medium">Home win ending</h3>
        <div className="flex justify-between px-10">
          <p className="text-sm font-medium animate-pulse">Pending</p>
          <p className="text-sm font-medium">Prediction</p>
          <p className="text-sm font-medium">49.99%</p>
        </div>
      </div>
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
              <img src="/assets/img/dashboard/2253.png" alt="" />
            </div>
            <p className="text-sm">Hapoel Haifa</p>
          </div>
          <div className="flex-1">
            <div className="mx-auto max-h-[60px] max-w-[60px] rounded-lg bg-[rgba(0,_44,_109,_0.4)] p-1">
              <img src="/assets/img/dashboard/4500.png" alt="" />
            </div>
            <p className="text-sm">Hapoel Hadera</p>
          </div>
        </div>
        <h3 className="mt-1 mb-2 text-center text-sm font-medium">Home win ending</h3>
        <div className="flex justify-between px-10">
          <p className="text-sm font-medium animate-pulse">Pending</p>
          <p className="text-sm font-medium">Prediction</p>
          <p className="text-sm font-medium">49.99%</p>
        </div>
      </div>
    </section>
  );
}

export default MyPicks;
