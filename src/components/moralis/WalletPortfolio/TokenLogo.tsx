import React, { useState, useEffect } from "react";

interface TokenLogoProps {
  tokenImage: string;
  tokenName: string;
  tokenSymbol: string;
}

const TokenLogo: React.FC<TokenLogoProps> = ({
  tokenImage,
  tokenName,
  tokenSymbol,
}) => {
  const [validImage, setValidImage] = useState<boolean>(false);

  useEffect(() => {
    checkImageExists(tokenImage, (exists) => {
      setValidImage(exists);
    });
  }, [tokenImage]);

  const checkImageExists = (
    url: string,
    callback: (exists: boolean) => void,
  ) => {
    const img = new Image();
    img.src = url;
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };

  return (
    <div>
      {validImage && tokenImage ? (
        <img src={tokenImage} alt={tokenName} />
      ) : (
        <div className="default-logo">{tokenSymbol}</div>
      )}
    </div>
  );
};

export default TokenLogo;
