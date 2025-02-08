import { tradeUsdcToWeth } from "./trade";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";

const trade = async (content: string, agentkit: CdpAgentkit) => {
  // Extract amount from content using regex
  const amountMatch = content.match(/(\d+(\.\d+)?)\s*USDC/i);
  if (!amountMatch || !amountMatch[1]) {
    throw new Error("No valid USDC amount found in content");
  }

  const amount = amountMatch[1];
  console.log(`Trading ${amount} USDC for WETH`);
  
  try {
    const result = await tradeUsdcToWeth(agentkit, amount);
    console.log("Trade executed successfully:", result);
    return result;
  } catch (error) {
    console.error("Trade failed:", error);
    throw error;
  }
};

export function handleAgentAction(agentAction: string, content: string, agentkit: CdpAgentkit): void {
  /**
   * Handles agent actions for deployed tokens and NFTs
   * @param agentAction - The action being performed (DEPLOY_TOKEN or DEPLOY_NFT)
   * @param content - The content containing the contract address
   */
  const addressRegex = /0x[a-fA-F0-9]{40}/;
  const addressMatch = content.match(addressRegex);

  if (!addressMatch) {
    throw new Error("No valid contract address found in content");
  }

  const address = addressMatch[0];

  switch (agentAction) {
    case "TRADE":
      trade(content, agentkit);
      break;
    default:
      console.warn(`Unknown agent action: ${agentAction}`);
  }
}
