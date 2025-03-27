import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokenDashboard from "./TokenDashboard";
import { useData } from "../../../DataContext";
import Loader from "../Misc/Loader";
import WalletForm from "../WalletPortfolio/WalletForm";

const TokenViewer: React.FC = () => {
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState(false);
  const { tokenAddress } = useParams<{ tokenAddress: string }>();

  useEffect(() => {
    if (tokenAddress) {
      fetchToken(tokenAddress);
    }
  }, [tokenAddress]);

  const fetchToken = async (address: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/token/${address}`,
      );
      if (!response.ok) throw new Error("Failed to fetch token");
      const data = await response.json();
      setGlobalDataCache((prevData) => ({
        ...prevData,
        token: data,
      }));
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      setLoading(false);
    }
  };

  return <div>{loading ? <Loader /> : <TokenDashboard />}</div>;
};

export default TokenViewer;
