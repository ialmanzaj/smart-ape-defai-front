import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface SpamChartProps {
	chartArray: {
		labels: string[];
		data: number[];
	};
}

const SpamChart: React.FC<SpamChartProps> = ({ chartArray }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
			chartInstance.current = null;
		}

		// Ensure the chartRef is available
		if (chartRef.current) {
			const ctx = chartRef.current.getContext("2d");

			const options = {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						type: "category",
						grid: {
							display: false,
						},
						ticks: {
							display: false,
						},
					},
					y: {
						type: "linear",
						grid: {
							display: true,
							color: "#172844",
						},
						ticks: {
							precision: 10,
							source: "auto",
							color: "#7886a6",
						},
						beginAtZero: false,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let label = context.dataset.label || "";
								if (label) {
									label += ": ";
								}
								if (context.parsed.y !== null) {
									label += context.parsed.y;
								}
								// Access the 'block' property from the tooltip's data point
								if (context.raw.block) {
									label += " | Block: " + context.raw.block;
								}
								return label;
							},
						},
					},
				},
				hover: {
					intersect: false,
				},
				elements: {
					point: {
						radius: 1,
					},
				},
			};

			const txData = {
				datasets: [
					{
						label: "Spam",
						backgroundColor: "rgba(255, 81, 81, 0.6)",
						borderColor: "#FF5151",
						fill: true,
						data: chartArray.data,
						tension: 0.4,
					},
				],
			};

			// Create a new Chart instance and store in the ref
			chartInstance.current = new Chart(ctx, {
				type: "line",
				data: txData,
				options: options,
			});
		}

		// Cleanup: destroy the chart instance on component unmount
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [chartArray]);

	return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default SpamChart;
