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
    name: "Landing Page Sprint",
    priceRange: "$1,500–$3,000",
    description: "Perfect for quick launches and focused campaigns",
    features: [
      "Single page design",
      "Copywriting polish",
      "SEO basics",
      "Analytics integration",
      "Contact form",
      "2 rounds of revisions",
      "1-2 week delivery"
    ]
  },
  {
    name: "Business Website",
    priceRange: "$3,000–$7,000",
    description: "Complete web presence for growing businesses",
    features: [
      "4-8 pages",
      "Blog functionality",
      "Basic CMS",
      "Contact/booking forms",
      "On-page SEO",
      "Mobile responsive",
      "2-3 rounds of revisions",
      "2-4 week delivery"
    ],
    highlighted: true
  },
  {
    name: "MVP Web App",
    priceRange: "$8,000–$20,000+",
    description: "Custom applications with core features",
    features: [
      "User authentication",
      "Database setup",
      "3-5 core features",
      "Stripe integration",
      "Admin dashboard",
      "API development",
      "Agile delivery",
      "4-8+ week delivery"
    ]
  }
];

const carePlans: CarePlan[] = [
  {
    name: "Basic",
    price: "$149/mo",
    features: ["Monthly updates", "Bug fixes", "Basic support", "Performance monitoring"]
  },
  {
    name: "Standard",
    price: "$349/mo",
    features: ["Weekly updates", "Priority support", "Content updates", "Security patches", "Analytics reports"]
  },
  {
    name: "Pro",
    price: "$799/mo",
    features: ["Daily monitoring", "24/7 support", "Unlimited updates", "A/B testing", "Custom features", "Dedicated account manager"]
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
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Care Plans</h3>
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
        CAD, before HST. 50% deposit / 50% launch, or 10% off paid in full.
      </p>
    </div>
  );
}
