import express, { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import moment from "moment";
import * as utilities from "./utilities.js";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
    "/api/chain/:chain/pairs/:address",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            let pairAddress = req.params.address;
            let chain = req.params.chain;

            let getPairStatsURL =
                `${baseURL}/pairs/${pairAddress}/stats?chain=${chain}`;

            if (chain === "solana") {
                getPairStatsURL =
                    `https://solana-gateway.moralis.io/token/mainnet/pairs/${pairAddress}/stats`;
            }

            const pairStatsPromise = fetch(getPairStatsURL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-API-Key": API_KEY,
                },
            });

            const [pairStatsResponse] = await Promise.all([pairStatsPromise]);

            if (!pairStatsResponse.ok) {
                console.log("Get pair stats failed");
                const message = await pairStatsResponse.json();
                console.log(pairStatsResponse.statusText);
                return res.status(500).json(message);
            }

            let pairStats = await pairStatsResponse.json();

            console.log(pairStats);

            let tokenMetadataUrl =
                `${baseURL}/erc20/metadata?addresses=${pairStats.tokenAddress}&chain=${chain}`;

            if (chain === "solana") {
                tokenMetadataUrl =
                    `https://solana-gateway.moralis.io/token/mainnet/${pairStats.tokenAddress}/metadata`;
            }

            console.log(tokenMetadataUrl);

            const metadataPromise = fetch(tokenMetadataUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-API-Key": API_KEY,
                },
            });

            const [metadataResponse] = await Promise.all([metadataPromise]);

            if (!metadataResponse.ok) {
                console.log("Get token metadata failed");
                const message = await metadataResponse.json();
                console.log(metadataResponse.statusText);
                return res.status(500).json(message);
            }

            // Continue with your logic...

            res.json({ pairStats, metadata: await metadataResponse.json() });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                error: "An error occurred during the analysis.",
            });
        }
    },
);

export default router;
