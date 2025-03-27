import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fetch from "node-fetch";
import moment from "moment";
import { ethers } from "ethers";
import * as utilities from "./utilities.js";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
  "/api/volume/categories",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const [chainsResult, categoriesResult] = await Promise.all([
        fetch(`${baseURL}/volume/chains`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": `${API_KEY}`,
          },
        }),
        fetch(`${baseURL}/volume/categories`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": `${API_KEY}`,
          },
        }),
      ]);

      if (!chainsResult.ok) {
        const message = await chainsResult.json();
        throw new Error(message.error || message);
      }
      if (!categoriesResult.ok) {
        const message = await categoriesResult.json();
        throw new Error(message.error || message);
      }

      const chains = (await chainsResult.json()).chains;
      const categories = (await categoriesResult.json()).categories;

      // Continue with your logic...

      return res.status(200).json({
        categories: categoriesWithTimeseries,
        chains: chainsWithTimeseries,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
