import React, { useState } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import * as utilities from "../../utilities.js";
import CopyToClipboard from "../Misc/CopyToClipboard";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer";
import TransactionImage from "../WalletPortfolio/TransactionImage";
import SimpleCategory from "../WalletPortfolio/SimpleCategory";

interface WhaleMovement {
	walletAddress: string;
	totalValueUsd: number;
	blockTimestamp: string;
}

interface WhaleMovementsProps {
	transactions: WhaleMovement[];
}

const WhaleMovements: React.FC<WhaleMovementsProps> = ({ transactions }) => {
	const { globalDataCache } = useData();
	const [selectedHolder, setSelectedHolder] = useState<any | null>(null);
	const [walletData, setWalletData] = useState<any | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

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

	const handleRowClick = (transaction: WhaleMovement) => {
		setSelectedHolder(transaction);
		setIsMenuOpen(true);
		fetchWalletData(transaction.walletAddress);
	};

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Type</th>
						<th>Transaction</th>
						<th>USD Value</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => (
						<tr key={index} onClick={() => handleRowClick(transaction)}>
							<td>{moment(transaction.blockTimestamp).fromNow()}</td>
							<td>{transaction.walletAddress}</td>
							<td>${transaction.totalValueUsd.toLocaleString()}</td>
							<td>
								<CopyToClipboard text={transaction.walletAddress} />
							</td>
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

export default WhaleMovements;
