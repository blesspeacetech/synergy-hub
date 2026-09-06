import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  // Honeypot - should be empty
  website: z.string().max(0, "Invalid submission").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
