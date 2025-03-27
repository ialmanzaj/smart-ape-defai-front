import React from "react";
import { useData } from "../../../DataContext";
import WalletTokens from "./WalletTokens";
import WalletSwaps from "./WalletSwaps";
import WalletApprovals from "./WalletApprovals";
import WalletInteractions from "./WalletInteractions";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const WalletPortfolio: React.FC = () => {
	const { globalDataCache } = useData();
	const [activeTab, setActiveTab] = React.useState("1");

	const toggle = (tab: string) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div>
			<Nav tabs>
				<NavItem>
					<NavLink
						className={activeTab === "1" ? "active" : ""}
						onClick={() => toggle("1")}
					>
						Tokens
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={activeTab === "2" ? "active" : ""}
						onClick={() => toggle("2")}
					>
						Swaps
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={activeTab === "3" ? "active" : ""}
						onClick={() => toggle("3")}
					>
						Approvals
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={activeTab === "4" ? "active" : ""}
						onClick={() => toggle("4")}
					>
						Interactions
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<WalletTokens />
				</TabPane>
				<TabPane tabId="2">
					<WalletSwaps />
				</TabPane>
				<TabPane tabId="3">
					<WalletApprovals />
				</TabPane>
				<TabPane tabId="4">
					<WalletInteractions />
				</TabPane>
			</TabContent>
		</div>
	);
};

export default WalletPortfolio;
