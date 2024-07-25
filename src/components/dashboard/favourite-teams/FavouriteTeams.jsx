import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";

const data = [
  {
    name: "Chelsea",
    logo: "/assets/img/dashboard/49.png",
    matchTime: "13/01/2024 06:30",
    plays: "Home at London",
  },
  {
    name: "Coventry",
    logo: "/assets/img/dashboard/1346.png",
    matchTime: "13/01/2024 06:30",
    plays: "Home at Coventry, West Midlands",
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function FavouriteTeams() {
  const unfavourBodyTemplate = () => (
    <button>
      <i className="bi bi-hand-thumbs-down text-lg text-dbPrimary transition hover:text-dbSecondary"></i>
    </button>
  );

  const LogoBodyTemplate = (rowData) => (
    <div className="py-2">
      <img src={rowData.logo} className="max-h-20 mx-auto" />
    </div>
  );

  const detailsBodyTemplate = () => (
    <Link>
      <i className="text-dbPrimary hover:text-dbSecondary bi bi-newspaper text-base transition"></i>
    </Link>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Teams</h4>
      <CustomDataTable
        value={data}
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
          header="Logo"
          body={LogoBodyTemplate}
        ></Column>
        <Column className="px-4 text-xs" field="name" header="Team"></Column>
        <Column
          className="px-4 text-xs"
          header="Unfavour"
          body={unfavourBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          field="matchTime"
          header="Next Match Time"
        ></Column>
        <Column className="px-4 text-xs" field="plays" header="Plays"></Column>
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

export default FavouriteTeams;
