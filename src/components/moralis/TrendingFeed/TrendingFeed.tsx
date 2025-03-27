import React from "react";
import { useData } from "../../../DataContext";
import MiniAreaChart from "./MiniAreaChart";
import Skeleton from "../Misc/Skeleton";

const TrendingFeed: React.FC = () => {
  const { globalDataCache, loading } = useData();

  return (
    <div id="market-data" className="container">
      <div className="row">
        <div className="col-md-3 offset-md-1">
          <div className="wallet-card saved-tokens">
            <h2>Saved Tokens</h2>
            {loading && <Skeleton />}
            <ul className="favourite-list">
              {globalDataCache.favouriteTokens && (
                <>
                  {globalDataCache.favouriteTokens.map((token, index) => {
                    const ohlcClosePrices =
                      token?.ohlcv?.map((entry) => entry.close)?.reverse() ||
                      [];

                    const trend =
                      ohlcClosePrices.length > 1
                        ? ohlcClosePrices[ohlcClosePrices.length - 1] -
                          ohlcClosePrices[0]
                        : 0;

                    return (
                      <li key={`${index}-symbol`}>
                        <div className="favourite-token">
                          <img
                            src={token?.price?.tokenLogo}
                            alt={token?.price?.tokenSymbol}
                          />
                          <div>
                            <div className="favourite-symbol">
                              {token?.price?.tokenSymbol}
                            </div>
                            <div className="favourite-name">Ethereum</div>
                          </div>
                        </div>
                        <div className="favourite-price">
                          <div
                            className={
                              Number(token?.price?.percentChange24h) > 0
                                ? "positive"
                                : "negative"
                            }
                          >
                            {Number(token?.price?.percentChange24h).toFixed(2)}%
                          </div>
                          <div className="price">
                            {utilities.formatAsUSD(token?.price?.usdPrice)}
                          </div>
                        </div>
                        <div className="favourite-chart">
                          {ohlcClosePrices.length > 0 && (
                            <MiniAreaChart
                              data={ohlcClosePrices}
                              trend={trend}
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingFeed;
