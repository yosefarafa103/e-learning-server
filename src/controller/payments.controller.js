// v1/subscriptions

import Stripe from "stripe";

export const createNewSubscription = async (priceId) => {
  try {
    const subscription = await new Stripe(
      process.env.STRIPE_SECRET
    ).checkout.sessions.create({
      success_url: "https://example.com/success",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
    });
    return subscription;
  } catch (error) {
    console.log(error);

    throw new Error(error.messge);
  }
};
