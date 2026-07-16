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
    description: "Share details about your organization, goals, and the challenge you're looking to solve."
  },
  {
    number: 2,
    icon: Phone,
    title: "Discovery Call",
    description: "A focused conversation to understand your environment, constraints, and success criteria."
  },
  {
    number: 3,
    icon: FileCheck,
    title: "Proposal",
    description: "We deliver a clear scope of work, timeline, and investment — no surprises."
  },
  {
    number: 4,
    icon: Code,
    title: "Delivery",
    description: "We execute in focused sprints with regular check-ins and transparent progress updates."
  },
  {
    number: 5,
    icon: Monitor,
    title: "Review & Iterate",
    description: "Demos and feedback cycles ensure the solution matches your requirements before go-live."
  },
  {
    number: 6,
    icon: Rocket,
    title: "Launch",
    description: "Production deployment, documentation handover, and knowledge transfer to your team."
  },
  {
    number: 7,
    icon: Shield,
    title: "Ongoing Support",
    description: "Optional support plans to keep your systems secure, current, and performing well."
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
