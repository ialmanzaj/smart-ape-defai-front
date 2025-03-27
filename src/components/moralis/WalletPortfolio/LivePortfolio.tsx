import React, { useState, useEffect } from "react";
import { useData } from "../../../DataContext";
import Skeleton from "../Misc/Skeleton";
import ChainDropDown from "./ChainDropDown";
import TokenLogo from "./TokenLogo";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const LivePortfolio: React.FC = () => {
  const { globalDataCache } = useData();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch live portfolio logic here
  }, []);

  return (
    <div>
      {loading && <Skeleton />}
      {!loading && globalDataCache.tokens && (
        <ul>
          {globalDataCache.tokens.map((token) => (
            <li key={token.id}>
              <TokenLogo tokenImage={token.logo} tokenName={token.name} />
              {/* Other token details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LivePortfolio;
