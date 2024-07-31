import { Link, useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getStandings } from "../../../services/apiStandings";
import Loader from "../../../ui/Loader";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }

  .homeTeamRow td,
  .awayTeamRow td {
    color: white !important;
  }
`;

function LeagueStandings({ standingsData }) {
  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const homeTeam = searchParms.get("home");

  const awayTeam = searchParms.get("away");

  const rowClassName = (rowData) => {
    if (rowData.team.id == homeTeam) {
      return "!bg-dbPrimary homeTeamRow";
    } else if (rowData.team.id == awayTeam) {
      return "!bg-dbSecondary awayTeamRow";
    }
    return "";
  };

  const serialBodyTemplate = (rowData) => {
    return <span>{rowData.rank}.</span>;
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1">
        <img
          className="max-h-[30px] max-w-[30px]"
          src={rowData.team.logo}
          alt={`Logo for ${rowData.team.name}`}
        />
        <span className="text-base">{rowData.team.name}</span>
      </div>
    );
  };

  const formBodyTemplate = (rowData) => {
    console.log(rowData)
    return (
      
      <div className="flex justify-center gap-1 rounded-[inherit] py-2 text-center text-sm text-white">
        {rowData.form.split("").map((result, index) => (
          <span
            key={index}
            className={`flex h-5 w-5 items-center justify-center rounded-sm ${
              result === "W"
                ? "bg-green-900"
                : result === "L"
                  ? "bg-red-900"
                  : result === "D"
                    ? "bg-gray-500"
                    : ""
            } p-1 text-xs uppercase`}
          >
            {result}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <h4 className="text-center font-medium">{standingsData?.name}</h4>
      <CustomDataTable
        value={standingsData?.standings[0]}
        rowClassName={rowClassName}
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
          className="px-4 text-base"
          header="Position"
          body={serialBodyTemplate}
        ></Column>

        <Column
          className="px-4 text-base"
          header="Team Name"
          body={nameBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Points"
          body={(rowData) => rowData.points}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Matches"
          body={(rowData) => rowData.all.played}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Win"
          body={(rowData) => rowData.all.win}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Draw"
          body={(rowData) => rowData.all.draw}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Lose"
          body={(rowData) => rowData.all.lose}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Scored"
          body={(rowData) => rowData.all.goals.for}
        ></Column>
        <Column
          className="px-4 text-base"
          header="Conceded"
          body={(rowData) => rowData.all.goals.against}
        ></Column>

        <Column
          className="px-4 text-base"
          header="Form"
          body={formBodyTemplate}
        ></Column>
      </CustomDataTable>
    </>
  );
}

export default LeagueStandings;
