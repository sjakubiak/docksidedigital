import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  priceRange: string;
  description: string;
  features: string[];
}

export default function ServiceCard({ icon: Icon, title, priceRange, description, features }: ServiceCardProps) {
  return (
    <Card className="rounded-2xl p-8 md:p-10 hover-elevate transition-shadow duration-300" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="p-0 mb-6">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
        <CardDescription className="text-muted-foreground mt-2">{priceRange}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-base leading-relaxed mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm" data-testid={`text-feature-${index}`}>
              <span className="text-primary mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
