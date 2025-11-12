import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Database, Layout, Server, Zap, Shield, Sparkles } from "lucide-react";
import logo from "@assets/dockside-logo.png";

export default function Experience() {
  const technicalSkills = {
    "Frontend Development": [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "State Management",
      "Performance Optimization"
    ],
    "Backend Development": [
      "Node.js & Express",
      "RESTful APIs",
      "Database Design",
      "Authentication & Security",
      "Payment Integration",
      "Email Systems"
    ],
    "AI Integration": [
      "OpenAI & Claude APIs",
      "Chatbot Development",
      "Content Generation",
      "Document Processing",
      "Prompt Engineering",
      "AI Workflow Automation"
    ],
    "Architecture & DevOps": [
      "System Architecture",
      "Database Schema Design",
      "API Design",
      "Deployment & Hosting",
      "Performance Monitoring",
      "Version Control (Git)"
    ]
  };

  const architectureExpertise = [
    {
      icon: Layout,
      title: "Full-Stack Architecture",
      description: "Designed and built complete web applications from database schema to user interface, ensuring scalability and maintainability."
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Expertise in PostgreSQL, schema design, query optimization, and data modeling for business applications."
    },
    {
      icon: Server,
      title: "API Development",
      description: "Built robust RESTful APIs with proper authentication, validation, error handling, and documentation."
    },
    {
      icon: Sparkles,
      title: "AI Integration",
      description: "Integrated AI capabilities including chatbots, content generation, and intelligent automation using modern AI platforms."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Implemented secure authentication systems, payment processing integration, and data protection practices."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimized applications for speed and efficiency through code splitting, caching, and database indexing."
    },
    {
      icon: Code2,
      title: "Clean Code Practices",
      description: "Write maintainable, well-documented code following industry best practices and design patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <img src={logo} alt="Dockside Digital" className="h-16 w-auto mb-6" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Technical Experience
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Years of experience building and architecting web applications—from simple landing pages to complex full-stack systems.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Architecture & Development Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {architectureExpertise.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(technicalSkills).map(([category, skills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Development Approach
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Practical & Results-Focused</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I believe in building what works. No over-engineering, no unnecessary complexity—just clean, 
                      maintainable code that solves real business problems efficiently.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Full-Stack Capability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      From database schema design to responsive UI, I handle every layer of the stack. This means 
                      faster delivery, better integration, and consistent quality throughout your application.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Modern Best Practices</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I stay current with web development best practices—TypeScript for type safety, modern frameworks 
                      for performance, responsive design for all devices, and security-first implementation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Maritime Work Ethic</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Based in Halifax, I bring the same reliability and attention to detail that defines Atlantic Canada. 
                      Clear communication, realistic timelines, and quality work you can count on.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="text-center py-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to work together?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Let's discuss your project and see how I can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/intake">
                <Button size="lg" data-testid="button-intake">
                  Take the Intake Questionnaire
                </Button>
              </Link>
              <Link href="/order">
                <Button size="lg" variant="outline" data-testid="button-order">
                  Place an Order
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
