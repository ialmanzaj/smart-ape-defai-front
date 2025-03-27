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
  "/api/wallet/defi",
  async function (req: Request, res: Response, next: NextFunction) {
    // Your existing code...
  },
);

export default router;
