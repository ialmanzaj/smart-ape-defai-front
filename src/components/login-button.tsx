"use client";
import WalletWrapper from "./wallet-wrapper";

export default function LoginButton() {
  return (
    <WalletWrapper
      id="login"
      className="min-w-[90px]"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
