import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "ZIP code is required").regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
    cardNumber: z
        .string()
        .min(1, "Card number is required")
        .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number"),
    expiry: z
        .string()
        .min(1, "Expiry date is required")
        .regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, "Invalid format (MM / YY)"),
    cvv: z.string().min(1, "CVV is required").regex(/^\d{3,4}$/, "Invalid CVV"),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;