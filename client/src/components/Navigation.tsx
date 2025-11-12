import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="link-home">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl md:text-2xl font-bold tracking-tight hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              data-testid="button-logo"
            >
              Dockside Digital
            </button>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href.substring(1))}
                data-testid={`button-nav-${link.href.substring(1)}`}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation("/intake")}
              data-testid="button-intake"
            >
              Intake Form
            </Button>
            <Button onClick={() => setLocation("/order")} data-testid="button-order">
              Place Order
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start text-lg"
                    onClick={() => {
                      scrollToSection(link.href.substring(1));
                      document.querySelector('[data-state="open"]')?.dispatchEvent(
                        new KeyboardEvent("keydown", { key: "Escape" })
                      );
                    }}
                    data-testid={`button-mobile-nav-${link.href.substring(1)}`}
                  >
                    {link.label}
                  </Button>
                ))}
                <div className="border-t pt-4 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/intake")}
                    data-testid="button-mobile-intake"
                  >
                    Intake Form
                  </Button>
                  <Button onClick={() => setLocation("/order")} data-testid="button-mobile-order">
                    Place Order
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
