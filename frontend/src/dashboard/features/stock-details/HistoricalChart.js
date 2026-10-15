import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const HistoricalChart = ({ data }) => {
  if (!data) {
    return <p>No historical data available.</p>;
  }

  const priceData = data.datasets?.find(
    (dataset) => dataset.metric === "Price",
  );

  const labels = priceData.values.map((item) => item[0]);
  const prices = priceData.values.map((item) => Number(item[1]));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.08)",
        borderColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => `₹${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.06)",
        },
      },
    },
  };

  return (
    <div className="historical-chart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HistoricalChart;
