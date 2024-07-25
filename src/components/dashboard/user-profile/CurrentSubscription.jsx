function CurrentSubscription() {
  return (
    <section className="rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="rounded-md bg-DbRowHeaderGradient py-1 text-white">
        Subscription of user@gmail.com
      </h3>
      <div className="grid md:grid-cols-2 py-1 text-sm">
        <p>Your current plan</p>
        <p>TRIAL</p>
      </div>
      <div className="grid md:grid-cols-2 bg-[#efefef] py-1">
        <p>Subscription status</p>
        <p>UPGRADE PLAN</p>
      </div>
      <div className="grid md:grid-cols-2 py-1 text-sm">
        <p>Status was set at</p>
        <p>13/01/2024 01:13</p>
      </div>
      <div className="grid md:grid-cols-2 bg-[#efefef] py-1 text-sm">
        <p>Manage Subscription</p>
        <p>
          <button className="rounded-[50px] bg-[#012d43] px-4 py-1 text-white opacity-90 transition hover:opacity-100">
            Subscribe Now
          </button>
        </p>
      </div>
    </section>
  );
}

export default CurrentSubscription;
