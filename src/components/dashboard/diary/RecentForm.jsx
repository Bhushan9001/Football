import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Title } from "chart.js";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function RecentForm({ title , season, team, league, date }) {
  const [formData, setFormData] = useState([
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
  ]);

  const calculateStats = (form, length) => {
    const recentForm = form.slice(-length);
    const picks = recentForm.length;
    const wins = recentForm.split('W').length - 1;
    const winPercentage = picks > 0 ? ((wins / picks) * 100).toFixed(2) : "0.00";
    return { picks, wins, winPercentage };
  };

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

        if (data.response && data.response.form) {
          const form = data.response.form;
          
          const yesterdayStats = calculateStats(form, 1);
          const weekStats = calculateStats(form, 7);
          const monthStats = calculateStats(form, 30);
          const quarterStats = calculateStats(form, 90);
          const yearStats = calculateStats(form, form.length);

          setFormData([
            {
              period: "Yesterday",
              number_of_picks: yesterdayStats.picks,
              wins: yesterdayStats.wins,
              win_percentage: `${yesterdayStats.winPercentage}%`,
            },
            {
              period: "Last 7 days",
              number_of_picks: weekStats.picks,
              wins: weekStats.wins,
              win_percentage: `${weekStats.winPercentage}%`,
            },
            {
              period: "Last 30 days",
              number_of_picks: monthStats.picks,
              wins: monthStats.wins,
              win_percentage: `${monthStats.winPercentage}%`,
            },
            {
              period: "Last 90 days",
              number_of_picks: quarterStats.picks,
              wins: quarterStats.wins,
              win_percentage: `${quarterStats.winPercentage}%`,
            },
            {
              period: "Last 365 days",
              number_of_picks: yearStats.picks,
              wins: yearStats.wins,
              win_percentage: `${yearStats.winPercentage}%`,
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
      <h4 className="text-center font-medium">{title} Recent form</h4>
      <CustomDataTable
        value={formData}
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