import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import {
  SwapAdvancedSettings,
  TradeParameters,
  TradingSdk,
  SupportedChainId,
  OrderKind,
  SigningScheme,
  OrderQuoteRequest,
} from "@cowprotocol/cow-sdk";
import { Tool } from "@langchain/core/tools";
import { BigNumber, providers, Signer } from "ethers";
import { parseUnits } from "viem";

// Token addresses for Sepolia testnet
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Sepolia USDC
const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Sepolia WETH

export async function tradeUsdcToWeth(
  agentkit: CdpAgentkit,
  amountUsdc: string,
) {
  try {
    console.log("Initiating USDC to WETH trade...");

    const signer = await agentkit.getSigner();
    const walletAddress = await agentkit.getAddress();

    const traderParams = {
      chainId: SupportedChainId.SEPOLIA,
      signer,
      appCode: "defai-hackathon",
    };

    const cowSdk = new TradingSdk(traderParams);

    // Convert USDC amount to proper decimals (USDC has 6 decimals)
    const sellAmount = parseUnits(amountUsdc, 6).toString();

    const parameters: TradeParameters = {
      kind: OrderKind.SELL,
      sellToken: USDC_ADDRESS,
      sellTokenDecimals: 6,
      buyToken: WETH_ADDRESS,
      buyTokenDecimals: 18,
      amount: sellAmount,
      from: walletAddress,
    };

    // Check token approval
    console.log("Checking USDC approval...");
    const spender = cowSdk.getConfig().settlementContract;
    const needsApproval = await cowSdk.needsAllowance({
      token: USDC_ADDRESS,
      amount: sellAmount,
    });

    if (needsApproval) {
      console.log("Approving USDC...");
      const approveTx = await cowSdk.approveToken(
        USDC_ADDRESS,
        spender,
        sellAmount,
      );
      await approveTx.wait();
      console.log("USDC approved successfully");
    }

    console.log("Getting quote...");
    const quote = await cowSdk.getQuote(parameters);
    console.log("Quote received:", quote);

    const advancedParameters: SwapAdvancedSettings = {
      signingScheme: SigningScheme.PRESIGN,
      quoteId: quote.id,
    };

    console.log("Posting swap order...");
    const orderId = await cowSdk.postSwapOrder(parameters, advancedParameters);
    console.log(`Order ID: [${orderId}]`);

    const preSignTransaction = await cowSdk.getPreSignTransaction({
      orderId,
      account: walletAddress,
    });

    console.log("Executing pre-sign transaction...");
    const txResponse = await signer.sendTransaction({
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
      quote: {
        sellAmount: quote.quote.sellAmount,
        buyAmount: quote.quote.buyAmount,
        feeAmount: quote.quote.feeAmount,
      },
    };
  } catch (error) {
    console.error("Error in tradeUsdcToWeth:", error);
    throw error;
  }
}
