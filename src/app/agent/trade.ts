import {
    SwapAdvancedSettings,
    TradeParameters,
    TradingSdk,
    SupportedChainId,
    OrderKind,
    SigningScheme,
  } from "@cowprotocol/cow-sdk";
  import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
  import { parseUnits } from "viem";
  
  // Token addresses for Sepolia testnet
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Sepolia USDC
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Sepolia WETH

  
  export async function tradeUsdcToWeth(
    agentkit: CdpAgentkit,
    amountUsdc: string
  ) {
    try {
      console.log("Initiating USDC to WETH trade...");

      const traderParams = {
        chainId: SupportedChainId.SEPOLIA,
        signer: await agentkit.getSigner(),
        appCode: "defai-hackathon",
      };

      const cowSdk = new TradingSdk(traderParams, { logs: true });

      // Convert USDC amount to proper decimals (USDC has 6 decimals)
      const sellAmount = parseUnits(amountUsdc, 6);

      const parameters: TradeParameters = {
        kind: OrderKind.SELL,
        sellToken: USDC_ADDRESS,
        sellTokenDecimals: 6,
        buyToken: WETH_ADDRESS,
        buyTokenDecimals: 18,
        amount: sellAmount.toString(),
      };

      const advancedParameters: SwapAdvancedSettings = {
        quoteRequest: {
          signingScheme: SigningScheme.PRESIGN,
        },
      };

      console.log("Posting swap order...");
      const orderId = await cowSdk.postSwapOrder(parameters, advancedParameters);
      console.log(`Order ID: [${orderId}]`);

      const walletAddress = await agentkit.getAddress();
      const preSignTransaction = await cowSdk.getPreSignTransaction({
        orderId,
        account: walletAddress,
      });

      console.log("Executing pre-sign transaction...");
      const txResponse = await agentkit.sendTransaction({
        to: preSignTransaction.to,
        value: preSignTransaction.value,
        data: preSignTransaction.data,
      });

      console.log(`Transaction hash: ${txResponse.hash}`);
      const receipt = await txResponse.wait();
      console.log("Trade completed successfully!");

      return {
        success: true,
        orderId,
        transactionHash: receipt.transactionHash,
      };
    } catch (error) {
      console.error("Error in tradeUsdcToWeth:", error);
      throw error;
    }
  }
  