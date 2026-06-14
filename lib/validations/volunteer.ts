import { z } from "zod";

export const VolunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  interests: z.array(z.string()).min(1, "Please select at least one area of interest"),
  availability: z.enum(["WEEKDAYS", "WEEKENDS", "BOTH", "FLEXIBLE"]),
});
