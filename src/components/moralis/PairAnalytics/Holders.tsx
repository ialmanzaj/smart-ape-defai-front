import React, { useState } from "react";
import { Table } from "reactstrap";
import * as utilities from "../../utilities.js";
import CopyToClipboard from "../Misc/CopyToClipboard";
import { useData } from "../../DataContext";
import SideDrawer from "./SideDrawer"; // Import the reusable SideDrawer component
import "./PairDashboard.css"; // Import your CSS for styling
import moment from "moment";
import TransactionImage from "../WalletPortfolio/TransactionImage";
import SimpleCategory from "../WalletPortfolio/SimpleCategory";

interface Holder {
  address: string;
  totalTokensHeld: number;
  totalValueUsd: number;
}

interface HoldersProps {
  holders: Holder[];
}

const Holders: React.FC<HoldersProps> = ({ holders }) => {
  const { globalDataCache } = useData();
  const [selectedHolder, setSelectedHolder] = useState<Holder | null>(null); // Store the clicked holder
  const [walletData, setWalletData] = useState<any | null>(null); // Store fetched wallet data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state for API calls
  const [error, setError] = useState<string | null>(null); // Track errors
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Track side menu state

  // Fetch wallet information
  const fetchWalletData = async (walletAddress: string) => {
    setLoading(true);
    setError(null);
    setWalletData(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wallet/${walletAddress}/token/${globalDataCache.pairStats.tokenAddress}/top-holder?chain=${globalDataCache.selectedChain}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wallet data");
      }
      const data = await response.json();
      setWalletData(data);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (holder: Holder) => {
    setSelectedHolder(holder); // Store the clicked holder
    setIsMenuOpen(true); // Open the sidebar
    fetchWalletData(holder.address); // Fetch additional wallet data
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Total Tokens Held</th>
            <th>Total Value (USD)</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, index) => (
            <tr key={index}>
              <td>{holder.address}</td>
              <td>{holder.totalTokensHeld}</td>
              <td>{holder.totalValueUsd}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Side Drawer */}
      <SideDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title={"💎 Holder Details"}
        loading={loading}
        error={error}
        content={
          selectedHolder && (
            <>
              <p>
                <strong>Address:</strong> {selectedHolder.address}
              </p>
              <p>
                <strong>Total Tokens Held:</strong>{" "}
                {selectedHolder.totalTokensHeld}
              </p>
              <p>
                <strong>Total Value (USD):</strong>{" "}
                {selectedHolder.totalValueUsd}
              </p>
            </>
          )
        }
        loadedContent={
          walletData && (
            <div>
              <h5>
                <b>Portfolio</b>
              </h5>
              <ul className="mini-token-list">
                {walletData.tokenBalances.map((token, index) => (
                  <li key={index}>
                    <img src={token.logo} alt={token.symbol} width="20" />
                    <div>
                      <a
                        href={`https://moralis.com/chain/ethereum/token/price/${token.token_address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {token.symbol}
                      </a>
                    </div>
                    <div className="token-balance">
                      {utilities.formatAsUSD(token.usd_value)} (
                      <span
                        className={`${
                          Number(token.usd_price_24hr_percent_change) > 0
                            ? `positive`
                            : `negative`
                        }`}
                      >
                        {Number(token.usd_price_24hr_percent_change).toFixed(2)}
                        %
                      </span>
                      )
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        type="holders"
      />
    </>
  );
};

export default Holders;
