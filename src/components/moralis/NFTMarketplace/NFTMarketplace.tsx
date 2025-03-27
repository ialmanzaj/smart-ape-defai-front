import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../../Misc/NavBar";
import { useData } from "../../../DataContext";
import TokenLogo from "../WalletPortfolio/TokenLogo";
import ExternalLinkIcon from "../../Misc/ExternalLinkIcon";
import Skeleton from "../../Misc/Skeleton";
import SkeletonCard from "../../Misc/SkeletonCard";
import * as utilities from "../../../utilities.js";
import CollectionCategory from "./CollectionCategory";

const NFTMarketplace: React.FC = () => {
	const { globalDataCache, setGlobalDataCache } = useData();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const shouldFetch = !globalDataCache.nft;
		if (shouldFetch) {
			fetch(`${process.env.REACT_APP_API_URL}/api/marketplace`)
				.then((response) => {
					if (!response.ok) throw new Error("Failed to fetch data");
					return response.json();
				})
				.then((fetchedData) => {
					setGlobalDataCache((prevData) => ({
						...prevData,
						nft: {
							trending: fetchedData.trending,
							top: fetchedData.top,
							featured: fetchedData.featured,
						},
					}));
				})
				.catch((error) => {
					setError(error.message);
					setLoading(false);
				});
		}
	}, [globalDataCache.nft, setGlobalDataCache]);

	return <div>{/* Your component JSX goes here */}</div>;
};

export default NFTMarketplace;
