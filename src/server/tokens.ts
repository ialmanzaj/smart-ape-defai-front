import express, { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import moment from "moment";
import * as utilities from "./utilities.js";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get("/api/pumpfun", async (req: Request, res: Response) => {
    try {
        const urls: string[] = [
            "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/new",
            "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/bonding",
            "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/graduated",
        ];

        const fetchPromises = urls.map((url) =>
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-API-Key": `${API_KEY}`,
                },
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
        );

        const [newData, bondingData, graduatedData] = await Promise.all(
            fetchPromises,
        );

        const responseData = {
            new: newData.result,
            bonding: bondingData.result,
            graduated: graduatedData.result,
        };

        res.json(responseData);
    } catch (error) {
        console.error("Error fetching pumpfun data:", error);
        res.status(500).json({
            error: "Failed to fetch pumpfun data",
            message: error.message,
        });
    }
});

// Other routes...

export default router;
