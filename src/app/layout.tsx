import "@coinbase/onchainkit/styles.css";
import "~/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "~/lib/providers";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { PromptBar } from "~/components/prompt-bar";
import { cn } from "~/lib/utils";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Smart Ape | DeFAI Agent",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/ape.png" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", GeistSans.className)}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col pt-[72px]">{children}</div>
            <PromptBar className="fixed right-0 bottom-[48px] left-0" />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
