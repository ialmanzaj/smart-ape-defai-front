import express, { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import moment from "moment";
import { ethers } from "ethers";
import * as utilities from "./utilities.js";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

const fetchHistory = async (
    address: string,
    chain: string,
    from_date: string,
    to_date?: string,
) => {
    try {
        let foundChain = utilities.chains.find((item) => item.chain === chain);
        let cursor: string | null = null;
        let all_txs: any[] = [];
        let url =
            `${baseURL}/wallets/${address}/history?chain=${chain}&nft_metadata=true&from_date=${from_date}&include_input_data=true`;
        if (to_date) {
            url += `&to_date=${to_date}`;
        }

        do {
            console.log(`About to fetch ${url}&cursor=${cursor}`);
            const response = await fetch(`${url}&cursor=${cursor}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-API-Key": `${API_KEY}`,
                },
            });

            if (!response.ok) {
                console.log(response);
                const message = await response.json();
                console.log(message);
                throw new Error(message.error || message);
            }

            let txs = await response.json();

            const now = moment();
            const today = now.clone().startOf("day");
            const yesterday = today.clone().subtract(1, "days");
            const thisMonthStart = today.clone().startOf("month");
            const thisYearStart = today.clone().startOf("year");

            // Process transactions as needed...

            all_txs.push(...txs.result); // Assuming txs.result contains the transactions
            cursor = txs.cursor;
        } while (cursor != "" && cursor != null);

        return all_txs;
    } catch (error) {
        console.error("Error fetching history:", error);
        throw error;
    }
};

router.get(
    "/api/wallet/history",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const address = req.query.wallet as string;
            const chain = req.query.chain as string;
            const from_date = req.query.from_date as string;
            const to_date = req.query.to_date as string;

            const history = await fetchHistory(
                address,
                chain,
                from_date,
                to_date,
            );
            return res.status(200).json(history);
        } catch (e) {
            next(e);
        }
    },
);

export default router;
