"use client";
import WalletWrapper from "./wallet-wrapper";

export default function SignupButton() {
  return (
    <WalletWrapper
      id="signup"
      className="ockConnectWallet_Container min-w-[90px] shrink bg-slate-200 text-[#030712] hover:bg-slate-300"
      text="Sign up"
    />
  );
}
