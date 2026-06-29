"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import { Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paystackReady, setPaystackReady] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-5">
        <ShoppingBag size={48} className="text-[#E8E8E4]" />
        <p className="font-semibold text-[#1A1A1A]">Your cart is empty</p>
        <p className="text-sm text-[#6B6B6B]">Add some items before checking out.</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  async function handlePayWithPaystack(data: CheckoutFormData) {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!paystackReady || typeof window === "undefined" || !window.PaystackPop) {
      setError("Payment system is still loading. Please try again in a moment.");
      return;
    }
    if (!publicKey) {
      setError("Payment is not configured. Please contact support.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1 — Initialize the transaction on the server.
      // The server independently calculates the total; client prices are ignored.
      const initRes = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          items: items.map((i) => ({ id: i.id, size: i.size, color: i.color, quantity: i.quantity })),
          shippingMethod,
        }),
      });

      if (!initRes.ok) {
        const body = await initRes.json() as { error?: string };
        setError(body.error ?? "Payment initialization failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const { access_code, reference } = await initRes.json() as {
        access_code: string;
        reference: string;
      };

      // Step 2 — Open the Paystack inline popup using the access_code.
      const handler = window.PaystackPop.setup({
        key: publicKey,
        access_code,
        ref: reference,
        callback: async (response) => {
          // Step 3 — Verify the payment server-side before confirming.
          try {
            const verifyRes = await fetch(
              `/api/verify-payment?reference=${encodeURIComponent(response.reference)}`
            );
            if (verifyRes.ok) {
              clearCart();
              router.push(`/order-confirmation/${encodeURIComponent(response.reference)}`);
            } else {
              const body = await verifyRes.json() as { error?: string };
              setError(
                body.error ??
                  `Payment could not be verified. Please contact support with reference: ${response.reference}`
              );
              setIsSubmitting(false);
            }
          } catch {
            setError(
              `Payment verification failed. Please contact support with reference: ${response.reference}`
            );
            setIsSubmitting(false);
          }
        },
        onClose: () => {
          setIsSubmitting(false);
        },
      });

      handler.openIframe();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Load Paystack inline JS */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => setPaystackReady(true)}
      />

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Secure Checkout</p>
          <h1 className="font-serif text-4xl font-semibold text-[#1A1A1A]">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
          {/* Left — wrap in a single form so handleSubmit validates all fields */}
          <form onSubmit={handleSubmit(handlePayWithPaystack)} noValidate>
            <CheckoutForm
              register={register}
              errors={errors}
              shippingMethod={shippingMethod}
              onShippingChange={setShippingMethod}
            />

            {/* Payment section */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
                Payment
              </h2>

              <div className="flex items-start gap-3 border border-[#E8E8E4] p-5 mb-5 bg-[#FAFAF8]">
                <Lock size={16} className="text-[#6B6B6B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  You will complete payment securely through Paystack. Your card details are handled
                  entirely by Paystack and never pass through our servers.
                </p>
              </div>

              {error && (
                <p className="text-sm text-[#C0392B] mb-4" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={isSubmitting || !paystackReady}
              >
                {isSubmitting
                  ? "Processing…"
                  : !paystackReady
                  ? "Loading Payment…"
                  : "Pay with Paystack"}
              </Button>

              <p className="text-xs text-center text-[#6B6B6B] mt-3">
                Secured by{" "}
                <span className="font-semibold text-[#1A1A1A]">Paystack</span>
              </p>
            </div>
          </form>

          {/* Right — sticky order summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <OrderSummary items={items} shippingMethod={shippingMethod} />
          </div>
        </div>
      </div>
    </>
  );
}
