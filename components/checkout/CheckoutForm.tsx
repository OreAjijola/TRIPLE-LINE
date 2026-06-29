"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
  shippingMethod: "standard" | "express";
  onShippingChange: (method: "standard" | "express") => void;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">{label}</label>
      {children}
      {error && <p className="text-xs text-[#C0392B]">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full border border-[#E8E8E4] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white";

export function CheckoutForm({ onSubmit, isSubmitting, shippingMethod, onShippingChange }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingMethod: "standard" },
  });

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Contact info */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Contact Information
        </h2>
        <div className="space-y-4">
          <Field label="Full Name" error={errors.fullName?.message}>
            <input {...register("fullName")} placeholder="Jane Doe" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="jane@example.com" className={inputClass} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register("phone")} type="tel" placeholder="+1 555 000 0000" className={inputClass} />
            </Field>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Shipping Address
        </h2>
        <div className="space-y-4">
          <Field label="Street Address" error={errors.street?.message}>
            <input {...register("street")} placeholder="123 Main Street" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="City" error={errors.city?.message}>
              <input {...register("city")} placeholder="New York" className={inputClass} />
            </Field>
            <Field label="State / Province" error={errors.state?.message}>
              <input {...register("state")} placeholder="NY" className={inputClass} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="ZIP / Postal Code" error={errors.zip?.message}>
              <input {...register("zip")} placeholder="10001" className={inputClass} />
            </Field>
            <Field label="Country" error={errors.country?.message}>
              <input {...register("country")} placeholder="United States" className={inputClass} />
            </Field>
          </div>
        </div>
      </div>

      {/* Shipping method */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Shipping Method
        </h2>
        <div className="space-y-3">
          {[
            { value: "standard" as const, label: "Standard Shipping", duration: "5–7 business days", price: "$5.99" },
            { value: "express" as const, label: "Express Shipping", duration: "1–2 business days", price: "$14.99" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                shippingMethod === opt.value
                  ? "border-[#1A1A1A] bg-[#FAFAF8]"
                  : "border-[#E8E8E4] hover:border-[#9B9B9B]"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value={opt.value}
                  checked={shippingMethod === opt.value}
                  onChange={() => onShippingChange(opt.value)}
                  className="accent-[#1A1A1A]"
                />
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{opt.label}</p>
                  <p className="text-xs text-[#6B6B6B]">{opt.duration}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">{opt.price}</span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}
