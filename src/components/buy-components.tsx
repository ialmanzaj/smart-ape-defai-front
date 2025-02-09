"use client";

import {
  Checkout,
  CheckoutButton,
  CheckoutStatus,
} from "@coinbase/onchainkit/checkout";
import { Buy } from "@coinbase/onchainkit/buy";
import type { Token } from "@coinbase/onchainkit/token";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "~/config";
import { useAccount } from "wagmi";

export default function BuyComponents() {
  const { address } = useAccount();
  const degenToken: Token = {
    name: "DEGEN",
    address: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    symbol: "DEGEN",
    decimals: 18,
    image:
      "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm",
    chainId: 8453,
  };

  // If we're in development and don't have a project ID, or no wallet is connected, show a placeholder
  if (
    process.env.NODE_ENV === "development" &&
    (!NEXT_PUBLIC_WC_PROJECT_ID || !address)
  ) {
    return (
      <section className="flex w-full flex-col items-center gap-6 px-4">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Buy Components</h2>
          <p className="text-center text-gray-600 dark:text-gray-300">
            {!NEXT_PUBLIC_WC_PROJECT_ID
              ? "Purchase and manage your DeFi components (Requires Project ID)"
              : "Please connect your wallet to access buy components"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center gap-6 px-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Buy Components</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Purchase and manage your DeFi components
        </p>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4">
        {address && (
          <>
            <Checkout productId="my-product-id">
              <CheckoutButton coinbaseBranded />
              <CheckoutStatus />
            </Checkout>
            <Buy toToken={degenToken} />
          </>
        )}
      </div>
    </section>
  );
}
