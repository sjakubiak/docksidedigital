import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import ProcessSteps from "@/components/ProcessSteps";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Zap, Globe, Rocket, Coffee, Dumbbell, Wrench, Briefcase, Store, ShoppingBag, Sparkles, MessageSquare, Bot, BrainCircuit } from "lucide-react";
import { useLocation } from "wouter";

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

  const industries = [
    {
      icon: Coffee,
      name: "Food & Beverage",
      description: "Restaurants, cafés, and catering services",
      solutions: ["Online ordering & menus", "Reservation systems", "Event booking", "Photo galleries"]
    },
    {
      icon: Dumbbell,
      name: "Health & Fitness",
      description: "Gyms, studios, and wellness centers",
      solutions: ["Class scheduling", "Membership portals", "Trainer profiles", "Payment integration"]
    },
    {
      icon: Wrench,
      name: "Trades & Home Services",
      description: "Plumbing, HVAC, electrical, and contractors",
      solutions: ["Service booking", "Quote requests", "Customer portals", "Invoice management"]
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      description: "Lawyers, accountants, and consultants",
      solutions: ["Client portals", "Appointment booking", "Document sharing", "Secure payments"]
    },
    {
      icon: Store,
      name: "Retail & E-commerce",
      description: "Local shops and online stores",
      solutions: ["Product catalogs", "Shopping carts", "Payment processing", "Inventory tracking"]
    },
    {
      icon: ShoppingBag,
      name: "Local Businesses",
      description: "Any Atlantic Canada business needing a web presence",
      solutions: ["Custom websites", "Booking systems", "Contact forms", "SEO optimization"]
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
              Industries We Serve
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We build websites and web apps for Atlantic Canada businesses across all industries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.name} className="hover-elevate" data-testid={`card-industry-${industry.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2 text-muted-foreground">What we build:</p>
                  <ul className="space-y-1">
                    {industry.solutions.map((solution) => (
                      <li key={solution} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                AI-Powered Features
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Add intelligent capabilities to your web app with modern AI integration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-elevate" data-testid="card-ai-chatbots">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Chatbots & Support</CardTitle>
                <CardDescription>24/7 customer support automation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Custom-trained chatbots for your business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>FAQ automation and lead qualification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Integration with your existing systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-ai-content">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Content Generation</CardTitle>
                <CardDescription>AI-assisted writing and creation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Product descriptions and marketing copy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Email templates and responses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>SEO-optimized content suggestions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-ai-automation">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Intelligent Automation</CardTitle>
                <CardDescription>Smart workflows and processing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Document analysis and data extraction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Smart recommendations and personalization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Automated categorization and tagging</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                AI Integration Expertise
              </h3>
              <p className="text-muted-foreground mb-4">
                We integrate leading AI platforms including OpenAI, Anthropic Claude, and open-source models. 
                Whether you need a simple chatbot or complex data processing, we build AI features that actually 
                work for your business—no hype, just practical solutions.
              </p>
              <p className="text-sm text-muted-foreground">
                AI features can be added to any service tier. Pricing varies based on complexity and usage.
              </p>
            </div>
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
