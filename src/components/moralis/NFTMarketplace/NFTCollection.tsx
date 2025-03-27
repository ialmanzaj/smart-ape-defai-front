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

const NFTCollection: React.FC = () => {
	const { globalDataCache, setGlobalDataCache } = useData();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		async function fetchEntityDetails() {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/api/entities/${id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch entity details");
				}
				const data = await response.json();
				setGlobalDataCache((prevData) => ({
					...prevData,
					activeNFTCollection: data,
				}));
			} catch (error) {
				setError(error.message);
				console.error("Error fetching entity details:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchEntityDetails();
	}, [id, setGlobalDataCache]);

	if (loading) return <Loader />;
	if (error) return <div>Error: {error}</div>;

	return <div>{/* Your component JSX goes here */}</div>;
};

export default NFTCollection;
