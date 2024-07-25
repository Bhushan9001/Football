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

function FavouriteLeageus() {
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
      <i className="bi bi-hand-thumbs-down"></i>
    </button>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Leagues</h4>
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
          header="League Logo"
          body={logoBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          field="name"
          header="League Name"
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Unfavour"
          body={unfavourBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          field="details"
          header="Details"
        ></Column>
      </CustomDataTable>
    </>
  );
}

export default FavouriteLeageus;
