import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";

function MoreStats({ data, setLeagueId }) {
  const isNull = (value) => value === null;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleLeagueSelect(id) {
    setLeagueId(id);
    scrollToTop();
  }

  const cardsBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        {Object.entries(rowData.cards).map(([cardName, cardCount]) => {
          return <span key={cardName}>{cardCount}</span>;
        })}
      </div>
    );
  };

  const detailsBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Link>
          <i className="bi bi-star text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        <button onClick={() => handleLeagueSelect(rowData.league.id)}>
          <i className="bi bi-journal-richtext text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </button>
      </div>
    );
  };
  return (
    <section>
      <h3 className="mb-[1px] rounded-tl-md rounded-tr-md bg-DbRowHeaderGradient py-1 text-center text-white">
        More Statistics of Player
      </h3>
      <DataTable
        value={data}
        stripedRows
        pt={{
          headerRow: "text-white bg-DbRowHeaderGradient",
          column: { headerCell: "px-4" },
        }}
      >
        <Column
          className="px-4 text-xs"
          header="Team"
          body={(rowData) => rowData.team.name}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="League"
          body={(rowData) => rowData.league.name}
        ></Column>

        <Column
          className="px-4 text-xs"
          header="Position"
          body={(rowData) => rowData.games.position}
        ></Column>

        {/* <Column
          className="px-4 text-xs"
          field="rating"
          header="Rating"
        ></Column> */}

        <Column
          className="px-4 text-xs"
          header="Appearences"
          body={(rowData) => rowData.games.appearences}
        ></Column>

        <Column
          className="px-4 text-xs"
          header="Line Ups"
          body={(rowData) => rowData.games.lineups}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Goals"
          body={(rowData) => rowData.goals.total}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Shots"
          body={(rowData) => (
            <span
              className={`${
                isNull(rowData.shots.total) ? "text-gray-500" : ""
              }`}
            >
              {isNull(rowData.shots.total) ? "N/A" : rowData.shots.total}
            </span>
          )}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Passes"
          body={(rowData) => (
            <span
              className={`${
                isNull(rowData.passes.total) ? "text-gray-500" : ""
              }`}
            >
              {isNull(rowData.passes.total) ? "N/A" : rowData.passes.total}
            </span>
          )}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Cards"
          body={cardsBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Details"
          body={detailsBodyTemplate}
        ></Column>
      </DataTable>
    </section>
  );
}

export default MoreStats;
