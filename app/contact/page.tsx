"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";

const inputClass =
  "w-full border border-[#E8E8E4] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-white";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactFormData) {
    // In production, send to an API route
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form:", data);
    setSent(true);
    reset();
  }

  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
      <div className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-2">Get in Touch</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1A1A1A]">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Form */}
        <div>
          {sent ? (
            <div className="border border-[#E8E8E4] p-8 text-center space-y-3">
              <p className="font-semibold text-[#1A1A1A]">Message sent!</p>
              <p className="text-sm text-[#6B6B6B]">
                Thank you for reaching out. We typically respond within 24–48 hours.
              </p>
              <Button variant="ghost" size="sm" onClick={() => setSent(false)}>
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Name</label>
                <input
                  id="name"
                  {...register("name")}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
                {errors.name && <p className="text-xs text-[#C0392B]">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="jane@example.com"
                  className={inputClass}
                />
                {errors.email && <p className="text-xs text-[#C0392B]">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Message</label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="text-xs text-[#C0392B]">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} fullWidth>
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-5">Contact Details</h2>
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@tripline.co", href: "mailto:hello@tripline.co" },
                { icon: Phone, label: "Phone", value: "+1 (212) 555-0100", href: "tel:+12125550100" },
                { icon: MapPin, label: "Address", value: "123 Editorial Row, New York, NY 10001", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-[#E8E8E4] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#6B6B6B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-[#6B6B6B] mb-0.5">{label}</p>
                    <a href={href} className="text-sm text-[#1A1A1A] hover:underline underline-offset-2 transition-all">
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E8E4] pt-8">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-3">Hours</h3>
            <div className="space-y-2 text-sm text-[#6B6B6B]">
              <div className="flex justify-between"><span>Monday – Friday</span><span>9am – 6pm EST</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>10am – 4pm EST</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
