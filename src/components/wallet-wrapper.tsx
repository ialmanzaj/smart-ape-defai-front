"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";

type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
  id: string;
};

export default function WalletWrapper({
  className,
  text,
  id,
}: WalletWrapperParams) {
  return (
    <Wallet className="z-50">
      <ConnectWallet text={text} className={className}>
        {[
          <Avatar key={`${id}-avatar`} className="h-6 w-6" />,
          <Name key={`${id}-name`} />,
        ]}
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
          {[
            <Avatar key={`${id}-dropdown-avatar`} />,
            <Name key={`${id}-dropdown-name`} />,
            <Address key={`${id}-address`} />,
            <EthBalance key={`${id}-balance`} />,
          ]}
        </Identity>
        <WalletDropdownLink
          icon="wallet"
          target="_blank"
          href="https://wallet.coinbase.com"
        >
          Wallet
        </WalletDropdownLink>
        <WalletDropdownFundLink text="Fund" />
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
