import React, { useEffect, useState } from "react";
import { useData } from "../../../DataContext";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const WalletInteractions: React.FC = () => {
	const { globalDataCache } = useData();
	const [activeTab, setActiveTab] = useState<string>("1");

	const toggle = (tab: string) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	useEffect(() => {
		console.log("Context value changed:", globalDataCache);
	}, [globalDataCache]);

	return (
		<div className="interactions-container">
			<Nav tabs>
				<NavItem>
					<NavLink
						className={activeTab === "1" ? "active" : ""}
						onClick={() => toggle("1")}
					>
						Unique Addresses Sent To
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={activeTab === "2" ? "active" : ""}
						onClick={() => toggle("2")}
					>
						Unique Addresses Sent From
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<ul>
						{globalDataCache.interactions.to &&
							globalDataCache.interactions.to.map((item) => (
								<li key={item[0]}>
									<div className="address">{item[0]}</div>
									<div>{item[1]}</div>
								</li>
							))}
					</ul>
				</TabPane>
				<TabPane tabId="2">
					<ul>
						{globalDataCache.interactions.from &&
							globalDataCache.interactions.from.map((item) => (
								<li key={item[0]}>
									<div className="address">{item[0]}</div>
									<div>{item[1]}</div>
								</li>
							))}
					</ul>
				</TabPane>
			</TabContent>
		</div>
	);
};

export default WalletInteractions;
