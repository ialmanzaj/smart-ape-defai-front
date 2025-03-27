import React, { useState } from "react";
import { Collapse } from "reactstrap";
import moment from "moment";
import * as utilities from "../../utilities.js";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer";
import TransactionImage from "../WalletPortfolio/TransactionImage";
import SimpleCategory from "../WalletPortfolio/SimpleCategory";

interface TrendingData {
	walletAddress: string;
	category: string;
	totalValueUsd: number;
	blockTimestamp: string;
}

interface TrendingProps {
	trendingData: TrendingData[];
}

const Trending: React.FC<TrendingProps> = ({ trendingData }) => {
	const { globalDataCache } = useData();
	const [selectedHolder, setSelectedHolder] = useState<any | null>(null);
	const [walletData, setWalletData] = useState<any | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleRowClick = (holder: TrendingData) => {
		setSelectedHolder(holder);
		setIsMenuOpen(true);
		fetchWalletData(holder.walletAddress);
	};

	const fetchWalletData = async (walletAddress: string) => {
		setLoading(true);
		setError(null);
		setWalletData(null);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/wallet/${walletAddress}/token/${globalDataCache.pairStats.tokenAddress}/top-holder?chain=${globalDataCache.selectedChain}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch wallet data");
			}
			const data = await response.json();
			setWalletData(data);
		} catch (err) {
			console.error("Error fetching wallet data:", err);
			setError("Failed to load wallet data");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h2>Trending Transactions</h2>
			<div>
				{trendingData.map((item, index) => (
					<div key={index} onClick={() => handleRowClick(item)}>
						<h3>{item.walletAddress}</h3>
						<p>{item.category}</p>
						<p>{moment(item.blockTimestamp).fromNow()}</p>
					</div>
				))}
			</div>
			<SideDrawer
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				title={"Wallet Details"}
				loading={loading}
				error={error}
				content={selectedHolder && <div>{selectedHolder.walletAddress}</div>}
			/>
		</>
	);
};

export default Trending;
