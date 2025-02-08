"use client";

import { WalletDefault } from "@coinbase/onchainkit/wallet";
import Logo from "~/components/logo";
import ProfileSection from "~/components/profile-section";
import BuyComponents from "~/components/buy-components";

export default function HomePage() {
  return (
    <div className="flex h-[calc(100vh-72px)] pt-[72px]">
      {/* Left Panel */}
      <div className="border-border bg-background w-[320px] border-r">
        {/* Left panel content */}
      </div>

      {/* Main Content */}
      <main className="bg-background text-foreground flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex w-full max-w-7xl flex-col items-center gap-8 px-4">
          <div className="flex flex-col items-center gap-4">
            <Logo variant="icon" />
            <WalletDefault />
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
            <ProfileSection />
            <BuyComponents />
          </div>
        </div>
      </main>
    </div>
  );
}
