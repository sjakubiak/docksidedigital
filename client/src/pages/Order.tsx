import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard } from "lucide-react";
import { SiStripe } from "react-icons/si";
import logo from "@assets/DocksideDigital_1762951646514.png";

export default function Order() {
  const { toast } = useToast();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    carePlan: "none",
    description: "",
    startDate: "",
    deadline: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the payment terms before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.name || !formData.projectType) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Wire up to actual API endpoint
    console.log("Order submitted", formData);
    toast({
      title: "Order received!",
      description: "We've received your order and will send you payment details shortly.",
    });
  };

  const getProjectPrice = () => {
    switch (formData.projectType) {
      case "landing": return "$1,500–$3,000";
      case "website": return "$3,000–$7,000";
      case "mvp": return "$8,000–$20,000+";
      default: return "Select a project type";
    }
  };

  const getCarePlanPrice = () => {
    switch (formData.carePlan) {
      case "basic": return "$149/mo";
      case "standard": return "$349/mo";
      case "pro": return "$799/mo";
      default: return "None";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <img src={logo} alt="Dockside Digital" className="h-16 w-auto" />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Place an Order
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to get started. We'll send you a secure payment link.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="John Doe"
                      required
                      data-testid="input-name"
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
                      required
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
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="Your Company Inc."
                      data-testid="input-company"
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
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => updateField("projectType", value)}>
                      <SelectTrigger id="projectType" data-testid="select-project-type">
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landing">Landing Page Sprint</SelectItem>
                        <SelectItem value="website">Business Website</SelectItem>
                        <SelectItem value="mvp">MVP Web App</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="carePlan">Care Plan Add-on</Label>
                    <Select value={formData.carePlan} onValueChange={(value) => updateField("carePlan", value)}>
                      <SelectTrigger id="carePlan" data-testid="select-care-plan">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="basic">Basic - $149/mo</SelectItem>
                        <SelectItem value="standard">Standard - $349/mo</SelectItem>
                        <SelectItem value="pro">Pro - $799/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Project Description / Goals</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      placeholder="Tell us about your project and what you want to achieve"
                      rows={4}
                      data-testid="input-description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Desired Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateField("startDate", e.target.value)}
                        data-testid="input-start-date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => updateField("deadline", e.target.value)}
                        data-testid="input-deadline"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      data-testid="checkbox-terms"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to 50% deposit, 50% on launch, or paid-in-full 10% discount.
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" data-testid="button-submit">
                Submit Order
              </Button>
            </form>
          </div>

          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Project Type</div>
                  <div className="font-semibold" data-testid="text-summary-project">
                    {formData.projectType ? formData.projectType.charAt(0).toUpperCase() + formData.projectType.slice(1) : "Not selected"}
                  </div>
                  <div className="text-lg font-bold text-primary" data-testid="text-summary-price">
                    {getProjectPrice()}
                  </div>
                </div>
                {formData.carePlan !== "none" && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Care Plan</div>
                    <div className="font-semibold">{formData.carePlan.charAt(0).toUpperCase() + formData.carePlan.slice(1)}</div>
                    <div className="text-lg font-bold text-primary">{getCarePlanPrice()}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SiStripe className="h-5 w-5" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  After submitting, you'll receive a secure Stripe payment link via email. We never store card information.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
