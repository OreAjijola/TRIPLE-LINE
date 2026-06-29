"use client";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "@/lib/validations";

interface CheckoutFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  shippingMethod: "standard" | "express";
  onShippingChange: (method: "standard" | "express") => void;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#C0392B]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full border border-[#E8E8E4] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white";

const SHIPPING_OPTIONS = [
  { value: "standard" as const, label: "Standard Delivery", duration: "5–7 business days", price: "₦1,500" },
  { value: "express" as const, label: "Express Delivery", duration: "1–2 business days", price: "₦3,500" },
];

export function CheckoutForm({ register, errors, shippingMethod, onShippingChange }: CheckoutFormProps) {
  return (
    <div>
      {/* Contact information */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Contact Information
        </h2>
        <div className="space-y-4">
          <Field id="fullName" label="Full Name" error={errors.fullName?.message}>
            <input id="fullName" {...register("fullName")} placeholder="Jane Doe" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="email" label="Email" error={errors.email?.message}>
              <input id="email" {...register("email")} type="email" placeholder="jane@example.com" className={inputClass} />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone?.message}>
              <input id="phone" {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={inputClass} />
            </Field>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Delivery Address
        </h2>
        <div className="space-y-4">
          <Field id="street" label="Street Address" error={errors.street?.message}>
            <input id="street" {...register("street")} placeholder="12 Broad Street" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="city" label="City" error={errors.city?.message}>
              <input id="city" {...register("city")} placeholder="Lagos" className={inputClass} />
            </Field>
            <Field id="state" label="State" error={errors.state?.message}>
              <input id="state" {...register("state")} placeholder="Lagos State" className={inputClass} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="zip" label="Postal Code" error={errors.zip?.message}>
              <input id="zip" {...register("zip")} placeholder="100001" className={inputClass} />
            </Field>
            <Field id="country" label="Country" error={errors.country?.message}>
              <input id="country" {...register("country")} placeholder="Nigeria" className={inputClass} />
            </Field>
          </div>
        </div>
      </div>

      {/* Shipping method */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E8E8E4]">
          Delivery Method
        </h2>
        <div className="space-y-3" role="radiogroup" aria-label="Delivery method">
          {SHIPPING_OPTIONS.map((opt) => (
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
                  name="shippingMethod"
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
    </div>
  );
}
