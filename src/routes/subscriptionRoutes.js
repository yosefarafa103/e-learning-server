import express from "express";
import { createNewSubscription } from "../controller/payments.controller.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { customer, priceId } = req.body;
  if (!priceId)
    return res
      .status(400)
      .json({ err: "please provide customer and price id" });
  const subscription = await createNewSubscription(priceId);
  return res.status(201).json(subscription);
});

export default router;
