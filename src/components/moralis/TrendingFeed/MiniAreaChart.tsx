import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface MiniAreaChartProps {
  data: number[];
  trend: number;
}

const MiniAreaChart: React.FC<MiniAreaChartProps> = ({ data, trend }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current?.getContext("2d");

    if (!chartCanvas) return;

    const gradient = chartCanvas.createLinearGradient(0, 0, 0, 100);
    if (trend > 0) {
      gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)"); // Green
      gradient.addColorStop(1, "rgba(0, 255, 0, 0.2)");
    } else {
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.2)"); // Red
      gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");
    }

    const chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: data.map((_, index) => index.toString()),
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: gradient,
            borderColor: trend > 0 ? "#61f887" : "#f86161",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: { display: false },
          y: { display: false },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => chart.destroy(); // Cleanup
  }, [data, trend]);

  return <canvas ref={chartRef} width={80} height={40}></canvas>;
};

export default MiniAreaChart;
