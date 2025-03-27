import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "./Overview";
import DeFiTokens from "./DeFiPositions";
import NFTs from "./NFTs";
import History from "./History";
import MarketData from "../MarketData/MarketData";
import NavBar from "../Misc/NavBar";
import WalletForm from "./WalletForm";
import Loader from "../Misc/Loader";

const WalletViewer: React.FC = () => {
	const { walletAddress } = useParams<{ walletAddress: string }>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Fetch wallet details logic here
	}, [walletAddress]);

	return (
		<>
			<NavBar />
			<div>
				{loading ? (
					<Loader />
				) : (
					<Routes>
						<Route path="/" element={<Overview />} />
						<Route path="/defi" element={<DeFiTokens />} />
						<Route path="/nfts" element={<NFTs />} />
						<Route path="/history" element={<History />} />
					</Routes>
				)}
			</div>
		</>
	);
};

export default WalletViewer;
