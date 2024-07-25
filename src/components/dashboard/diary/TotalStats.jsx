import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";

const data = [
  {
    picks: 0,
    wins: 0,
    percentage: 0,
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function TotalStats() {
  return (
    <div className="mb-6">
      <h4 className="text-center font-medium">Total Statistic</h4>
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
          field="picks"
          header="Picks"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="wins"
          header="Wins"
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          headerClassName="rounded-tr-md "
          field="percentage"
          header="Win %"
        ></Column>
      </CustomDataTable>
    </div>
  );
}

export default TotalStats;
