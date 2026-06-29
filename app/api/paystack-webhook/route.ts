import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface PaystackEvent {
  event: string;
  data: {
    reference: string;
    status: string;
    amount: number;
    currency: string;
    customer: { email: string };
    metadata?: Record<string, unknown>;
  };
}

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash === signature;
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-paystack-signature");
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: PaystackEvent;
  try {
    event = JSON.parse(rawBody) as PaystackEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (event.event) {
    case "charge.success": {
      const { reference, amount, currency, customer } = event.data;
      console.log(`Payment succeeded: ${reference} — ${currency} ${amount / 100} from ${customer.email}`);
      // TODO: mark order as paid, send confirmation email
      break;
    }
    default:
      // Ignore other events
      break;
  }

  return NextResponse.json({ received: true });
}
