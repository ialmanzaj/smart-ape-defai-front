import React, { useState } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import ExpandedRow from "./ExpandedRow";
import CopyToClipboard from "../Misc/CopyToClipboard";
import * as utilities from "../../utilities.js";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer";

interface Transaction {
	walletAddress: string;
	totalValueUsd: number;
	blockTimestamp: string;
}

interface TransactionsProps {
	pairLabel: string;
	transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({
	pairLabel,
	transactions,
}) => {
	const [expandedRow, setExpandedRow] = useState<number | null>(null);
	const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
	const [walletData, setWalletData] = useState<any | null>(null);
	const { globalDataCache } = useData();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const openSidebar = (tx: Transaction) => {
		setSelectedTx(tx);
		setIsMenuOpen(true);
		fetchWalletData(tx.walletAddress);
	};

	const fetchWalletData = async (walletAddress: string) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/wallet/${walletAddress}/token/${globalDataCache.pairStats.tokenAddress}?chain=${globalDataCache.selectedChain}`,
			);
			const walletStats = await response.json();
			setWalletData(walletStats);
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
						<th>Date</th>
						<th>Transaction</th>
						<th>USD Value</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => (
						<tr key={index} onClick={() => openSidebar(transaction)}>
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
				title={"Transaction Details"}
				loading={loading}
				error={error}
				content={selectedTx && <div>{selectedTx.walletAddress}</div>}
			/>
		</>
	);
};

export default Transactions;
