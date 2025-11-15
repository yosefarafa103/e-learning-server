import express from "express";
import { createNewSubscription } from "../controller/payments.controller.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { priceId, userId, plan } = req.body;
  if (!priceId || !userId || !plan)
    return res.status(400).json({ err: "please provide required properties" });
  const subscription = await createNewSubscription(priceId);
  return res.status(201).json(subscription);
});

export default router;
