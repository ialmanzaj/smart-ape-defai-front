import React, { useState } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import * as utilities from "../../utilities.js";
import CopyToClipboard from "../Misc/CopyToClipboard";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer";
import TransactionImage from "../WalletPortfolio/TransactionImage";
import SimpleCategory from "../WalletPortfolio/SimpleCategory";

interface Sniper {
	walletAddress: string;
	currentBalance: number;
	totalTokensSniped: number;
	totalSnipedUsd: number;
}

interface SnipersProps {
	snipers: Sniper[];
}

const Snipers: React.FC<SnipersProps> = ({ snipers }) => {
	const { globalDataCache } = useData();
	const [selectedHolder, setSelectedHolder] = useState<any | null>(null);
	const [walletData, setWalletData] = useState<any | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleRowClick = (holder: Sniper) => {
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
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Wallet</th>
						<th>Current Balance</th>
						<th>Total Tokens Sniped</th>
						<th>Total Sniped (USD)</th>
					</tr>
				</thead>
				<tbody>
					{snipers.map((sniper, index) => (
						<tr key={index} onClick={() => handleRowClick(sniper)}>
							<td>{index + 1}</td>
							<td>{sniper.walletAddress}</td>
							<td>{sniper.currentBalance}</td>
							<td>{sniper.totalTokensSniped}</td>
							<td>${sniper.totalSnipedUsd.toLocaleString()}</td>
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
				content={selectedHolder && <div>{selectedHolder.walletAddress}</div>}
			/>
		</>
	);
};

export default Snipers;
