import ServiceCard from "../ServiceCard";
import { Zap } from "lucide-react";

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard
        icon={Zap}
        title="Landing Page Sprint"
        priceRange="$1,500–$3,000 CAD"
        description="Convert clicks into calls in ~10 days: tight copy, crisp design, and analytics."
        features={[
          "Single page design",
          "Copy + design polish",
          "Booking form integration",
          "Analytics setup",
          "2 rounds of revisions"
        ]}
      />
    </div>
  );
}
