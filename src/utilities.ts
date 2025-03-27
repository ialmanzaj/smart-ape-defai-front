export function returnNFTImage(nft: any, resolution: string): string {
  if (
    nft.media?.media_collection?.high &&
    !String(nft.media.media_collection.high.url).includes("charset=utf-8")
  ) {
    if (resolution === "high") {
      return nft.media.media_collection.high.url;
    }

    return nft.media.media_collection.medium.url;
  } else if (nft.normalized_metadata?.image) {
    return nft.normalized_metadata.image;
  } else {
    return "/images/nft-placeholder.svg";
  }
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatPriceNumber(num: number): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (parts.length === 2) {
    let decimalPart = parts[1];
    const nonZeroMatch = decimalPart.match(/[^0]/);
    if (nonZeroMatch) {
      const firstNonZeroIndex = nonZeroMatch.index;
      let totalLength = Math.min(firstNonZeroIndex + 5, decimalPart.length);
      if (parseInt(parts[0].replace(/,/g, ""), 10) >= 1) {
        totalLength = Math.min(2, decimalPart.length);
      }
      decimalPart = decimalPart.substring(0, totalLength);
      decimalPart = decimalPart.replace(/0+$/, "");
    }
    return decimalPart ? `${parts[0]}.${decimalPart}` : parts[0];
  }

  return parts[0];
}

export function formatAsUSD(number: number): string {
  if (number > 0 && number < 0.00000001) {
    return "<$0.01";
  }

  if (number > 0.01) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  }).format(number);
}

export const abbreviateNumber = (num: number): string => {
  if (num < 1000) {
    return Number(num.toString()).toFixed(0);
  }
  // Logic for larger numbers can be added here
  return num.toString();
};

// Additional utility functions can be added here
