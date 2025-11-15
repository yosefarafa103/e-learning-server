import Stripe from "stripe";
export const createNewSubscription = async (priceId, userId, plan) => {
  try {
    const subscription = await new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2025-10-29.clover",
    }).checkout.sessions.create({
      success_url: "https://taskify-five-psi.vercel.app/pricing",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      mode: "subscription",
      metadata: {
        plan,
      },
    });
    // https://taskify-five-psi.vercel.app
    return subscription;
  } catch (error) {
    console.log(error);

    throw new Error(error.messge);
  }
};
