import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import * as utilities from "../../../utilities";

interface VolumeCategoryBarsProps {
	categories: {
		categoryId: string;
		totalBuyVolume: Record<string, number>;
		totalSellVolume: Record<string, number>;
		totalBuyers: Record<string, number>;
		totalSellers: Record<string, number>;
		timeseries?: {
			timeseries: Array<{
				timestamp: string;
				buyVolume: number;
				sellVolume: number;
			}>;
		};
	}[];
}

const VolumeCategoryBars: React.FC<VolumeCategoryBarsProps> = ({
	categories,
}) => {
	const [selectedTimeframes, setSelectedTimeframes] = useState(() => {
		const defaultTimeframes: Record<string, string> = {};
		categories.forEach((category) => {
			defaultTimeframes[category.categoryId] = "1h";
		});
		return defaultTimeframes;
	});

	const handleTimeframeChange = (categoryId: string, timeframe: string) => {
		setSelectedTimeframes((prev) => ({
			...prev,
			[categoryId]: timeframe,
		}));
	};

	const getTimeseriesChartData = (timeseries: any[]) => {
		if (!Array.isArray(timeseries)) return { labels: [], datasets: [] };

		const labels = timeseries.map((point) =>
			new Date(point.timestamp).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		);
		const totalVolumes = timeseries.map(
			(point) => point.buyVolume + point.sellVolume,
		);

		const isPositiveTrend =
			totalVolumes[totalVolumes.length - 1] > totalVolumes[0];

		const borderColor = isPositiveTrend
			? "rgba(75, 192, 192, 1)"
			: "rgba(255, 99, 132, 1)";
		const backgroundColor = isPositiveTrend
			? "rgba(75, 192, 192, 0.2)"
			: "rgba(255, 99, 132, 0.2)";

		return {
			labels,
			datasets: [
				{
					label: "Total Volume",
					data: totalVolumes,
					borderColor,
					backgroundColor,
					fill: true,
				},
			],
		};
	};

	return (
		<div className="row">
			{categories.map((category) => {
				const selectedTimeframe =
					selectedTimeframes[category.categoryId] || "24h";

				const stats = {
					totalBuyVolume: category.totalBuyVolume[selectedTimeframe],
					totalSellVolume: category.totalSellVolume[selectedTimeframe],
					totalBuyers: category.totalBuyers[selectedTimeframe],
					totalSellers: category.totalSellers[selectedTimeframe],
				};

				return (
					<div key={category.categoryId} className="col">
						<h5>{category.categoryId}</h5>
						<div className="stat-bar">
							<div
								className="bar green"
								style={{
									width: `${(stats.totalBuyVolume / (stats.totalBuyVolume + stats.totalSellVolume)) * 100}%`,
								}}
							></div>
							<div
								className="bar red"
								style={{
									width: `${(stats.totalSellVolume / (stats.totalBuyVolume + stats.totalSellVolume)) * 100}%`,
								}}
							></div>
						</div>
						<div className="stat-group">
							<div className="stat-titles">
								<div>
									Buyers
									<div className="value">{stats.totalBuyers}</div>
								</div>
								<div className="right">
									Sellers
									<div className="value">{stats.totalSellers}</div>
								</div>
							</div>
						</div>
						{category.timeseries &&
						Array.isArray(category.timeseries.timeseries) &&
						category.timeseries.timeseries.length > 0 ? (
							<div className="timeseries-chart" style={{ height: "50px" }}>
								<Line
									data={getTimeseriesChartData(category.timeseries.timeseries)}
									options={{
										responsive: true,
										maintainAspectRatio: false,
										plugins: {
											legend: { display: false },
											tooltip: { enabled: true },
										},
										scales: {
											x: { display: false },
											y: { display: false },
										},
										elements: {
											point: { radius: 0 },
										},
									}}
								/>
							</div>
						) : (
							<div>No timeseries data available</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default VolumeCategoryBars;
