import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { ThemeToggle } from "~/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
      <ThemeToggle />
      <div className="bg-card text-card-foreground rounded-lg p-8 shadow">
        <h1 className="mb-4 text-4xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground">
          Toggle the theme using the button in the top right.
        </p>
      </div>
      <WalletDefault />
    </main>
  );
}
