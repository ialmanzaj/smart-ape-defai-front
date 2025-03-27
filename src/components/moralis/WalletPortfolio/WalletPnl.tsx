import React, { useState, useEffect } from "react";
import { useData } from "../../../DataContext";
import NavBar from "../Misc/NavBar";
import ChainDropDown from "../Misc/ChainDropDown";
import TokenLogo from "./TokenLogo";
import Loader from "../Misc/Loader";
import { UncontrolledTooltip } from "reactstrap";
import * as utilities from "../../../utilities.js";
import { useNavigate, useParams } from "react-router-dom";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";

const WalletPnl: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const fetchWalletDetails = useFetchWalletDetails(walletAddress);
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPnl = async (chain: string, address: string) => {
    setLoading(true);
    setError(null);
    try {
      const tokensResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wallet/pnl?chain=${chain}&wallet=${address}`,
      );
      if (!tokensResponse.ok) {
        throw new Error("Failed to fetch tokens");
      }
      const fetchedData = await tokensResponse.json();
      setGlobalDataCache((prevData) => ({
        ...prevData,
        pnl: fetchedData,
        pnlLoaded: true,
      }));
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setError("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        {loading && <Loader />}
        {!loading && globalDataCache.pnl && (
          <ul>
            {globalDataCache.pnl.map((token) => (
              <li key={token.token_address}>
                <TokenLogo tokenImage={token.logo} tokenName={token.name} />
                <div>{token.count_of_trades}</div>
                <div>
                  {utilities.formatPriceNumber(token.realized_profit_usd)}
                </div>
                <div>
                  {Number(token.realized_profit_percentage).toFixed(2)}%
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WalletPnl;
