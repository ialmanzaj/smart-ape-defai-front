import React from "react";
import * as utilities from "../../../utilities.js";

interface NFTProps {
  nft: {
    name: string;
    token_id: string;
    contract_type: string;
    verified_collection?: boolean;
    minter_address: string;
    owner_of: string;
  };
}

const NFT: React.FC<NFTProps> = ({ nft }) => {
  return (
    <div className="nft">
      <div
        className="nft-preview"
        style={{
          backgroundImage: `url(${utilities.returnNFTImage(nft, "low")})`,
        }}
      ></div>
      <div className="nft-content">
        <div className="title">
          {nft.name} #{nft.token_id}
        </div>
        <div className="contract">{nft.contract_type}</div>
        {nft.verified_collection && (
          <div className="verified">Verified Collection</div>
        )}
        {nft.minter_address === nft.owner_of && <div>Minted</div>}
      </div>
    </div>
  );
};

export default NFT;
