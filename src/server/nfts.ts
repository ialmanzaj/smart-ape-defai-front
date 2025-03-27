import express, { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import moment from "moment";
import { ethers } from "ethers";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
    "/api/wallet/nfts",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const address = req.query.wallet as string;
            const chain = req.query.chain ? (req.query.chain as string) : "eth";
            let nfts: any[] = [];
            let cursor: string | null = null;
            let page = 0;

            do {
                let chainURL =
                    `${baseURL}/${address}/nft?chain=${chain}&exclude_spam=true&normalizeMetadata=true&media_items=true&include_prices=true&cursor=${cursor}`;
                if (chain !== "eth") {
                    chainURL =
                        `${baseURL}/${address}/nft?chain=${chain}&exclude_spam=true&normalizeMetadata=true&media_items=true&cursor=${cursor}`;
                }
                const response = await fetch(chainURL, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "X-API-Key": `${API_KEY}`,
                    },
                });

                if (!response.ok) {
                    console.log(response.statusText);
                    const message = await response.json();
                }

                const data = await response.json();

                console.log(`Got page ${data.page}`);
                if (data.result && data.result.length > 0) {
                    for (const nft of data.result) {
                        nfts.push(nft);
                    }
                }

                cursor = data.cursor;
                page = data.page;
                if (page > 5) {
                    break;
                }
            } while (cursor != "" && cursor != null);

            return res.status(200).json(nfts);
        } catch (e) {
            next(e);
        }
    },
);

// Other routes...

export default router;
