import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamPlayers } from "../../../services/apiPlayers";
import Loader from "../../../ui/Loader";

function TeamDetails({ teamId, seasonId = "2023" }) {
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const detailsBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Link>
          <i className="bi bi-star text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        <Link
          to={`/dashboard/player-stats?player=${rowData.id}&season=${seasonId}`}
        >
          <i className="bi bi-journal-richtext text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTeamPlayers(teamId);
        setTeamDetails(response.data.response[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {/* <div className="sticky top-0 z-50 grid grid-cols-2 gap-6 bg-white md:grid-cols-[1fr_2fr_1fr] md:items-start"> */}
      <div className="sticky top-0 z-50 grid grid-cols-2 gap-6 bg-white md:grid-cols-[1fr_1fr] md:items-start">
        {/* 01 */}
        {/* <Link
            to="/dashboard/player-stats?lid=abc"
            className="rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]"
          >
            <h3 className="rounded-md bg-DbRowHeaderGradient text-center text-white">
              UEFA Europa Conference League 2023
            </h3>
            <div className="py-2">
              <img
                className="mx-auto max-h-20"
                src="/assets/img/dashboard/848.png"
                alt=""
              />
            </div>
          </Link> */}
        {/* 02 */}
        <Link
          to="/dashboard/player-stats"
          className="hidden rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] md:block"
        >
          <h3 className="rounded-md bg-DbRowHeaderGradient text-center text-white">
            Sports Trading Ai Predictions
          </h3>
          <div className="py-2">
            <img
              className="mx-auto max-h-20"
              src="/assets/img/logo.png"
              alt=""
            />
          </div>
        </Link>
        {/* 03 */}
        <div className="rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
          <h3 className="rounded-md bg-DbRowHeaderGradient text-center text-white">
            {teamDetails.team.name}
          </h3>
          <div className="py-2">
            <img
              className="mx-auto max-h-20"
              src={teamDetails.team.logo}
              alt=""
            />
          </div>
        </div>
      </div>
      <section>
        <div className="mb-6"></div>
        <h3 className="mb-[1px] rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient py-1 text-center text-white">
          {teamDetails.team.name}
        </h3>
        <DataTable
          value={teamDetails.players}
          stripedRows
          pt={{
            headerRow: "text-white bg-DbRowHeaderGradient",
            column: { headerCell: "px-4" },
          }}
        >
          <Column className="px-4 text-xs" field="name" header="Name"></Column>
          {/* <Column
          className="px-4 text-xs"
          field="injured"
          header="Injured"
        ></Column> */}
          <Column
            className="px-4 text-xs"
            field="position"
            header="Position"
          ></Column>
          {/* <Column
          className="px-4 text-xs"
          field="rating"
          header="Rating"
        ></Column> */}
          {/* <Column
          className="px-4 text-xs"
          field="appearances"
          header="Appearances"
        ></Column> */}
          {/* <Column
          className="px-4 text-xs"
          field="lineups"
          header="Line Ups"
        ></Column> */}
          {/* <Column className="px-4 text-xs" field="goals" header="Goals"></Column> */}
          {/* <Column className="px-4 text-xs" field="shots" header="Shots"></Column> */}
          {/* <Column
          className="px-4 text-xs"
          field="passes"
          header="Passes"
        ></Column> */}
          {/* <Column
          className="px-4 text-xs"
          header="Cards"
          body={cardsBodyTemplate}
        ></Column> */}
          <Column
            className="px-4 text-xs"
            header="Details"
            body={detailsBodyTemplate}
          ></Column>
        </DataTable>
      </section>
    </>
  );
}

export default TeamDetails;
