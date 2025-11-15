import express from "express";
import bodyParser from "body-parser";
import Stripe from "stripe";
import axios from "axios";

const router = express.Router();
router.post(
  "/new-subscription",
  bodyParser.raw({ type: "application/json" }),
  async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2025-10-29.clover",
    });
    const signature = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const stripeSubscriptionId = session.subscription;
      const userId = session.client_reference_id;
      const planId = session.metadata?.plan;

      await axios.post(
        `https://taskify-five-psi.vercel.app/api/subscriptions`,
        {
          userId,
          plan: planId,
          stripeSubscriptionId: stripeSubscriptionId,
        }
      );
    }
    
    res.status(200).json({ received: true });
  }
);

export default router;
