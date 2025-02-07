import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
      <ThemeToggle />
      <WalletDefault />
      <Button>I'm a shad button!</Button>
    </main>
  );
}
