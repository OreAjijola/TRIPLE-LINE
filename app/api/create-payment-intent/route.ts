import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { paymentIntentSchema } from "@/lib/validations";
import { products } from "@/lib/products";

// Simple in-memory rate limiter (per IP, 10 requests/hour)
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const SHIPPING_RATES = {
  standard: 599,
  express: 1499,
};

export async function POST(req: NextRequest) {
  // Content-Type check
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
  }

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = paymentIntentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const { items, shippingMethod } = parsed.data;

  // Server-side price calculation — client prices are ignored
  let amount = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
    }
    amount += product.price * item.quantity;
  }
  amount += SHIPPING_RATES[shippingMethod];

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        shippingMethod,
        itemCount: items.reduce((s, i) => s + i.quantity, 0).toString(),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
