import React, { useState, useEffect } from "react";
import { useData } from "../../../DataContext";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../Misc/Skeleton";
import TokenLogo from "../WalletPortfolio/TokenLogo";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

const MarketData: React.FC = () => {
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState(false);
  const [moversLoading, setMoversLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("1");

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchFirstTab = (chain: string) => {
    setMoversLoading(true);
    setError(null);
    setGlobalDataCache((prevData) => ({
      ...prevData,
      marketCap: null,
      tradingVolume: null,
      marketDataLoaded: false,
    }));
    fetch(`${process.env.REACT_APP_API_URL}/api/market-data/movers`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((fetchedData) => {
        setGlobalDataCache((prevData) => ({
          ...prevData,
          tokenMovers: fetchedData.top_movers,
        }));
        setMoversLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setMoversLoading(false);
      });
  };

  const fetchMarketData = (chain: string) => {
    setLoading(true);
    setError(null);
    setGlobalDataCache((prevData) => ({
      ...prevData,
      marketCap: null,
      tradingVolume: null,
      marketDataLoaded: false,
    }));
    fetch(`${process.env.REACT_APP_API_URL}/api/market-data`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((fetchedData) => {
        setGlobalDataCache((prevData) => ({
          ...prevData,
          marketCap: fetchedData.market_cap,
          tradingVolume: fetchedData.trading_volume,
          topTokens: fetchedData.top_tokens,
          nftMarketCap: fetchedData.nft_market_cap,
          nftVolume: fetchedData.nft_volume,
          marketDataLoaded: true,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!globalDataCache.marketDataLoaded) {
      setLoading(true);
      setMoversLoading(true);
      fetchFirstTab("eth");
      fetchMarketData("eth");
    }
  }, [globalDataCache.marketDataLoaded]);

  return <div>{/* Your component JSX goes here */}</div>;
};

export default MarketData;
