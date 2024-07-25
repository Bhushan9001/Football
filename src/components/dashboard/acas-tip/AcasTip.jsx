import { Link } from "react-router-dom";

function AcasTip() {
  return (
    <div className="mb-5 rounded-bl-lg rounded-br-lg pb-4 shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-1 text-center font-medium">Accas Daily Tip</h3>
      <h4 className="bg-[#fff3cd] p-4 text-center">
        Gold Members Only.
        <Link to="/dashboard/user-profile" className="pl-1 text-dbPrimary underline transition hover:text-dbSecondary">
          Upgrade Now
        </Link>
      </h4>
    </div>
  );
}

export default AcasTip;
