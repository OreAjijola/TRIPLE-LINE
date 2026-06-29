"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import type { CheckoutFormData } from "@/lib/validations";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function CheckoutInner() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-5">
        <ShoppingBag size={48} className="text-[#E8E8E4]" />
        <p className="font-semibold text-[#1A1A1A]">Your cart is empty</p>
        <p className="text-sm text-[#6B6B6B]">Add some items to your cart before checking out.</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  async function handlePlaceOrder() {
    if (!formData) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create payment intent (server recalculates the price)
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, size: i.size, color: i.color, quantity: i.quantity })),
          shippingMethod,
        }),
      });

      if (!res.ok) {
        const data: unknown = await res.json();
        const msg = typeof data === "object" && data !== null && "error" in data
          ? (data as { error: string }).error
          : "Payment failed";
        setError(msg);
        return;
      }

      const { clientSecret } = await res.json() as { clientSecret: string };

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) { setError("Card element not found"); return; }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: formData.fullName, email: formData.email },
        },
      });

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        clearCart();
        router.push(`/order-confirmation/${paymentIntent.id}`);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Secure Checkout</p>
        <h1 className="font-serif text-4xl font-semibold text-[#1A1A1A]">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
        {/* Left: forms */}
        <div>
          <CheckoutForm
            onSubmit={setFormData}
            isSubmitting={isSubmitting}
            shippingMethod={shippingMethod}
            onShippingChange={setShippingMethod}
          />

          {/* Payment */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
              Payment
            </h2>
            <div className="border border-[#E8E8E4] p-4 mb-4 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      color: "#1A1A1A",
                      fontFamily: "Inter, sans-serif",
                      "::placeholder": { color: "#9B9B9B" },
                    },
                    invalid: { color: "#C0392B" },
                  },
                }}
              />
            </div>
            <p className="text-xs text-[#6B6B6B] mb-4">
              Card data is handled securely by Stripe. Your card details never touch our server.
            </p>
            <p className="text-xs text-[#6B6B6B] mb-4 italic">
              Test card: 4242 4242 4242 4242 · Exp: 12/34 · CVC: 123
            </p>
            {error && (
              <p className="text-sm text-[#C0392B] mb-4" role="alert">{error}</p>
            )}
            <Button
              fullWidth
              size="lg"
              onClick={handlePlaceOrder}
              disabled={!stripe || !elements || isSubmitting}
            >
              {isSubmitting ? "Processing…" : "Place Order"}
            </Button>
          </div>
        </div>

        {/* Right: order summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <OrderSummary items={items} shippingMethod={shippingMethod} />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  if (!stripePromise) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#6B6B6B] text-sm">Payment system is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutInner />
    </Elements>
  );
}
