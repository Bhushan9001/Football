import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";

const data = [
  {
    name: "Event 1",
    start: "12/01/2024 23:47",
    end: "12/01/2024 23:47",
    plan: "TRIAL",
  },
  {
    name: "Event 1",
    start: "12/01/2024 23:47",
    end: "12/01/2024 23:47",
    plan: "TRIAL",
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function PlanChangeHistory() {
  return (
    <section className="rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-[1px] rounded-md bg-dbPrimary py-1 text-center text-white">
        Plan Change History
      </h3>
      <CustomDataTable
        value={data}
        stripedRows
        pt={{
          headerRow: {
            className: "text-white bg-DbRowHeaderGradient text-center",
          },
          column: { headerCell: "px-4 py-1 font-normal" },
          bodyRow: "text-center",
        }}
      >
        <Column
          className="px-4 py-2 text-sm"
          headerClassName="rounded-tl-md"
          field="name"
          header="Event"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="start"
          header="Start"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="plan"
          header="Plan"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          headerClassName="rounded-tr-md"
          field="end"
          header="End"
        ></Column>
      </CustomDataTable>
    </section>
  );
}

export default PlanChangeHistory;
