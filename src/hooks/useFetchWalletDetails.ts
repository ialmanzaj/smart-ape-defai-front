import { useContext } from "react";
import { DataContext, useData } from "../DataContext"; // Assuming this exports a React context

interface WalletDetails {
  address: string;
  balance: number;
  active_chains: string[];
  nativeNetworth: number;
  networth: number;
  networthDataLabels: string[];
  networthDatasets: number[];
  walletAge: number;
  firstSeenDate: string;
  lastSeenDate: string;
  isWhale: boolean;
  earlyAdopter: boolean;
  multiChainer: boolean;
  speculator: boolean;
  isFresh: boolean;
  ens: string;
  unstoppable: string;
}

const useFetchWalletDetails = (walletAddress: string) => {
  const { globalDataCache, setGlobalDataCache } = useData();

  const fetchWalletDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wallet?chain=${
          globalDataCache.selectedChain ? globalDataCache.selectedChain : "eth"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress }),
        },
      );

      if (response.ok) {
        const data: WalletDetails = await response.json();

        setGlobalDataCache({
          selectedChain: localStorage.getItem("selectedChain") || "eth",
          walletAddress: data.address,
          balance: data.balance ? data.balance : 0,
          chains: data.active_chains,
          nativeNetworth: data.nativeNetworth,
          networth: data.networth,
          networthArray: {
            labels: data.networthDataLabels,
            data: data.networthDatasets,
          },
          profile: {
            walletAge: data.walletAge,
            firstSeenDate: data.firstSeenDate,
            lastSeenDate: data.lastSeenDate,
            isWhale: data.isWhale,
            earlyAdopter: data.earlyAdopter,
            multiChainer: data.multiChainer,
            speculator: data.speculator,
            isFresh: data.isFresh,
            ens: data.ens,
            unstoppable: data.unstoppable,
          },
          days: "7",
        });

        return data;
      } else {
        console.log("Error from fetchWalletDetails");
      }
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      // Handle errors as appropriate for your application
    }
  };

  return fetchWalletDetails;
};

export default useFetchWalletDetails;
