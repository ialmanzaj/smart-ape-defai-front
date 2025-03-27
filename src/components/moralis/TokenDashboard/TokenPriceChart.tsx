import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

interface TokenPriceChartProps {
	chartArray: number[];
	direction: string;
}

const TokenPriceChart: React.FC<TokenPriceChartProps> = ({
	chartArray,
	direction,
}) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
			chartInstance.current = null;
		}

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
							color: "#0f2140",
						},
						ticks: {
							precision: 0,
							color: "#dee0e0",
						},
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false,
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
						label: "Token Price",
						data: chartArray,
						backgroundColor:
							direction === "up"
								? "rgba(0, 255, 0, 0.1)"
								: "rgba(255, 0, 0, 0.1)",
						borderColor: direction === "up" ? "#61f887" : "#f86161",
						fill: true,
						tension: 0.4,
					},
				],
			};

			chartInstance.current = new Chart(ctx, {
				type: "line",
				data: txData,
				options: options,
			});
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [chartArray, direction]);

	return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default TokenPriceChart;
