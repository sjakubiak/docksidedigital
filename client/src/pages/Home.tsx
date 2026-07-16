import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import ProcessSteps from "@/components/ProcessSteps";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Globe, Rocket, Building2, Cpu, Database, Server, BarChart3, ShieldCheck, Sparkles, MessageSquare, Bot, BrainCircuit } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const services = [
    {
      icon: Zap,
      title: "AI Strategy & Integration",
      priceRange: "Custom Pricing",
      description: "Embed practical AI into your existing systems — from LLM-powered workflows to intelligent automation that actually ships.",
      features: [
        "AI readiness assessment",
        "LLM & model selection",
        "API integration (OpenAI, Anthropic, open-source)",
        "Proof of concept development",
        "Production deployment"
      ]
    },
    {
      icon: Globe,
      title: "Java Enterprise Development",
      priceRange: "Custom Pricing",
      description: "Robust, scalable backend systems built with Java and modern enterprise frameworks — designed to last.",
      features: [
        "Spring Boot & Spring Cloud",
        "Microservices architecture",
        "REST & GraphQL APIs",
        "Legacy system modernization",
        "Performance tuning"
      ]
    },
    {
      icon: Rocket,
      title: "Enterprise Application Delivery",
      priceRange: "Custom Pricing",
      description: "End-to-end delivery of complex enterprise applications — from architecture through launch and ongoing support.",
      features: [
        "Solution architecture",
        "Full-stack development",
        "Cloud deployment (AWS, Azure, GCP)",
        "DevOps & CI/CD pipelines",
        "Enterprise support plans"
      ]
    }
  ];

  const industries = [
    {
      icon: Building2,
      name: "Financial Services",
      description: "Banks, credit unions, insurance, and fintech",
      solutions: ["Core banking integrations", "Fraud detection AI", "Regulatory reporting", "Secure client portals"]
    },
    {
      icon: Cpu,
      name: "Technology & SaaS",
      description: "Software companies and platform builders",
      solutions: ["Platform architecture", "AI feature development", "API design & governance", "Scalability engineering"]
    },
    {
      icon: Database,
      name: "Healthcare & Life Sciences",
      description: "Hospitals, clinics, and health tech companies",
      solutions: ["HL7 & FHIR integrations", "Clinical workflow automation", "Data pipeline development", "Compliance-ready systems"]
    },
    {
      icon: Server,
      name: "Government & Public Sector",
      description: "Federal, provincial, and municipal organizations",
      solutions: ["Legacy modernization", "Secure enterprise portals", "Data integration platforms", "Accessibility compliance"]
    },
    {
      icon: BarChart3,
      name: "Retail & E-commerce",
      description: "Retailers and marketplace operators",
      solutions: ["Recommendation engines", "Inventory intelligence", "ERP integrations", "Omnichannel platforms"]
    },
    {
      icon: ShieldCheck,
      name: "Professional Services",
      description: "Consulting, legal, and accounting firms",
      solutions: ["Client portal development", "Document automation", "AI-assisted research tools", "Workflow digitization"]
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
              From AI strategy to full enterprise application delivery — practical solutions that move the needle.
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
              We work with enterprises, mid-size organizations, and startups across a wide range of sectors.
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
                  <p className="text-sm font-semibold mb-2 text-muted-foreground">What we deliver:</p>
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
                AI-Powered Capabilities
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We help organizations move from AI curiosity to AI production — responsibly and at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-elevate" data-testid="card-ai-chatbots">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Conversational AI</CardTitle>
                <CardDescription>Enterprise chatbots and virtual agents</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Custom LLM-powered assistants trained on your data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Internal knowledge base and support automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Integration with enterprise systems (CRM, ERP, ITSM)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-ai-content">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Intelligent Data Processing</CardTitle>
                <CardDescription>Turn unstructured data into actionable insight</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Document extraction and classification at scale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Predictive analytics and anomaly detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>RAG pipelines for enterprise knowledge retrieval</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-ai-automation">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Process Automation</CardTitle>
                <CardDescription>AI-driven workflows that reduce manual effort</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>End-to-end workflow automation with AI decision nodes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Approval routing, escalation, and exception handling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Audit trails and compliance-ready logging</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                Platform-Agnostic AI Expertise
              </h3>
              <p className="text-muted-foreground mb-4">
                We work across OpenAI, Anthropic Claude, Azure OpenAI, AWS Bedrock, and open-source models like LLaMA and Mistral. 
                We help you select the right model for your risk tolerance, budget, and data governance requirements — then build it properly.
              </p>
              <p className="text-sm text-muted-foreground">
                AI capabilities can be scoped as a standalone engagement or embedded into a broader enterprise delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Engagement Models
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible structures to match how your organization works — from fixed-scope projects to ongoing retainers.
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
              A structured engagement process built around your business outcomes, not billable hours.
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
              Dockside Digital is an IT consulting firm specializing in AI integration, Java enterprise development, and complex application delivery. 
              We work with startups moving fast, mid-size companies scaling their platforms, and enterprise organizations modernizing legacy systems.
            </p>
            <p>
              We believe good technology consulting is direct, outcome-driven, and free of unnecessary complexity. 
              No inflated teams, no endless discovery phases — just experienced consultants who understand enterprise software and deliver results.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to Talk?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Tell us about your project and we&apos;ll follow up within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setLocation("/intake")}
              data-testid="button-contact-intake"
            >
              Start the Conversation
            </Button>
          </div>
          <div className="mt-8">
            <a
              href="mailto:sjakubiak@docksidedigital.ca"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              data-testid="link-contact-email"
            >
              Or email us directly at sjakubiak@docksidedigital.ca
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
