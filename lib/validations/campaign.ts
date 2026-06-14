import { z } from "zod";

export const CampaignCreateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  story: z.string().min(50, "Story must be at least 50 characters"),
  category: z.enum(["EDUCATION","WOMEN_EMPOWERMENT","HEALTHCARE","ENVIRONMENT","EMERGENCY_RELIEF","CHILD_WELFARE","LIVELIHOOD","OTHER"]),
  goalAmount: z.number().positive("Goal amount must be positive"),
  endDate: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  coverImage: z.string().url().optional().or(z.literal("")),
});

export const DonationSchema = z.object({
  campaignId: z.string().cuid(),
  donorName: z.string().min(2, "Name is required"),
  donorEmail: z.string().email("Valid email required"),
  donorPhone: z.string().optional(),
  amount: z.number().min(10, "Minimum donation is ₹10"),
  message: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});
