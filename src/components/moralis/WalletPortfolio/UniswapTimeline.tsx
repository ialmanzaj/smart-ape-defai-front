import React from "react";
import TransactionImage from "./TransactionImage";
import SimpleCategory from "./SimpleCategory";
import moment from "moment";

interface UniswapTimelineProps {
	transactions: any[]; // Replace 'any' with the appropriate type
}

const UniswapTimeline: React.FC<UniswapTimelineProps> = ({ transactions }) => {
	return (
		<div>
			<h3>Uniswap Transactions</h3>
			<ul>
				{transactions.map((item) => (
					<li key={item.id}>
						<div>
							<SimpleCategory category={item.category} />
							<TransactionImage transaction={item} chain={item.chain} />
							<div>{moment(item.block_timestamp).fromNow()}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UniswapTimeline;
