import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  street: z.string().min(5, "Please enter a valid street address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a state or province"),
  zip: z.string().min(3, "Please enter a valid postal code"),
  country: z.string().min(2, "Please select a country"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const initializePaymentSchema = z.object({
  email: z.string().email("Invalid email"),
  items: z.array(
    z.object({
      id: z.string(),
      size: z.string(),
      color: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
  shippingMethod: z.enum(["standard", "express"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
