import { FundButton } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/button";

export default function FundComponent() {
  const { address } = useAccount();

  if (!address) {
    return (
      <Button className="min-w-[90px] opacity-50" disabled>
        Fund
      </Button>
    );
  }

  return (
    <FundButton
      className="text-md text-semibold min-w-[90px] bg-slate-200 font-sans hover:bg-purple-500 hover:text-white dark:bg-slate-800"
      text="Fund"
      hideText={false}
      hideIcon={true}
    />
  );
}
