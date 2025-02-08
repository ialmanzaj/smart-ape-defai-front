import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs";
import dotenv from "dotenv";
import { AGENT_MODEL } from "./constants";

// Configure a file to persist the agent's CDP MPC Wallet Data
const WALLET_DATA_FILE = "wallet_data.txt";

dotenv.config();

/**
 * Initialize the agent with CDP Agentkit
 *
 * @returns Agent executor and config
 */
async function initializeAgent() {
  try {
    // Initialize LLM with xAI configuration
    const llm = new ChatOpenAI({
      model: AGENT_MODEL,
      apiKey: process.env.OPENAI_API_KEY,
    });

    let walletDataStr: string | null = null;

    // Read existing wallet data if available
    if (fs.existsSync(WALLET_DATA_FILE)) {
      try {
        walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
      } catch (error) {
        console.error("Error reading wallet data:", error);
        // Continue without wallet data
      }
    }

    // Configure CDP Agentkit
    const config = {
      cdpWalletData: walletDataStr || undefined,
      networkId: process.env.NETWORK_ID || "sepolia",
    };

    // Initialize CDP agentkit
    const agentkit = await CdpAgentkit.configureWithWallet(config);

    // Initialize CDP Agentkit Toolkit and get tools
    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    // Store buffered conversation history in memory
    const memory = new MemorySaver();
    const agentConfig = {
      configurable: { thread_id: "CDP Agentkit Trading Bot" },
    };

    // Create React Agent using the LLM and CDP Agentkit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier:
        "You are a helpful trading agent that can interact with the blockchain using the Coinbase Developer Platform Agentkit. " +
        "You can trade USDC for WETH using Cowswap on the Sepolia network. " +
        "When asked to trade, you should extract the USDC amount from the user's message and execute the trade using the TRADE_USDC_WETH action. " +
        "Always verify that there are sufficient funds before executing trades. " +
        "If you ever need funds, you can request them from the faucet if you are on network ID `sepolia`. " +
        "If not, you can provide your wallet details and request funds from the user. " +
        "If someone asks you to do something you can't do with your currently available tools, you must say so, " +
        "and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more information. " +
        "Be concise and helpful with your responses.",
    });

    // Save wallet data
    const exportedWallet = await agentkit.exportWallet();
    fs.writeFileSync(WALLET_DATA_FILE, exportedWallet);

    return { agent, config: agentConfig, agentkit };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

export { initializeAgent };
