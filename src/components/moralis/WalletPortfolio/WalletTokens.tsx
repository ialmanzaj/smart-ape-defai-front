import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../DataContext";
import TokenLogo from "./TokenLogo";
import Loader from "../Misc/Loader";

const WalletTokens: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const { globalDataCache } = useData();

  return (
    <div>
      {globalDataCache.tokens ? (
        <ul>
          {globalDataCache.tokens.map((token) => (
            <li key={token.id}>
              <TokenLogo tokenImage={token.logo} tokenName={token.name} />
              <div>{token.balance}</div>
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WalletTokens;
