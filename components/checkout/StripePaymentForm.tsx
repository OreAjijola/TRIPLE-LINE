"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/Button";

interface StripePaymentFormProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function StripePaymentForm({ isSubmitting, onSubmit }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  return (
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
      <Button
        type="button"
        fullWidth
        size="lg"
        onClick={onSubmit}
        disabled={!stripe || !elements || isSubmitting}
      >
        {isSubmitting ? "Processing…" : "Place Order"}
      </Button>
    </div>
  );
}
