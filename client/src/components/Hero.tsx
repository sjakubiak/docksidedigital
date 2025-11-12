import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Halifax_harbor_hero_background_6b5f3e8a.png";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Local SaaS & websites—launched fast.
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Dockside Digital builds clean, reliable sites and simple web apps for Atlantic Canada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="backdrop-blur-md bg-white/20 hover:bg-white/30 border-white/30 text-white min-w-[200px]"
            onClick={() => scrollToSection("contact")}
            data-testid="button-hero-plan"
          >
            Get a plan in 15 minutes
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30 text-white min-w-[200px]"
            onClick={() => scrollToSection("pricing")}
            data-testid="button-hero-pricing"
          >
            See pricing
          </Button>
        </div>
        
        <Badge variant="secondary" className="backdrop-blur-md bg-white/10 text-white border-white/20" data-testid="badge-social-proof">
          Built with Replit • Next.js • Stripe
        </Badge>
      </div>
    </section>
  );
}
