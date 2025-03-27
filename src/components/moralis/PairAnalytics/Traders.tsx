import React, { useState } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import CopyToClipboard from "../Misc/CopyToClipboard";
import * as utilities from "../../utilities.js";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer";
import TransactionImage from "../WalletPortfolio/TransactionImage";
import SimpleCategory from "../WalletPortfolio/SimpleCategory";

interface Trader {
	address: string;
	countOfTrades: number;
	avgBuyPrice: number;
	avgSellPrice: number;
	realizedProfitPercentage: number;
	realizedProfitUsd: number;
	unrealizedProfitPercentage: number;
}

interface TradersProps {
	traders: Trader[];
}

const Traders: React.FC<TradersProps> = ({ traders }) => {
	const { globalDataCache } = useData();
	const [selectedHolder, setSelectedHolder] = useState<any | null>(null);
	const [walletData, setWalletData] = useState<any | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleRowClick = (holder: Trader) => {
		setSelectedHolder(holder);
		setIsMenuOpen(true);
		fetchWalletData(holder.address);
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
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Address</th>
						<th>Count of Trades</th>
						<th>Avg. Buy Price</th>
						<th>Avg. Sell Price</th>
						<th>Realized Profit %</th>
						<th>Realized Profit $</th>
						<th>Unrealized Profit %</th>
					</tr>
				</thead>
				<tbody>
					{traders.map((trader, index) => (
						<tr key={index} onClick={() => handleRowClick(trader)}>
							<td>{index + 1}</td>
							<td>{trader.address}</td>
							<td>{trader.countOfTrades}</td>
							<td>${trader.avgBuyPrice.toLocaleString()}</td>
							<td>${trader.avgSellPrice.toLocaleString()}</td>
							<td>{trader.realizedProfitPercentage.toFixed(2)}%</td>
							<td>${trader.realizedProfitUsd.toLocaleString()}</td>
							<td>{trader.unrealizedProfitPercentage.toFixed(2)}%</td>
						</tr>
					))}
				</tbody>
			</Table>
			<SideDrawer
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				title={"Wallet Details"}
				loading={loading}
				error={error}
				content={selectedHolder && <div>{selectedHolder.address}</div>}
			/>
		</>
	);
};

export default Traders;
