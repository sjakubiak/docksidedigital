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

      // Send email notification
      let emailMessageId: string | null = null;
      let emailSent = false;
      let emailError: string | undefined;
      
      try {
        const result = await sendIntakeEmail(formData, summary);
        emailMessageId = result.messageId || null;
        emailSent = true;
      } catch (error: any) {
        console.error("Email sending failed:", error);
        emailError = error.message || "Email delivery failed";
        // Continue to save in database even if email fails
      }

      // Save to database
      const savedSubmission = await storage.createIntakeSubmission({
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        projectGoals: formData.projectGoals,
        targetAudience: formData.targetAudience,
        competitors: formData.competitors,
        timeline: formData.timeline,
        budget: formData.budget,
        features: formData.features,
        brandGuidelines: formData.brandGuidelines,
        additionalInfo: formData.additionalInfo,
        emailSent,
        emailMessageId,
      });

      // Return appropriate response based on email status
      if (!emailSent) {
        return res.status(202).json({ 
          ok: true, 
          message: "Intake questionnaire received and saved. Email notification could not be sent.",
          emailSent: false,
          emailError,
          submissionId: savedSubmission.id
        });
      }

      res.json({ 
        ok: true, 
        message: "Intake questionnaire sent successfully",
        emailSent: true,
        messageId: emailMessageId,
        submissionId: savedSubmission.id
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
      let emailMessageId: string | null = null;
      let emailSent = false;
      let emailError: string | undefined;
      
      try {
        const emailResult = await sendOrderEmail(formData);
        emailMessageId = emailResult.messageId || null;
        emailSent = true;
      } catch (error: any) {
        console.error("Email sending failed:", error);
        emailError = error.message || "Email delivery failed";
        // Continue to save in database even if email fails
      }

      // Save to database
      const savedOrder = await storage.createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        carePlan: formData.carePlan,
        description: formData.description,
        startDate: formData.startDate,
        deadline: formData.deadline,
        emailSent,
        emailMessageId,
        paymentStatus: null,
      });

      // Check for payment link environment variables
      const paymentLinkKey = `STRIPE_PAYMENT_LINK_${formData.projectType.toUpperCase()}`;
      const paymentLink = process.env[paymentLinkKey];

      if (paymentLink) {
        return res.json({
          ok: true,
          message: emailSent ? "Order received successfully" : "Order received and saved. Email notification could not be sent.",
          paymentLink,
          emailSent,
          messageId: emailMessageId,
          emailError,
          orderId: savedOrder.id
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
            message: emailSent ? "Order received successfully" : "Order received and saved. Email notification could not be sent.",
            checkoutUrl: session.url,
            emailSent,
            messageId: emailMessageId,
            emailError,
            orderId: savedOrder.id
          });
        } catch (stripeError) {
          console.error("Stripe checkout session creation failed:", stripeError);
          // Continue without payment link
        }
      }

      // If no payment processing available, just confirm receipt
      res.json({
        ok: true,
        message: emailSent 
          ? "Order received successfully. We'll send you payment details via email."
          : "Order received and saved. Email notification could not be sent.",
        emailSent,
        messageId: emailMessageId,
        emailError,
        orderId: savedOrder.id
      });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ 
        error: "Failed to process order. Please try again or email us directly." 
      });
    }
  });

  // Middleware to check admin access token
  const checkAdminAccess = (req: any, res: any, next: any) => {
    const accessToken = process.env.ADMIN_ACCESS_TOKEN;
    
    // If no admin token is set, deny access
    if (!accessToken) {
      return res.status(403).json({ 
        error: "Admin access not configured. Please set ADMIN_ACCESS_TOKEN environment variable." 
      });
    }

    // Check for token in header or query parameter
    const providedToken = req.headers['x-admin-token'] || req.query.token;
    
    if (providedToken !== accessToken) {
      return res.status(401).json({ 
        error: "Unauthorized. Invalid or missing admin token." 
      });
    }

    next();
  };

  // Get all intake submissions (protected)
  app.get("/api/intake-submissions", checkAdminAccess, async (_req, res) => {
    try {
      const submissions = await storage.getAllIntakeSubmissions();
      res.json({ ok: true, submissions });
    } catch (error) {
      console.error("Error fetching intake submissions:", error);
      res.status(500).json({ 
        error: "Failed to fetch intake submissions" 
      });
    }
  });

  // Get all orders (protected)
  app.get("/api/orders", checkAdminAccess, async (_req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json({ ok: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ 
        error: "Failed to fetch orders" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
