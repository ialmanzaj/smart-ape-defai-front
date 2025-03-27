import React, { useEffect, useState } from "react";
import { useData } from "../../../DataContext";
import NavBar from "../Misc/NavBar";
import Loader from "../Misc/Loader";
import ChainDropDown from "../Misc/ChainDropDown";
import TokenLogo from "./TokenLogo";
import ExternalLinkIcon from "../Misc/ExternalLinkIcon";
import * as utilities from "../../../utilities.js";
import { Link, useNavigate } from "react-router-dom";

const DeFiTokens: React.FC = () => {
  const { globalDataCache } = useData();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logic here
  }, []);

  return (
    <>
      <NavBar />
      <div>
        {loading && <Loader />}
        {!loading && globalDataCache.defiTokens && (
          <div>
            <h2>DeFi Tokens</h2>
            <ChainDropDown />
            <ul>
              {globalDataCache.defiTokens.map((token) => (
                <li key={token.id}>
                  <TokenLogo tokenImage={token.logo} tokenName={token.name} />
                  <Link to={`/defi/${token.id}`}>
                    <ExternalLinkIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DeFiTokens;
