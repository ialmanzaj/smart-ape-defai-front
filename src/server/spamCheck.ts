import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fetch from "node-fetch";

const API_KEY = process.env.MORALIS_API_KEY;
const baseURL = "https://deep-index.moralis.io/api/v2.2";
const router = express.Router();

router.post(
  "/api/wallet/tokens/spam",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      let address = req.body.walletAddress;
      if (!address) {
        throw new Error("Missing wallet address.");
      }

      let ens;
      const isENSAddress = address.indexOf(".eth") > -1;

      if (isENSAddress) {
        const ens_response = await fetch(`${baseURL}/resolve/ens/${address}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": `${API_KEY}`,
          },
        });
        if (!ens_response.ok) {
          throw new Error("Error fetching address via ENS");
        }

        const domain = await ens_response.json();
        address = domain.address;
        ens = req.body.walletAddress;
      }

      const chain = req.query.chain ? req.query.chain : "eth";

      // Continue with your logic...

      return res.status(200).json({
        /* your response data */
      });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
