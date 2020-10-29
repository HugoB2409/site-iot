import React from "react";
//import { Chart } from "react-charts";
import { Line } from "@reactchartjs/react-chart.js";

const chart = (props) => {
  const data = {
    labels: props.data.map((row) => {
      return row.createdAt;
    }),
    datasets: [
      {
        label: "Historique de la temperature",
        data: props.data.map((row) => {
          return row.temperature;
        }),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default chart;
