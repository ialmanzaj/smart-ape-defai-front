import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface NetworthChartProps {
  chartArray: number[];
}

const NetworthChart: React.FC<NetworthChartProps> = ({ chartArray }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const chartData = {
        labels: chartArray.map((_, index) => index.toString()),
        datasets: [
          {
            label: "Net Worth",
            data: chartArray,
            borderColor: "#61f887",
            fill: false,
          },
        ],
      };

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartArray]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default NetworthChart;
