import React from "react";
import { useData } from "../../../DataContext";
import TokenPriceChart from "./TokenPriceChart";
import moment from "moment";
import { Table } from "reactstrap";
import Loader from "../Misc/Loader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./TokenDashboard.css";

const TokenDashboard: React.FC<{
  topOwnersLoading: boolean;
  tokenPricesLoading: boolean;
}> = ({ topOwnersLoading, tokenPricesLoading }) => {
  const { globalDataCache } = useData();

  return (
    <div className="container">
      <h1>{globalDataCache.token.tokenMetadata.name}</h1>
      <div className="row">
        <div className="col-lg-6">
          <h5>Token Metadata</h5>
          <ul className="table-list">
            <li>
              <div className="left">Total Supply</div>
              <div className="right">
                {globalDataCache.token.tokenMetadata.total_supply_formatted}
              </div>
            </li>
            <li>
              <div className="left">Fully Diluted Valuation</div>
              <div className="right">
                ${globalDataCache.token.tokenMetadata.fdv}
              </div>
            </li>
            <li>
              <div className="left">Token Age</div>
              <div className="right">
                {moment().diff(
                  globalDataCache.token.tokenMetadata.created_at,
                  "days",
                )}{" "}
                days
              </div>
            </li>
            <li>
              <div className="left">Date Created</div>
              <div className="right">
                {moment(globalDataCache.token.tokenMetadata.created_at).format(
                  "YYYY-MM-DD",
                )}
              </div>
            </li>
            <li>
              <div className="left">Current Price</div>
              <div className="right">
                ${globalDataCache.token.tokenPrice.usdPrice}
              </div>
            </li>
            <li>
              <div className="left">Token Address</div>
              <div className="right copy-container">
                {utilities.shortAddress(globalDataCache.token.tokenAddress)}
                <CopyToClipboard
                  valueToCopy={globalDataCache.token.tokenAddress}
                >
                  <button>Copy</button>
                </CopyToClipboard>
              </div>
            </li>
            <li>
              <div className="left">Name</div>
              <div className="right">
                {globalDataCache.token.tokenMetadata.name}
              </div>
            </li>
            <li>
              <div className="left">Symbol</div>
              <div className="right">
                {globalDataCache.token.tokenMetadata.symbol}
              </div>
            </li>
            <li>
              <div className="left">Contract Type</div>
              <div className="right">ERC20</div>
            </li>
            <li>
              <div className="left">Decimals</div>
              <div className="right">
                {globalDataCache.token.tokenMetadata.decimals}
              </div>
            </li>
          </ul>
        </div>

        <div className="col-lg-6">
          <h5>Token Price Movement</h5>
          <div className="canvas">
            {tokenPricesLoading ? (
              <Loader />
            ) : (
              <TokenPriceChart
                chartArray={globalDataCache.token.tokenPrices}
                direction={globalDataCache.token.tokenPriceStats.direction}
              />
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <h5>Pair Details</h5>
          <ul className="table-list">
            <li>
              <div className="left">Price USD</div>
              <div className="right">
                {utilities.formatAsUSD(
                  globalDataCache.token.tokenPrice.usdPrice,
                )}
              </div>
            </li>
            <li>
              <div className="left">Price</div>
              <div className="right">
                {globalDataCache.token.tokenPrice?.nativePrice?.value /
                  Math.pow(10, 18)}
              </div>
            </li>
            {/* Additional details can be added here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenDashboard;
