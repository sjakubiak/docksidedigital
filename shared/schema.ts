import { z } from 'zod';

// Intake form schema
export const intakeFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  website: z.string().optional(),
  projectGoals: z.string().optional(),
  targetAudience: z.string().optional(),
  competitors: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  features: z.string().optional(),
  brandGuidelines: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type IntakeForm = z.infer<typeof intakeFormSchema>;

// Order form schema
export const orderFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.enum(['landing', 'website', 'mvp'], {
    errorMap: () => ({ message: "Please select a valid project type" })
  }),
  carePlan: z.enum(['none', 'basic', 'standard', 'pro'], {
    errorMap: () => ({ message: "Please select a valid care plan" })
  }),
  description: z.string().optional(),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
});

export type OrderForm = z.infer<typeof orderFormSchema>;

// Email payload schemas
export const intakeEmailPayloadSchema = z.object({
  formData: intakeFormSchema,
  summary: z.string().min(1, "Summary is required"),
});

export type IntakeEmailPayload = z.infer<typeof intakeEmailPayloadSchema>;
