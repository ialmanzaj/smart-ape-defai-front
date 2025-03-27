import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../DataContext";
import Holders from "./Holders";
import MoneyFlowList from "./MoneyFlowList";

const PairDashboard: React.FC = () => {
	const { address } = useParams<{ address: string }>();
	const { globalDataCache } = useData();

	return (
		<div>
			<h1>Pair Dashboard for {address}</h1>
			<Holders holders={globalDataCache.holders} />
			<MoneyFlowList moneyFlows={globalDataCache.moneyFlows} />
		</div>
	);
};

export default PairDashboard;
