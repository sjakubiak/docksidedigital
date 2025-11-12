import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  thumbnail: string;
  stat: string;
  challenge: string;
  solution: string;
  stack: string[];
  results: string;
  quote?: string;
}

export default function CaseStudyCard({
  title,
  client,
  industry,
  thumbnail,
  stat,
  challenge,
  solution,
  stack,
  results,
  quote,
}: CaseStudyCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="rounded-2xl overflow-hidden hover-elevate transition-all duration-300 cursor-pointer group"
        onClick={() => setIsOpen(true)}
        data-testid={`card-case-study-${client.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={`${client} case study`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge
            className="absolute top-4 left-4 bg-white/90 text-foreground"
            data-testid={`badge-industry-${industry.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {industry}
          </Badge>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">{client}</h3>
            <p className="text-2xl md:text-3xl font-bold text-white">{stat}</p>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">{title}</p>
          <Button variant="outline" size="sm" data-testid="button-learn-more">
            Learn More
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl">{client}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <img
              src={thumbnail}
              alt={`${client} case study`}
              className="w-full rounded-lg aspect-video object-cover"
            />
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Challenge</h4>
              <p className="text-muted-foreground leading-relaxed">{challenge}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Solution</h4>
              <p className="text-muted-foreground leading-relaxed">{solution}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Badge key={tech} variant="secondary" data-testid={`badge-tech-${tech.toLowerCase()}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Results</h4>
              <p className="text-muted-foreground leading-relaxed">{results}</p>
            </div>
            
            {quote && (
              <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                <p className="italic text-foreground">&quot;{quote}&quot;</p>
              </div>
            )}
            
            <Button className="w-full" onClick={() => {
              setIsOpen(false);
              setTimeout(() => {
                const element = document.getElementById("contact");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }, 300);
            }} data-testid="button-book-consult">
              Book a Consult
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
