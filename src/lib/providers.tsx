"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";
import { useWagmiConfig } from "~/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "~/contexts/chat-context";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "~/config";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const wagmiConfig = useWagmiConfig();
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID;

  // If we're in development and don't have a project ID, render without OnchainKit
  if (process.env.NODE_ENV === "development" && !projectId) {
    return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ChatProvider>{children}</ChatProvider>
          </NextThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <OnchainKitProvider
            defaultChain={base}
            projectId={projectId}
            defaultCollectible={{
              name: "Smart Ape",
              description: "DeFAI Agent",
              image: "/ape.png",
            }}
          >
            <ChatProvider>{children}</ChatProvider>
          </OnchainKitProvider>
        </NextThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
