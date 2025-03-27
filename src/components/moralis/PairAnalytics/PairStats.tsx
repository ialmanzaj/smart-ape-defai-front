import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	BarElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from "chart.js";
import "./PairStats.css";
import * as utilities from "../../utilities.js";
import { useData } from "../../DataContext";

ChartJS.register(
	LineElement,
	BarElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
);

interface PairStatsProps {
	pairStats: {
		buys: Record<string, number>;
		sells: Record<string, number>;
		buyers: Record<string, number>;
		sellers: Record<string, number>;
		buyVolume: Record<string, number>;
		sellVolume: Record<string, number>;
		liquidityPercentChange: Record<string, number>;
		totalLiquidityUsd: string;
	};
}

const PairStats: React.FC<PairStatsProps> = ({ pairStats }) => {
	const timeframes = ["5min", "1h", "4h", "24h"];
	const [selectedTimeframe, setSelectedTimeframe] = useState("5min");
	const { globalDataCache } = useData();

	const handleTimeframeClick = (timeframe: string) => {
		setSelectedTimeframe(timeframe);
	};

	const getBarWidths = (value1: number, value2: number) => {
		const total = value1 + value2;
		return total > 0
			? { width1: (value1 / total) * 100, width2: (value2 / total) * 100 }
			: { width1: 50, width2: 50 };
	};

	const buys = pairStats?.buys?.[selectedTimeframe] || 0;
	const sells = pairStats?.sells?.[selectedTimeframe] || 0;
	const liquidityChange =
		pairStats?.liquidityPercentChange?.[selectedTimeframe] || 0;
	const currentTotalLiquidity = parseFloat(pairStats?.totalLiquidityUsd || "0");

	const buysSellsWidths = getBarWidths(buys, sells);

	return (
		<div>
			<h2>Pair Stats</h2>
			<div>
				<Bar
					data={{
						labels: timeframes,
						datasets: [
							{
								label: "Buys",
								data: [buys],
								backgroundColor: "green",
							},
							{
								label: "Sells",
								data: [sells],
								backgroundColor: "red",
							},
						],
					}}
				/>
			</div>
		</div>
	);
};

export default PairStats;
