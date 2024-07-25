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

function ProfileCard({ data }) {
  const isNull = (value) => value === null;
  return (
    <section className="rounded-bl-lg rounded-br-lg shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="rounded-md bg-DbRowHeaderGradient p-1 text-center text-white">
        {data.name}
      </h3>
      <img src={data.img} className="mx-auto mb-4 mt-2 max-h-20" />
      <CustomDataTable
        value={data.stats}
        showGridlines
        stripedRows
        pt={{
          headerRow: {
            className: "text-center hidden",
          },
          column: { headerCell: "px-4 py-2 font-medium" },
          bodyRow: "text-center",
        }}
      >
        <Column className="px-4 py-2 text-sm capitalize" field="field" />
        <Column
          className="px-4 py-2 text-sm"
          field="value"
          body={(rowData) => (
            <span className={`${isNull(rowData.value) ? "text-gray-500" : ""}`}>
              {isNull(rowData.value) ? "N/A" : rowData.value}
            </span>
          )}
        />
      </CustomDataTable>
    </section>
  );
}

export default ProfileCard;
