import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendIntakeEmail, sendOrderEmail } from "./email";
import Stripe from "stripe";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/status", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Intake form submission endpoint
  app.post("/api/intake-email", async (req, res) => {
    try {
      const { formData, summary } = req.body;

      if (!formData.email) {
        return res.status(400).json({ 
          error: "Email is required" 
        });
      }

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
      const formData = req.body;

      if (!formData.email || !formData.name || !formData.projectType) {
        return res.status(400).json({ 
          error: "Name, email, and project type are required" 
        });
      }

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

        // Define pricing based on project type
        const priceMap: Record<string, number> = {
          landing: 2000, // $20.00 USD (in cents)
          website: 5000, // $50.00 USD
          mvp: 10000     // $100.00 USD
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
