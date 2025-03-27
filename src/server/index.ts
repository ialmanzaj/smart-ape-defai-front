import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import approvalsRouter from "./approvals.js";
import entitiesRouter from "./entities.js";
import pairsRouter from "./pairs.js";
import spamCheckRouter from "./spamCheck.js";
import volumeRouter from "./volume.js";
import historyRouter from "./history.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(approvalsRouter);
app.use(entitiesRouter);
app.use(pairsRouter);
app.use(spamCheckRouter);
app.use(volumeRouter);
app.use(historyRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
