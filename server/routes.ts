import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendIntakeEmail, sendOrderEmail } from "./email";
import Stripe from "stripe";
import { intakeEmailPayloadSchema, orderFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/status", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Intake form submission endpoint
  app.post("/api/intake-email", async (req, res) => {
    try {
      // Validate request payload
      const validationResult = intakeEmailPayloadSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid form data",
          details: validationResult.error.issues
        });
      }

      const { formData, summary } = validationResult.data;

      // Send email via Resend
      const result = await sendIntakeEmail(formData, summary);

      res.json({ 
        ok: true, 
        message: "Intake questionnaire sent successfully",
        messageId: result.messageId
      });
    } catch (error) {
      console.error("Error processing intake submission:", error);
      res.status(500).json({ 
        error: "Failed to send intake questionnaire. Please try again or email us directly." 
      });
    }
  });

  // Order form submission endpoint
  app.post("/api/order", async (req, res) => {
    try {
      // Validate request payload
      const validationResult = orderFormSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid form data",
          details: validationResult.error.issues
        });
      }

      const formData = validationResult.data;

      // Send email notification
      const emailResult = await sendOrderEmail(formData);

      // Check for payment link environment variables
      const paymentLinkKey = `STRIPE_PAYMENT_LINK_${formData.projectType.toUpperCase()}`;
      const paymentLink = process.env[paymentLinkKey];

      if (paymentLink) {
        return res.json({
          ok: true,
          message: "Order received successfully",
          paymentLink,
          emailSent: true,
          messageId: emailResult.messageId
        });
      }

      // If no payment link but Stripe is configured, create a checkout session
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      
      if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: '2025-10-29.clover'
        });

        // Define pricing based on project type (amounts in cents CAD)
        const priceMap: Record<string, number> = {
          landing: 225000,  // $2,250 CAD (mid-range of $1,500–$3,000)
          website: 550000,  // $5,500 CAD (mid-range of $3,500–$7,500)
          mvp: 1375000      // $13,750 CAD (mid-range of $7,500–$20,000)
        };

        const amount = priceMap[formData.projectType] || 5000;

        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'cad',
                  product_data: {
                    name: `${formData.projectType.charAt(0).toUpperCase() + formData.projectType.slice(1)} Project`,
                    description: formData.description || undefined,
                  },
                  unit_amount: amount,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/order?success=true`,
            cancel_url: `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/order?canceled=true`,
            customer_email: formData.email,
            metadata: {
              customerName: formData.name,
              company: formData.company || '',
              projectType: formData.projectType,
            },
          });

          return res.json({
            ok: true,
            message: "Order received successfully",
            checkoutUrl: session.url,
            emailSent: true,
            messageId: emailResult.messageId
          });
        } catch (stripeError) {
          console.error("Stripe checkout session creation failed:", stripeError);
          // Continue without payment link
        }
      }

      // If no payment processing available, just confirm receipt
      res.json({
        ok: true,
        message: "Order received successfully. We'll send you payment details via email.",
        emailSent: true,
        messageId: emailResult.messageId
      });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ 
        error: "Failed to process order. Please try again or email us directly." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
