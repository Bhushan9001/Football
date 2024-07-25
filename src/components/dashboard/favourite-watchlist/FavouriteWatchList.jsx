import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";

const data = [
  {
    name: "UEFA Champions League",
    logo: "/assets/img/dashboard/2.png",
    details: "4 upcoming matches",
  },
  {
    name: "UEFA Europa League",
    logo: "/assets/img/dashboard/3.png",
    details: "11 upcoming matches",
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function FavouriteWatchList() {
  const logoBodyTemplate = (rowData) => (
    <div>
      <img
        className="mx-auto max-h-[30px] max-w-[30px]"
        src={rowData.logo}
        alt=""
      />
    </div>
  );

  const unfavourBodyTemplate = () => (
    <button>
      <i class="bi bi-hand-thumbs-down"></i>
    </button>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Watchlist</h4>
      <CustomDataTable
        value={data}
        stripedRows
        pt={{
          headerRow: {
            className:
              "text-white bg-DbRowHeaderGradient text-center justify-center",
          },
          column: { headerCell: "px-4 text-center text-sm font-normal" },
          bodyRow: "text-center",
        }}
      >
        <Column className="px-4 text-xs" header="League"></Column>
        <Column className="px-4 text-xs" header="Match"></Column>
        <Column className="px-4 text-xs" header="Time"></Column>
        <Column className="px-4 text-xs" header="Outcome"></Column>
        <Column className="px-4 text-xs" header="Double Chance"></Column>
        <Column className="px-4 text-xs" header="No Draw"></Column>
        <Column className="px-4 text-xs" header="BTTS"></Column>
        <Column className="px-4 text-xs" header="HT Goal"></Column>
        <Column className="px-4 text-xs" header="Over 1.5"></Column>
        <Column className="px-4 text-xs" header="Over 2.5"></Column>
        <Column className="px-4 text-xs" header="Over 3.5"></Column>
        <Column className="px-4 text-xs" header="Corners in Range"></Column>
      </CustomDataTable>
    </>
  );
}

export default FavouriteWatchList;
