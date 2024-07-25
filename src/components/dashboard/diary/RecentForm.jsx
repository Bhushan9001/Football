import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";

const data = [
  {
    period: "Yesterday",
    number_of_picks: 0,
    wins: 0,
    win_percentage: "0.00%",
  },
  {
    period: "Last 7 days",
    number_of_picks: 0,
    wins: 0,
    win_percentage: "0.00%",
  },
  {
    period: "Last 30 days",
    number_of_picks: 0,
    wins: 0,
    win_percentage: "0.00%",
  },
  {
    period: "Last 90 days",
    number_of_picks: 0,
    wins: 0,
    win_percentage: "0.00%",
  },
  {
    period: "Last 365 days",
    number_of_picks: 0,
    wins: 0,
    win_percentage: "0.00%",
  },
];

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function RecentForm() {
  return (
    <div className="mb-6">
      <h4 className="text-center font-medium">Recent Form</h4>
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
          field="period"
          header=""
        ></Column>
        <Column
          className="px-4 py-2 text-sm"
          field="number_of_picks"
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
          field="win_percentage"
          header="Win %"
        ></Column>
      </CustomDataTable>
    </div>
  );
}

export default RecentForm;
