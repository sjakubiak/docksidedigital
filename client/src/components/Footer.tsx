import { Link } from "wouter";
import { Mail } from "lucide-react";
import logo from "@assets/dockside-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Dockside Digital" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Halifax-based web studio building fast, clean solutions for Atlantic Canada businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="button-footer-home"
                >
                  Home
                </button>
              </li>
              <li>
                <Link href="/experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-experience">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/intake" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-intake">
                  Intake Form
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-order">
                  Place Order
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="mailto:sjakubiak@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md inline-flex"
              data-testid="link-email"
            >
              <Mail className="h-4 w-4" />
              sjakubiak@gmail.com
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Halifax, Nova Scotia
            </p>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Dockside Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
