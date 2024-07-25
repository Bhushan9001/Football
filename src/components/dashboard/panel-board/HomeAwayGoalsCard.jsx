import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }

  &.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr {
    background: transparent;
  }

  &.p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th {
    border-width: 1px 0px 1px 1px;
  }

  &.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody)
    .p-datatable-tbody
    > tr
    > td {
    border-width: 0px 0px 1px 1px;
  }

  &.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody)
    .p-datatable-tbody
    > tr:last-child
    > td {
    border-bottom-width: 0;
  }
`;

function HomeAwayGoalsCard({ goalsData }) {
  const data = [
    {
      scored: goalsData.teams.home.league.goals.for.total.home,
      team: goalsData.teams.home.name,
      conceded: goalsData.teams.home.league.goals.against.total.home,
    },
    {
      scored: goalsData.teams.away.league.goals.for.total.home,
      team: goalsData.teams.away.name,
      conceded: goalsData.teams.away.league.goals.against.total.home,
    },
  ];
  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <CustomDataTable
        value={data}
        showGridlines
        stripedRows
        pt={{
          headerRow: {
            className: "text-center",
          },
          column: { headerCell: "px-4 py-2 font-medium" },
          bodyRow: "text-center",
        }}
      >
        <Column
          className="px-4 py-2 text-sm"
          field="scored"
          header="Scored"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="team"
          header="Goals Home and Away"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="conceded"
          header="Conceded"
        ></Column>
      </CustomDataTable>
    </section>
  );
}

export default HomeAwayGoalsCard;
