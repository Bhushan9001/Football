import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { useState, useEffect } from "react";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function TotalStats({ season, team, league, date }) {
  const [statsData, setStatsData] = useState([
    {
      picks: 0,
      wins: 0,
      percentage: "0.00",
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${team}&league=${league}&date=${date}`,
          {
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_API_KEY,
            },
          }
        );
        const data = await response.json();
        
        if (data.response && data.response.fixtures) {
          const { fixtures } = data.response;
          const totalPlayed = fixtures.played.total;
          const totalWins = fixtures.wins.total;
          const winPercentage = ((totalWins / totalPlayed) * 100).toFixed(2);

          setStatsData([
            {
              picks: totalPlayed,
              wins: totalWins,
              percentage: winPercentage,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (season && team && league && date) {
      fetchStats();
    }
  }, [season, team, league, date]);

  return (
    <div className="mb-6">
      <h4 className="text-center font-medium">Total Statistics</h4>
      <CustomDataTable
        value={statsData}
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
          headerClassName="rounded-tr-md"
          field="percentage"
          header="Win %"
          body={(rowData) => `${rowData.percentage}%`}
        ></Column>
      </CustomDataTable>
    </div>
  );
}

export default TotalStats;