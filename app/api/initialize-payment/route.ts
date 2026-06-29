import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction } from "@/lib/paystack";
import { initializePaymentSchema } from "@/lib/validations";
import { products } from "@/lib/products";

// Shipping rates in Naira
const SHIPPING_RATES: Record<string, number> = {
  standard: 1500,
  express: 3500,
};

// In-memory rate limiter: 10 checkout attempts per IP per hour
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

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = initializePaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  const { email, items, shippingMethod } = parsed.data;

  // Server-side price calculation — never trust client prices
  let subtotalNaira = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
    }
    subtotalNaira += product.price * item.quantity;
  }

  const shippingNaira = SHIPPING_RATES[shippingMethod] ?? SHIPPING_RATES.standard;
  const totalNaira = subtotalNaira + shippingNaira;
  const amountKobo = totalNaira * 100; // Paystack uses smallest currency unit

  try {
    const transaction = await initializeTransaction({
      email,
      amount: amountKobo,
      currency: "NGN",
      metadata: {
        shippingMethod,
        itemCount: items.reduce((s, i) => s + i.quantity, 0),
      },
    });

    return NextResponse.json({
      access_code: transaction.access_code,
      reference: transaction.reference,
    });
  } catch (err) {
    console.error("Paystack initialize error:", err);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
