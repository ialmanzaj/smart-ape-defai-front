"use client";

import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import {
  Checkout,
  CheckoutButton,
  CheckoutStatus,
} from "@coinbase/onchainkit/checkout";
import Logo from "~/components/logo";
import ProfileSection from "~/components/profile-section";
import BuyComponents from "~/components/buy-components";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-6">
        <Logo variant="icon" />
        <WalletDefault />
        <Button>I'm a shad button!</Button>
        <Checkout productId="my-product-id">
          <CheckoutButton coinbaseBranded />
          <CheckoutStatus />
        </Checkout>
        <ProfileSection />
        <BuyComponents />
      </div>
    </main>
  );
}
