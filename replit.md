# Dockside Digital - Project Documentation

## Overview

Dockside Digital is a Halifax-based web studio marketing website built with a modern full-stack architecture. The application serves as both a marketing platform and a client intake system, featuring service showcases, industry information, AI capabilities, pricing information, and contact forms. The project emphasizes fast performance, clean design with maritime-inspired aesthetics, and a trust-first approach for payment and order decisions.

The application is built for deployment on Replit Autoscale, using a React + Express architecture with Vite as the build tool. It integrates with Stripe for payments (via Checkout/payment links only - no card collection on servers) and Resend for email notifications. The website is technology-agnostic, avoiding specific tech stack mentions to maintain flexibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript in strict mode
- Vite as the development server and build tool
- Client-side routing using Wouter (lightweight alternative to React Router)
- React Query (@tanstack/react-query) for server state management with custom query functions

**UI Component System:**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for styling with custom design system
- Component structure follows atomic design principles with reusable UI components in `client/src/components/ui/`
- Custom components for business logic in `client/src/components/`

**Design System:**
- Typography: Inter font family (400, 500, 600, 700 weights)
- Color system based on HSL with CSS custom properties for theming
- Spacing follows Tailwind's scale (2, 4, 6, 8, 12, 16, 20, 24)
- Responsive design with mobile-first approach
- Maritime-inspired coastal aesthetics with clean, open layouts

**Page Structure:**
- Single-page marketing homepage with jump-link navigation sections:
  - Services (3 tiers: Landing Page Sprint, Business Website, MVP Web App)
  - Industries We Serve (6 industry cards with specific solutions)
  - AI-Powered Features (chatbots, content generation, intelligent automation)
  - Pricing (transparent pricing table)
  - Process (step-by-step workflow)
  - About (company description)
  - Contact (intake and order CTAs)
- Dedicated Experience page showcasing technical expertise and skills
- Dedicated pages for intake questionnaire and order forms
- Legal pages (Privacy, Terms)
- 404 not found page

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Custom Vite middleware integration for development mode
- API-first design with RESTful endpoints under `/api` prefix
- Request logging middleware for API routes

**API Endpoints:**
- `GET /api/status` - Health check endpoint
- `POST /api/intake-email` - Intake questionnaire submission with database storage and email notification
- `POST /api/order` - Order form submission with database storage, email notification, and Stripe integration

**Request Handling:**
- JSON body parsing with raw body preservation for webhook verification
- Zod schema validation for all form submissions
- Custom error handling with structured error responses

**Development Features:**
- Hot module replacement (HMR) via Vite
- Runtime error overlay for development
- Replit-specific plugins (cartographer, dev banner) in development mode

### Data Storage Solutions

**Database:**
- PostgreSQL via Drizzle ORM with Neon serverless driver
- Database connection established in `server/db.ts`
- Schema definitions in `shared/schema.ts`
- Active tables:
  - `intake_submissions` - Stores all intake questionnaire submissions with email tracking
  - `orders` - Stores all order form submissions with email and payment tracking
- Email tracking fields: `emailSent` (boolean), `emailMessageId` (text)
- Database configuration expects `DATABASE_URL` environment variable
- Migrations managed via `npm run db:push`

**Storage Layer:**
- `server/storage.ts` - Storage interface (IStorage) and implementation (DbStorage)
- Methods for creating intake submissions and orders
- All form submissions persisted to PostgreSQL regardless of email delivery status

**Session Management:**
- Connect-pg-simple for PostgreSQL session storage
- Session data structure supports user authentication flows

### Form Submission & Data Persistence

**Intake Submissions:**
- All intake questionnaire submissions saved to `intake_submissions` table
- Fields: business info, contact details, project goals, timeline, budget, features
- Email tracking: `emailSent` boolean and `emailMessageId` for Mailgun message IDs
- API returns 202 status with error details if email fails, 200 if successful

**Order Submissions:**
- All order form submissions saved to `orders` table
- Fields: contact info, project type, care plan, description, dates
- Payment tracking: `paymentStatus` field for Stripe integration
- Email tracking: `emailSent` boolean and `emailMessageId` for Mailgun message IDs
- API responses include `emailSent`, `emailError` (if applicable), and database record ID

**Error Handling:**
- Form submissions saved to database even if email delivery fails
- Email failures captured and reported in API responses
- Maintains data integrity while providing accurate status feedback

### External Dependencies

**Payment Processing:**
- Stripe integration via @stripe/stripe-js and @stripe/react-stripe-js
- Payment links/Checkout only - no direct card collection
- Server-side Stripe SDK for webhook handling and order processing
- Expects environment variables: `STRIPE_PRICE_*` or `STRIPE_PAYMENT_LINK_*`

**Email Service:**
- Mailgun API for transactional email delivery
- Sends intake questionnaire and order confirmation emails
- Configuration via secrets: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`
- From email: `info@docksidedigital.ca` (configured via `MAILGUN_FROM_EMAIL` or defaults)
- Target recipient: `OWNER_EMAIL` environment variable (defaults to sjakubiak@docksidedigital.ca)
- Uses mailgun.js SDK with form-data for reliable email delivery

**AI Capabilities (Marketing Content):**
- AI Chatbots & Support: Custom-trained chatbots, FAQ automation, lead qualification
- Content Generation: Product descriptions, email templates, SEO-optimized content
- Intelligent Automation: Document processing, recommendations, categorization
- Platforms: OpenAI, Anthropic Claude, open-source models
- Integration approach: Practical, business-focused solutions without hype

**Industries Served (Marketing Content):**
- Food & Beverage (restaurants, cafés, catering)
- Health & Fitness (gyms, studios, wellness)
- Trades & Home Services (plumbing, HVAC, electrical)
- Professional Services (lawyers, accountants, consultants)
- Retail & E-commerce (shops, online stores)
- Local Businesses (general Atlantic Canada businesses)

**Third-Party UI Libraries:**
- Radix UI primitives for accessible component foundations
- Lucide React for iconography
- React Icons (specifically react-icons/si for brand icons like Stripe)
- cmdk for command palette functionality
- date-fns for date manipulation
- class-variance-authority and clsx for conditional styling

**Form Management:**
- React Hook Form for form state management
- @hookform/resolvers for Zod schema integration
- Zod for runtime type validation and schema definitions

**Development Tools:**
- TypeScript strict mode compilation
- ESLint and Prettier (configured but not shown in provided files)
- Drizzle Kit for database migrations
- tsx for TypeScript execution in development

**Deployment Platform:**
- Replit Autoscale deployment target
- Environment-specific configuration via NODE_ENV
- Build process: Vite for client, esbuild for server bundle
- Static file serving in production mode

**SEO & Meta:**
- Comprehensive meta tags in index.html (Open Graph, Twitter Cards)
- Canonical URLs
- Structured data (JSON-LD for LocalBusiness schema)
- Sitemap and robots.txt configured
- Geo-tagging for Halifax, Nova Scotia location