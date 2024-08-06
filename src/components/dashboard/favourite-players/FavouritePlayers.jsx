import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { playerArray } from "./favouritePlayerData";


  

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function FavouritePlayers() {
  const unfavourBodyTemplate = () => (
    <button>
      <i className="bi bi-hand-thumbs-down"></i>
    </button>
  );

  const detailsBodyTemplate = () => (
    <Link>
      <i className="text-dbPrimary hover:text-dbSecondary bi bi-newspaper text-base transition"></i>
    </Link>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Players</h4>
      <CustomDataTable
        value={playerArray}
        stripedRows
        pt={{
          headerRow: {
            className:
              "text-white bg-DbRowHeaderGradient text-center justify-center",
          },
          column: { headerCell: "px-4 text-center" },
          bodyRow: "text-center",
        }}
      >
        <Column
          className="px-4 text-xs"
          field="name"
          header="Player Name"
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Unfavour"
          body={unfavourBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          field="league"
          header="League"
        ></Column>
        <Column className="px-4 text-xs" field="team" header="Team"></Column>
        <Column
          className="px-4 text-xs"
          field="plays"
          header="Details"
          body={detailsBodyTemplate}
        ></Column>
      </CustomDataTable>
    </>
  );
}

export default FavouritePlayers;
