import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";
import { DataContext, useData } from "../../../DataContext";
import { UncontrolledTooltip } from "reactstrap";
import Skeleton from "../Misc/Skeleton";
import NavBar from "../Misc/NavBar";
import * as utilities from "../../../utilities.js";
import TokenLogo from "./TokenLogo";
import Loader from "../Misc/Loader";

const WalletApprovals: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const fetchWalletDetails = useFetchWalletDetails(walletAddress);
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch approvals logic here
  }, [walletAddress]);

  return (
    <>
      <NavBar />
      <div>
        {loading && <Loader />}
        {!loading && globalDataCache.approvals && (
          <ul>
            {globalDataCache.approvals.map((token) => (
              <li key={token.id}>
                <TokenLogo tokenImage={token.logo} tokenName={token.name} />
                <div>{token.block_timestamp}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WalletApprovals;
