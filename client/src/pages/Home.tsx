import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import PricingTable from "@/components/PricingTable";
import ProcessSteps from "@/components/ProcessSteps";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap, Globe, Rocket } from "lucide-react";
import { useLocation } from "wouter";
import coffeeImage from "@assets/generated_images/Coffee_shop_case_study_17528733.png";
import fitnessImage from "@assets/generated_images/Fitness_facility_case_study_62f848c1.png";
import plumbingImage from "@assets/generated_images/Plumbing_business_case_study_4ad1b5ba.png";

export default function Home() {
  const [, setLocation] = useLocation();

  const services = [
    {
      icon: Zap,
      title: "Landing Page Sprint",
      priceRange: "$1,500–$3,000 CAD",
      description: "Convert clicks into calls in ~10 days: tight copy, crisp design, and analytics.",
      features: [
        "Single page design",
        "Copy + design polish",
        "Booking form integration",
        "Analytics setup",
        "2 rounds of revisions"
      ]
    },
    {
      icon: Globe,
      title: "Business Website",
      priceRange: "$3,000–$7,000 CAD",
      description: "A modern, easy-to-manage site with the pages you need and none you don't.",
      features: [
        "4-8 pages",
        "Blog functionality",
        "Basic CMS",
        "Contact/booking forms",
        "Mobile responsive",
        "2-3 rounds of revisions"
      ]
    },
    {
      icon: Rocket,
      title: "MVP Web App",
      priceRange: "$8,000–$20,000+ CAD",
      description: "Auth, database, and your core features—so you can validate quickly.",
      features: [
        "User authentication",
        "Database setup",
        "3-5 core features",
        "Stripe integration",
        "Admin dashboard",
        "API development"
      ]
    }
  ];

  const exampleProjects = [
    {
      title: "Lead-gen landing page",
      client: "Coffee Shop Example",
      industry: "Food & Beverage",
      thumbnail: coffeeImage,
      stat: "Single-page site",
      challenge: "A local coffee shop wants to increase online orders and event bookings during slow winter months.",
      solution: "A conversion-focused landing page with compelling imagery, clear menu sections, and an integrated booking system for private events.",
      stack: ["Modern framework", "Responsive design", "Payment processing", "Booking integration"],
      results: "Fast-loading single page optimized for conversions with analytics tracking and mobile-first design.",
      quote: "Example of how we'd approach a food & beverage landing page project."
    },
    {
      title: "6-page site with booking",
      client: "Fitness Studio Example",
      industry: "Health & Wellness",
      thumbnail: fitnessImage,
      stat: "Multi-page site",
      challenge: "A growing fitness studio needs a professional web presence to compete with larger gym chains and streamline class bookings.",
      solution: "A 6-page responsive website with integrated class scheduling, trainer profiles, and membership plans.",
      stack: ["Modern framework", "Content management", "Payment integration", "Scheduling system"],
      results: "Complete business website delivered in 2-4 weeks with automated booking system reducing administrative overhead.",
      quote: "Example of a typical business website with booking functionality."
    },
    {
      title: "Simple member portal",
      client: "Service Business Example",
      industry: "Home Services",
      thumbnail: plumbingImage,
      stat: "Custom web app",
      challenge: "A service company is losing time managing invoices and documents via email, causing delayed payments.",
      solution: "A simple member portal where clients can view invoices, download documents, and make secure payments online.",
      stack: ["Modern framework", "Database", "Authentication", "Payment processing"],
      results: "Custom web application with user authentication, document management, and automated payment collection.",
      quote: "Example of a custom MVP web app for service-based businesses."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From quick landing pages to full web applications, we deliver quality work fast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Example Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              See what we can build for your business—from landing pages to custom web apps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleProjects.map((project) => (
              <CaseStudyCard key={project.client} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Clear, upfront pricing with no surprises.
            </p>
          </div>
          <PricingTable />
        </div>
      </section>

      <section id="process" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              How We Work
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven process from idea to launch.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            About Dockside Digital
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              We&apos;re a Halifax-based web studio that believes in practical, fast iterations focused on outcomes. 
              No bloat, no endless meetings—just clean, reliable work that helps Atlantic Canada businesses grow.
            </p>
            <p>
              Whether you need a simple landing page or a custom web application, we bring the same 
              attention to detail and commitment to quality that defines our maritime roots.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Take the first step toward your new website or web app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setLocation("/intake")}
              data-testid="button-contact-intake"
            >
              Take the Intake Questionnaire
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setLocation("/order")}
              data-testid="button-contact-order"
            >
              Place an Order
            </Button>
          </div>
          <div className="mt-8">
            <a
              href="mailto:hello@dockside.digital"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              data-testid="link-contact-email"
            >
              Or email us at hello@dockside.digital
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
