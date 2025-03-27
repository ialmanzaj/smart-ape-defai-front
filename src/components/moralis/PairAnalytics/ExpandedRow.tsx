import React, { useEffect, useState } from "react";
import { Collapse, Spinner } from "reactstrap";

interface ExpandedRowProps {
	isOpen: boolean;
	address: string;
	fetchWalletInfo: (address: string) => Promise<void>;
	walletData: Record<string, any>;
	contentRenderer: (data: any) => JSX.Element;
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({
	isOpen,
	address,
	fetchWalletInfo,
	walletData,
	contentRenderer,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen && address && !walletData[address]) {
			setLoading(true);
			fetchWalletInfo(address)
				.catch((err) => setError(err.message))
				.finally(() => setLoading(false));
		}
	}, [isOpen, address, fetchWalletInfo, walletData]);

	return (
		<Collapse isOpen={isOpen}>
			{loading ? (
				<Spinner size="sm" />
			) : error ? (
				<div className="text-danger">{error}</div>
			) : walletData[address] ? (
				<div className="expanded-row-content p-3">
					{contentRenderer(walletData[address])}
				</div>
			) : (
				<div>No data available.</div>
			)}
		</Collapse>
	);
};

export default ExpandedRow;
