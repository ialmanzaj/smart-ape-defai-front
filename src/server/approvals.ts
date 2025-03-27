import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fetch from "node-fetch";
import * as utilities from "./utilities.js";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
  "/api/wallet/approvals",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const address = req.query.wallet as string;
      const queryString = utilities.chains
        .map((chain) => `chains=${chain.chain}`)
        .join("&");

      const chainsResponse = await fetch(
        `${baseURL}/wallets/${address}/chains?${queryString}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": API_KEY,
          },
        },
      );

      if (!chainsResponse.ok) {
        const message = await chainsResponse.json();
        throw new Error(message.error || message);
      }

      const chainsData = await chainsResponse.json();
      // Continue with your logic...

      return res.status(200).json(chainsData);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
