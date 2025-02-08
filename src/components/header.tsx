"use client";

import { useAccount } from "wagmi";
import FundComponent from "src/components/fund-component";
import LoginButton from "../components/login-button";
import SignupButton from "../components/signup-button";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Logo from "./logo";

export default function Header() {
  const { address } = useAccount();
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full max-w-[1200px] flex-col overflow-visible px-4">
      <section className="flex h-[72px] w-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <SignupButton key="signup" />
          <LoginButton key="login" />
          <FundComponent key="fund" />
          <button
            key="info"
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 transition-colors hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onClick={() => router.push("/about")}
          >
            <Info
              size={20}
              className="text-foreground transition-colors hover:text-purple-100"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
