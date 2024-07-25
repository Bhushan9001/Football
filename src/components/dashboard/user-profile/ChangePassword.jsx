function ChangePassword() {
  return (
    <section className="rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="rounded-md bg-DbRowHeaderGradient py-1 text-white">
        Change Password
      </h3>
      <div className="mt-2 grid md:grid-cols-[1fr_2fr] px-4 py-2 text-sm">
        <p>Current password</p>
        <div className="text-start">
          <input
            type="password"
            placeholder="Password"
            className="w-full md:w-1/2 border border-gray-500 py-1 pl-2"
          />
        </div>
      </div>
      <div className="mb-2 grid md:grid-cols-[1fr_2fr] px-4 py-2 text-sm">
        <p>New password</p>
        <div className="grid md:grid-cols-2 gap-2 text-start">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-500 py-1 pl-2"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-gray-500 py-1 pl-2"
          />
          <button className="mt-2 max-w-max rounded-[50px] bg-[#012d43] px-5 py-1 text-white opacity-90 transition hover:opacity-100">
            Change
          </button>
        </div>
      </div>
      <p className="px-4 text-sm">
        After clicking on "Change" you will be redirected to our login page, and
        after logging in with your new password you will have the opportunity to
        re-authenticate your mobile device. Do not close this window or browse
        other site pages until after you have been redirected to the login page,
        as doing so may interrupt the password change process.
      </p>
    </section>
  );
}

export default ChangePassword;
