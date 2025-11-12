import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, ArrowLeft, Send } from "lucide-react";
import logo from "@assets/DocksideDigital_transparent_x2_1762951830336.png";

export default function Intake() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    goals: "",
    pagesNeeded: "",
    examples: "",
    timeline: "",
    budget: "",
    mustHaves: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSummary = () => {
    return `
CLIENT INTAKE QUESTIONNAIRE

Business Information:
- Business Name: ${formData.businessName || "Not provided"}
- Contact Name: ${formData.contactName || "Not provided"}
- Email: ${formData.email || "Not provided"}
- Phone: ${formData.phone || "Not provided"}
- Current Website: ${formData.website || "None"}
- Industry: ${formData.industry || "Not provided"}

Project Details:
- Goals: ${formData.goals || "Not provided"}
- Pages/Features Needed: ${formData.pagesNeeded || "Not provided"}
- Examples You Like: ${formData.examples || "Not provided"}

Timeline & Budget:
- Timeline: ${formData.timeline || "Not provided"}
- Budget Range: ${formData.budget || "Not provided"}

Requirements:
- Must-Haves/Constraints: ${formData.mustHaves || "Not provided"}
    `.trim();
  };

  const copyToClipboard = () => {
    const summary = generateSummary();
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to clipboard!",
      description: "The summary has been copied. You can paste it anywhere.",
    });
  };

  const emailSummary = async () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please provide your email address before sending.",
        variant: "destructive",
      });
      return;
    }

    try {
      const summary = generateSummary();
      const response = await fetch('/api/intake-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, summary }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      toast({
        title: "Email sent!",
        description: "We've received your intake questionnaire and will be in touch soon.",
      });
    } catch (error) {
      console.error('Error sending intake email:', error);
      toast({
        title: "Error sending email",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <img src={logo} alt="Dockside Digital" className="h-16 w-auto" />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Client Intake Questionnaire
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and copy the summary to share with us, or send it directly via email.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    placeholder="Your Company Inc."
                    data-testid="input-business-name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    placeholder="John Doe"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="(902) 555-0100"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Current Website (if any)</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    placeholder="https://example.com"
                    data-testid="input-website"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    placeholder="e.g., Retail, Healthcare, Technology"
                    data-testid="input-industry"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="goals">Goals (traffic/leads/sales/branding)</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                    placeholder="What do you want to achieve with this project?"
                    rows={3}
                    data-testid="input-goals"
                  />
                </div>
                <div>
                  <Label htmlFor="pagesNeeded">Pages/Features Needed</Label>
                  <Textarea
                    id="pagesNeeded"
                    value={formData.pagesNeeded}
                    onChange={(e) => updateField("pagesNeeded", e.target.value)}
                    placeholder="List the pages or features you need"
                    rows={3}
                    data-testid="input-pages-needed"
                  />
                </div>
                <div>
                  <Label htmlFor="examples">Examples You Like (links)</Label>
                  <Textarea
                    id="examples"
                    value={formData.examples}
                    onChange={(e) => updateField("examples", e.target.value)}
                    placeholder="Share links to websites or apps you admire"
                    rows={3}
                    data-testid="input-examples"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline & Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    placeholder="e.g., ASAP, 2-4 weeks, flexible"
                    data-testid="input-timeline"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    placeholder="e.g., $3,000-$5,000"
                    data-testid="input-budget"
                  />
                </div>
                <div>
                  <Label htmlFor="mustHaves">Must-Haves / Constraints</Label>
                  <Textarea
                    id="mustHaves"
                    value={formData.mustHaves}
                    onChange={(e) => updateField("mustHaves", e.target.value)}
                    placeholder="Any specific requirements or limitations?"
                    rows={3}
                    data-testid="input-must-haves"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateSummary()}
                  readOnly
                  rows={20}
                  className="font-mono text-sm mb-4"
                  data-testid="text-summary"
                />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full"
                    data-testid="button-copy"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                  <Button
                    onClick={emailSummary}
                    className="w-full"
                    data-testid="button-email"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Email This to Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
