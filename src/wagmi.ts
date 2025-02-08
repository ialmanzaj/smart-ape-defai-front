"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
    coinbaseWallet,
    metaMaskWallet,
    rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "./config";

export function useWagmiConfig() {
    const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? "";

    return useMemo(() => {
        const connectors = connectorsForWallets(
            [
                {
                    groupName: "Recommended Wallet",
                    wallets: [coinbaseWallet],
                },
                {
                    groupName: "Other Wallets",
                    wallets: [rainbowWallet, metaMaskWallet],
                },
            ],
            {
                appName: "Smart Ape | DeFAI Agent",
                projectId,
            },
        );

        const wagmiConfig = createConfig({
            chains: [base, baseSepolia],
            // turn off injected provider discovery
            multiInjectedProviderDiscovery: false,
            connectors,
            ssr: true,
            transports: {
                [base.id]: http(),
                [baseSepolia.id]: http(),
            },
        });

        return wagmiConfig;
    }, [projectId]);
}
