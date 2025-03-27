import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";
import { DataContext, useData } from "../../../DataContext";
import Skeleton from "../Misc/Skeleton";
import NavBar from "../Misc/NavBar";
import * as utilities from "../../../utilities.js";
import TokenLogo from "./TokenLogo";
import Loader from "../Misc/Loader";
import moment from "moment";
import "./Wallet.css";

const WalletSwaps: React.FC = () => {
	const { walletAddress } = useParams<{ walletAddress: string }>();
	const fetchWalletDetails = useFetchWalletDetails(walletAddress);
	const { globalDataCache, setGlobalDataCache } = useData();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchSwaps = async (address: string) => {
		setLoading(true);
		try {
			const tokensResponse = await fetch(
				`${process.env.REACT_APP_API_URL}/api/wallet/swaps?wallet=${address}`,
			);
			if (!tokensResponse.ok) {
				throw new Error("Failed to fetch swaps");
			}
			const fetchedData = await tokensResponse.json();
			setGlobalDataCache((prevData) => ({
				...prevData,
				swaps: fetchedData,
				swapsLoaded: true,
			}));
		} catch (error) {
			console.error("Error fetching swaps:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!globalDataCache.swapsLoaded) {
			if (
				!globalDataCache.profile ||
				globalDataCache.walletAddress !== walletAddress
			) {
				fetchWalletDetails()
					.then((data) => {
						fetchSwaps(data.address);
					})
					.catch((error) => {
						console.error("Failed to fetch wallet details:", error);
					});
			} else if (globalDataCache.profile && !globalDataCache.swaps) {
				fetchSwaps(globalDataCache.walletAddress);
			}
		}
	}, [walletAddress, globalDataCache]);

	return (
		<>
			<NavBar />
			<div>
				{loading && <Loader />}
				{!loading && globalDataCache.swaps && (
					<ul className="swap-events">
						{globalDataCache.swaps.map((transaction, index) => {
							const [baseTokenLabel, quoteTokenLabel] =
								transaction.pairLabel.split("/");
							const isBuy = transaction.transactionType === "buy";
							const baseToken = isBuy ? transaction.bought : transaction.sold;
							const quoteToken = isBuy ? transaction.sold : transaction.bought;

							return (
								<li
									className={isBuy ? "swap-item buy" : "swap-item sell"}
									key={index}
								>
									<div className="swap-type">{isBuy ? "Buy" : "Sell"}</div>
									<div className="swap-summary">
										{isBuy ? "Bought" : "Sold"}{" "}
										{utilities.formatPriceNumber(baseToken.amount)}{" "}
										<img src={baseToken.logo} width="20" /> {baseToken.symbol} (
										<span className="usd-amount">
											{utilities.formatAsUSD(transaction.totalValueUsd)}
										</span>
										)
									</div>
									<p>{transaction.pairLabel}</p>
									<p>
										{isBuy ? "Buy" : "Sell"} price: ${baseToken.usdPrice}
									</p>
									<p>
										Swapped for{" "}
										<span className="swapped-for">
											{quoteToken.amount} {quoteToken.symbol}
										</span>
									</p>
									<p>
										{moment(transaction.blockTimestamp).fromNow()} via{" "}
										<img src={transaction.exchangeLogo} width="20" />{" "}
										{transaction.exchangeName}
									</p>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</>
	);
};

export default WalletSwaps;
