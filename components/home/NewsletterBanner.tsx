"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-[#1A1A1A] py-14">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium mb-3">Newsletter</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-6">
          Stay in the loop
        </h2>
        {submitted ? (
          <p className="text-white/70 text-sm">
            Thank you for subscribing. Watch your inbox for the latest drops.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/60 transition-colors"
            />
            <Button type="submit" size="md">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
