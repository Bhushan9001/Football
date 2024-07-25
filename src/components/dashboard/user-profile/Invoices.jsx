import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";

const data = [
  {
    status: "status 1",
    invoice: "invoice for status 1",
    periodStart: "period start for 1",
    periodEnd: "period end for 1",
  },
  {
    status: "status 2",
    invoice: "invoice for status 2",
    periodStart: "period start for 2",
    periodEnd: "period end for 2",
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function Invoices() {
  return (
    <section className="mt-6 rounded-bl-lg rounded-br-lg pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-[1px] rounded-md bg-DbRowHeaderGradient py-1 text-center text-white">
        Last Invoices
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
          field="status"
          header="Status"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="invoice"
          header="Invoice"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="periodStart"
          header="Period Start"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          headerClassName="rounded-tr-md"
          field="periodEnd"
          header="Period End"
        ></Column>
      </CustomDataTable>
    </section>
  );
}

export default Invoices;
