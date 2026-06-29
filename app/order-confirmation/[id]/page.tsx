import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed — Tripline",
};

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const orderId = params.id;
  const shortId = orderId.startsWith("pi_") ? orderId.slice(3, 13).toUpperCase() : orderId.slice(0, 10).toUpperCase();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 size={56} className="text-green-500" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-semibold text-[#1A1A1A]">Order Confirmed!</h1>
          <p className="text-[#6B6B6B]">
            Thank you for your order. We&apos;ve received your payment and will begin processing right away.
          </p>
        </div>

        <div className="border border-[#E8E8E4] p-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Order number</span>
            <span className="font-semibold text-[#1A1A1A] font-mono">#{shortId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Estimated delivery</span>
            <span className="font-medium text-[#1A1A1A]">5–7 business days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Confirmation</span>
            <span className="font-medium text-[#1A1A1A]">Sent to your email</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
