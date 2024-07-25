import { Link } from "react-router-dom";

function DBHeader() {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between p-4 z-50 bg-white">
      <Link to="/dashboard">
        <img
          className="max-h-20 md:max-h-[120px]"
          src="/assets/img/logo.png"
          alt="Logo for Sports Trading Ai Predictions"
        />
      </Link>
      <div className="flex items-center gap-2">
        <Link to="change-plan">
          <i className="bi bi-info-circle-fill text-2xl text-primary"></i>
        </Link>
        <span className="text-xl font-medium">|</span>
        <Link>
          <i className="bi bi-bell text-xl"></i>
        </Link>
        <span className="text-xl font-medium">|</span>
        <Link to="user-profile">
          <i className="bi bi-person text-dbPrimary hover:text-dbSecondary text-2xl transition"></i>
        </Link>
        {/* <Link>
          <i className="bi bi-list text-dbPrimary hover:text-dbSecondary text-2xl"></i>
        </Link> */}
      </div>
    </header>
  );
}

export default DBHeader;
