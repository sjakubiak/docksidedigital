import CaseStudyCard from "../CaseStudyCard";
import thumbnail from "@assets/generated_images/Coffee_shop_case_study_17528733.png";

export default function CaseStudyCardExample() {
  return (
    <div className="p-8 max-w-md">
      <CaseStudyCard
        title="Lead-gen landing page"
        client="Harbour Coffee"
        industry="Food & Beverage"
        thumbnail={thumbnail}
        stat="+38% conversions"
        challenge="Local coffee shop needed to increase online orders and event bookings during slow winter months."
        solution="Built a conversion-focused landing page with compelling imagery, clear menu sections, and an integrated booking system for private events."
        stack={["React", "Tailwind CSS", "Stripe", "Calendly"]}
        results="Achieved 38% increase in contact form submissions and 25% growth in online orders within first month."
        quote="The new site brought our café to life online. Event bookings doubled!"
      />
    </div>
  );
}
