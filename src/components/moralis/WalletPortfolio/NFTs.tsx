import React, { useState, useEffect } from "react";
import { useData } from "../../../DataContext";
import { useParams } from "react-router-dom";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";
import NavBar from "../Misc/NavBar";
import Skeleton from "../Misc/Skeleton";
import Loader from "../Misc/Loader";
import NFT from "./NFT";

const NFTs: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const fetchWalletDetails = useFetchWalletDetails(walletAddress);
  const { globalDataCache } = useData();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch NFTs logic here
  }, [walletAddress]);

  return (
    <>
      <NavBar />
      <div>
        {loading && <Loader />}
        {!loading && globalDataCache.nfts && (
          <div>
            <h2>NFTs</h2>
            {globalDataCache.nfts.map((nft) => (
              <NFT key={nft.token_id} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NFTs;
