import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fetch from "node-fetch";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.get(
  "/api/token/:tokenAddress/pnl",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenAddress = req.params.tokenAddress;
      const chain = req.query.chain || "base";

      const pnlPromise = fetch(
        `${baseURL}/erc20/${tokenAddress}/top-gainers?chain=${chain}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": API_KEY,
          },
        },
      );

      const [pnlResponse] = await Promise.all([pnlPromise]);

      if (!pnlResponse.ok) {
        const message = await pnlResponse.json();
        return res.status(500).json(message);
      }

      const pnlSummary = await pnlResponse.json();

      return res.status(200).json({
        summary: pnlSummary.result,
        detail: pnlSummary,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
