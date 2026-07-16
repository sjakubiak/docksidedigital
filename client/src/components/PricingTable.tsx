import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  priceRange: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface CarePlan {
  name: string;
  price: string;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    name: "Discovery & Strategy",
    priceRange: "$5,000–$15,000",
    description: "Rapid assessment and roadmap for AI or enterprise initiatives",
    features: [
      "Current state assessment",
      "Technology & architecture review",
      "AI / Java fit analysis",
      "Prioritized roadmap",
      "Executive-ready deliverables",
      "2–3 week engagement"
    ]
  },
  {
    name: "Project Delivery",
    priceRange: "$25,000–$150,000+",
    description: "End-to-end delivery of a defined scope — fixed or time-and-materials",
    features: [
      "Solution architecture",
      "Full-stack development",
      "AI integration or Java backend",
      "Cloud deployment",
      "Testing & QA",
      "Documentation & handover",
      "Agile delivery sprints"
    ],
    highlighted: true
  },
  {
    name: "Retainer & Staff Aug",
    priceRange: "$10,000–$50,000/mo",
    description: "Ongoing embedded consulting or team augmentation",
    features: [
      "Dedicated consultant(s)",
      "Flexible hours allocation",
      "Priority availability",
      "Monthly strategy reviews",
      "Ongoing AI or Java development",
      "Knowledge transfer included"
    ]
  }
];

const carePlans: CarePlan[] = [
  {
    name: "Maintenance",
    price: "$2,500/mo",
    features: ["Bug fixes & patches", "Security updates", "Performance monitoring", "Monthly status report"]
  },
  {
    name: "Support",
    price: "$5,000/mo",
    features: ["All Maintenance features", "Priority response SLA", "Minor enhancements", "Quarterly architecture review", "On-call availability"]
  },
  {
    name: "Partnership",
    price: "$10,000+/mo",
    features: ["All Support features", "Dedicated consultant", "Roadmap planning", "Unlimited minor requests", "Executive stakeholder access", "Annual technology audit"]
  }
];

export default function PricingTable() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`rounded-2xl p-8 ${tier.highlighted ? "border-primary border-2 shadow-lg" : ""}`}
            data-testid={`card-pricing-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <div className="text-3xl font-bold text-primary mt-2" data-testid={`text-price-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {tier.priceRange}
              </div>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                <AccordionItem value="features" className="border-0">
                  <AccordionTrigger className="text-sm font-medium py-2 hover-elevate px-2 rounded-md">
                    What&apos;s included
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 mt-4">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm" data-testid={`text-feature-${index}`}>
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Separator className="mb-8" />
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Ongoing Support Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {carePlans.map((plan) => (
            <Card key={plan.name} className="rounded-2xl p-6" data-testid={`card-care-${plan.name.toLowerCase()}`}>
              <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
              <div className="text-2xl font-bold text-primary mb-4" data-testid={`text-care-price-${plan.name.toLowerCase()}`}>
                {plan.price}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm" data-testid={`text-care-feature-${index}`}>
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        All pricing in CAD. Fixed-scope projects quoted after discovery. Retainers billed monthly. Custom enterprise pricing available.
      </p>
    </div>
  );
}
