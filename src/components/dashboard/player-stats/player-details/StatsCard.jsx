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

  &.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody)
    .p-datatable-tbody
    > tr
    > td {
    border-width: 1px 0px 1px 1px;
  }

  &.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody)
    .p-datatable-tbody
    > tr:last-child
    > td {
    border-bottom-width: 0;
  }
`;

function StatsCard({ data }) {
  const isNull = (value) => value === null;
  return (
    <section className="rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <CustomDataTable
        value={data.stats}
        showGridlines
        stripedRows
        pt={{
          headerRow: {
            className: "text-white bg-DbRowHeaderGradient text-center",
          },
          column: { root: "capitalize", headerCell: "px-4 py-2 font-medium" },
          bodyRow: "text-center",
        }}
      >
        <Column
          className="px-4 py-2 text-sm"
          field="field"
          header=""
          headerClassName="rounded-tl-md"
        />
        <Column
          className="px-4 py-2 text-sm"
          field="value"
          header={data.name}
          body={(rowData) => (
            <span className={`${isNull(rowData.value) ? "text-gray-500" : ""}`}>
              {isNull(rowData.value) ? "N/A" : rowData.value}
            </span>
          )}
        />
        <Column
          className="px-4 py-2 text-sm"
          field="ratio"
          header="Ratio per Appearance"
          headerClassName="rounded-tr-md text-xs"
          body={(rowData) => (
            <span className={`${isNull(rowData.ratio) ? "text-gray-500" : ""}`}>
              {isNull(rowData.ratio) ? "N/A" : Number(rowData.ratio).toFixed(2)}
            </span>
          )}
        />
      </CustomDataTable>
    </section>
  );
}

export default StatsCard;
