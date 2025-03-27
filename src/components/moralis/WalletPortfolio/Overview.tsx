import React, { useEffect, useState } from "react";
import { useData } from "../../../DataContext";
import Skeleton from "../Misc/Skeleton";
import TxChart from "./TxChart";
import NetworthChart from "./NetworthChart";
import TokenLogo from "./TokenLogo";
import ChainDropDown from "../Misc/ChainDropDown";
import ExternalLinkIcon from "../Misc/ExternalLinkIcon";
import moment from "moment";

const Overview: React.FC = () => {
	const { globalDataCache } = useData();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		// Fetch overview logic here
	}, []);

	return (
		<div>
			{loading && <Skeleton />}
			{!loading && globalDataCache.overview && (
				<div>
					<h2>Overview</h2>
					<NetworthChart chartArray={globalDataCache.overview.networth} />
					<TxChart chartArray={globalDataCache.overview.transactions} />
					{/* Other overview details */}
				</div>
			)}
		</div>
	);
};

export default Overview;
