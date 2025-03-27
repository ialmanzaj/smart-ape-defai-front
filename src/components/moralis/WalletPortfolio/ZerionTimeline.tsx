import React from "react";
import TransactionImage from "./TransactionImage";
import TokenLogo from "./TokenLogo";
import moment from "moment";
import { useData } from "../../../DataContext";

interface ZerionTimelineProps {
	transactions: any[]; // Replace 'any' with the appropriate type
}

const ZerionTimeline: React.FC<ZerionTimelineProps> = ({ transactions }) => {
	const { globalDataCache } = useData();

	return (
		<div>
			<h3>Zerion Transactions</h3>
			<ul>
				{transactions.map((item) => (
					<li key={item.id}>
						<div>
							<TokenLogo
								tokenImage={item.tokenLogo}
								tokenName={item.tokenName}
							/>
							<div>{moment(item.block_timestamp).fromNow()}</div>
							<div>{item.category}</div>
							<TransactionImage transaction={item} chain={item.chain} />
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ZerionTimeline;
