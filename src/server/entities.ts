import express, { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
    "/api/entities",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query.query as string;
            if (!query) {
                return res.status(400).json({
                    message: "Please provide a search query.",
                });
            }

            const response = await fetch(
                `${baseURL}/entities/search?query=${query}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "X-API-Key": API_KEY,
                    },
                },
            );

            if (!response.ok) {
                const message = await response.json();
                throw new Error(message.error || message);
            }

            const results = await response.json();
            return res.status(200).json(results);
        } catch (e) {
            next(e);
        }
    },
);

export default router;
