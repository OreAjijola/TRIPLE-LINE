import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");

  if (!reference || typeof reference !== "string" || reference.length === 0) {
    return NextResponse.json({ error: "Missing or invalid reference" }, { status: 400 });
  }

  // Sanitize: Paystack references are alphanumeric with underscores/dashes only
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(reference)) {
    return NextResponse.json({ error: "Invalid reference format" }, { status: 400 });
  }

  try {
    const transaction = await verifyTransaction(reference);

    if (transaction.status !== "success") {
      return NextResponse.json(
        { error: `Payment not successful. Status: ${transaction.status}` },
        { status: 402 }
      );
    }

    return NextResponse.json({
      status: "success",
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
      paidAt: transaction.paid_at,
    });
  } catch (err) {
    console.error("Paystack verify error:", err);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
