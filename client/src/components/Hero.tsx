import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Halifax_harbor_hero_background_6b5f3e8a.png";
import logo from "@assets/dockside-logo.png";

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
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.4)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <img src={logo} alt="Dockside Digital" className="h-24 md:h-32 w-auto mx-auto mb-8 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          AI-Driven SaaS & Websites Built for Local Business
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
          Clean, reliable sites and simple web apps for Atlantic Canada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </div>
    </section>
  );
}
