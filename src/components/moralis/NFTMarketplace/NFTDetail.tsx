import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../../Misc/NavBar";
import { useData } from "../../../DataContext";
import Skeleton from "../../Misc/Skeleton";
import Loader from "../../Misc/Loader";
import SkeletonCard from "../../Misc/SkeletonCard";
import ExternalLinkIcon from "../../Misc/ExternalLinkIcon";
import CopyToClipboard from "../../Misc/CopyToClipboard";
import NFT from "../WalletPortfolio/NFT";
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";
import * as utilities from "../../../utilities.js";
import classnames from "classnames";
import moment from "moment";
import CollectionCategory from "./CollectionCategory";

const NFTDetail: React.FC = () => {
	const { globalDataCache, setGlobalDataCache } = useData();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { collection, tokenId } = useParams<{
		collection: string;
		tokenId: string;
	}>();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<string>("1");

	const toggle = (tab: string) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const goBack = () => {
		navigate(-1);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/nfts/${collection}/${tokenId}`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				setGlobalDataCache((prevData) => ({
					...prevData,
					nftLoaded: true,
					selectedNFT: {
						...prevData.selectedNFT,
						collectionSalePrices: fetchedData.collectionSalePrices,
						nftSalePrices: fetchedData.nftSalePrices,
						nftMetadata: fetchedData.nftMetadata,
						nftTrades: fetchedData.nftTrades,
					},
				}));
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});

		return () => {
			// Cleanup logic if needed
		};
	}, [collection, tokenId, setGlobalDataCache]);

	return <div>{/* Your component JSX goes here */}</div>;
};

export default NFTDetail;
