import { z } from 'zod';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Database Tables

// Intake submissions table
export const intakeSubmissions = pgTable('intake_submissions', {
  id: serial('id').primaryKey(),
  businessName: text('business_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  website: text('website'),
  projectGoals: text('project_goals'),
  targetAudience: text('target_audience'),
  competitors: text('competitors'),
  timeline: text('timeline'),
  budget: text('budget'),
  features: text('features'),
  brandGuidelines: text('brand_guidelines'),
  additionalInfo: text('additional_info'),
  emailSent: text('email_sent').notNull().default('false'),
  emailMessageId: text('email_message_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertIntakeSubmissionSchema = createInsertSchema(intakeSubmissions).omit({
  id: true,
  createdAt: true,
});

export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type InsertIntakeSubmission = z.infer<typeof insertIntakeSubmissionSchema>;

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  projectType: text('project_type').notNull(),
  carePlan: text('care_plan').notNull(),
  description: text('description'),
  startDate: text('start_date'),
  deadline: text('deadline'),
  emailSent: text('email_sent').notNull().default('false'),
  emailMessageId: text('email_message_id'),
  paymentStatus: text('payment_status'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

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
