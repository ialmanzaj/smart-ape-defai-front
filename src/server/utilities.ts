import moment from "moment";
import fetch from "node-fetch";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const networkData = [
    {
        name: "Ethereum",
        id: "eth",
        wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
        name: "Polygon",
        id: "polygon",
        wrappedTokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    {
        name: "Binance",
        id: "bsc",
        wrappedTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    {
        name: "Avalanche",
        id: "avalanche",
        wrappedTokenAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    },
    {
        name: "Fantom",
        id: "fantom",
        wrappedTokenAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    },
    {
        name: "Cronos",
        id: "cronos",
        wrappedTokenAddress: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    },
    {
        name: "Optimism",
        id: "optimism",
        wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
        name: "Gnosis",
        id: "gnosis",
        wrappedTokenAddress: "0x9c58bacc331c9aa871afd802db6379a98e80cedb",
    },
];

// Add any additional functions or exports as needed...
