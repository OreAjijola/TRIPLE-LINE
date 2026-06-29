import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);
      // TODO: fulfil order, send confirmation email
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error("Payment failed:", paymentIntent.id, paymentIntent.last_payment_error?.message);
      break;
    }
    default:
      // Ignore unhandled events
      break;
  }

  return NextResponse.json({ received: true });
}
