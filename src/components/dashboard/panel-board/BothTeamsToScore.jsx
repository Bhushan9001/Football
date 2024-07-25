import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

function BothTeamsToScore() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["A", "B"],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ["#00A0BE", "#002C6D"],
          hoverBackgroundColor: ["#00A0BE", "#002C6D"],
        },
      ],
    };
    const options = {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          color: "#000",
          font: {
            weight: "bold",
            size: 16,
          },
          formatter: (value, context) => {
            return context.dataset.data[context.dataIndex];
          },
          anchor: "center",
          align: "center",
          offset: 0,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <section className="mb-10 rounded-bl-lg rounded-br-lg px-4 pb-4 text-center shadow-[0_.5rem_1rem_rgba(0,0,0,.15)]">
      <h3 className="mb-2 text-center font-medium">Over & Under Analysis</h3>
      <div className="mb-2 grid grid-cols-2 gap-16 text-white">
        <h3 className="rounded-2xl bg-DbRowHeaderGradient py-1 text-center ">
          Analysis
        </h3>
        <h3 className="rounded-2xl bg-DbRowHeaderGradient py-1 text-center ">
          Prediction
        </h3>
      </div>
      <div className="grid grid-cols-2">
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="md:w-30rem w-full"
        />
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="md:w-30rem w-full"
        />
      </div>
    </section>
  );
}

export default BothTeamsToScore;
