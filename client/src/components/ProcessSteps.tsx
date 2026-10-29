import { FileText, Phone, FileCheck, Code, Monitor, Rocket, Shield, LucideIcon } from "lucide-react";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "Intake",
    description: "Fill out our quick questionnaire to tell us about your project and goals."
  },
  {
    number: 2,
    icon: Phone,
    title: "15-min Call",
    description: "We hop on a brief call to clarify your needs and answer questions."
  },
  {
    number: 3,
    icon: FileCheck,
    title: "Proposal & Deposit",
    description: "You receive a detailed proposal. Once approved, pay 50% to kick things off."
  },
  {
    number: 4,
    icon: Code,
    title: "Build",
    description: "We build your project iteratively, keeping you updated along the way."
  },
  {
    number: 5,
    icon: Monitor,
    title: "Staging Demo",
    description: "Review your site on a staging environment and request any final tweaks."
  },
  {
    number: 6,
    icon: Rocket,
    title: "Launch",
    description: "We deploy to production, hand over access, and collect final payment."
  },
  {
    number: 7,
    icon: Shield,
    title: "Care Plan",
    description: "Optional ongoing support to keep your site updated, secure, and performing."
  }
];

export default function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className="relative"
          data-testid={`step-${step.number}`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
              <step.icon className="h-8 w-8 text-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {step.number}
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
