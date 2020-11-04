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
        label: "Temperature(°C)",
        data: props.data.map((row) => {
          return row.temperature;
        }),
        fill: false,
        backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgba(0, 0, 255, 1)",
      },
      {
        label: "Temperature ambiant(°C)",
        data: props.data.map((row) => {
          return row.temperature - 1;
        }),
        fill: false,
        backgroundColor: "rgb(0, 255, 0)",
        borderColor: "rgba(0, 255, 0, 1)",
      },
      {
        label: "Limite(°C)",
        data: props.data.map((row) => {
          return 38;
        }),
        fill: false,
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: "rgba(255, 0, 0, 1)",
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
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default chart;
