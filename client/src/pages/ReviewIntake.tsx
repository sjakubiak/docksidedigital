import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Mail, Phone, Building, Calendar, LogOut } from "lucide-react";
import type { IntakeSubmission } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

const ADMIN_TOKEN_KEY = "dockside_admin_token";

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/intake-submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        onLogin(token);
      } else {
        const data = await response.json();
        setError(data.error || "Invalid access token");
      }
    } catch (error) {
      setError("Failed to verify token");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Admin Access Required</CardTitle>
          <CardDescription>Enter your admin token to view submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Access Token</Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter admin token"
                required
                data-testid="input-admin-token"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" data-testid="text-error">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" data-testid="button-login">
              Access Review Page
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ReviewContent({ adminToken, onLogout }: { adminToken: string; onLogout: () => void }) {
  const { data, isLoading, error } = useQuery<{ ok: boolean; submissions: IntakeSubmission[] }>({
    queryKey: ['/api/intake-submissions'],
    queryFn: async () => {
      const response = await fetch('/api/intake-submissions', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          onLogout();
          throw new Error("Unauthorized");
        }
        throw new Error("Failed to fetch submissions");
      }
      
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-destructive">Failed to load submissions</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const submissions = data?.submissions || [];

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Intake Submissions</h1>
          <p className="text-muted-foreground">Review all client intake questionnaire submissions</p>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          data-testid="button-logout"
          className="shrink-0"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No submissions yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <Card key={submission.id} data-testid={`card-submission-${submission.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2" data-testid={`text-business-name-${submission.id}`}>
                      <Building className="w-5 h-5" />
                      {submission.businessName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Submitted {format(new Date(submission.createdAt), "PPpp")}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={submission.emailSent ? "default" : "destructive"}
                    data-testid={`badge-email-status-${submission.id}`}
                  >
                    {submission.emailSent ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Email Sent
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Email Failed
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Name:</span>
                        <span data-testid={`text-contact-name-${submission.id}`}>{submission.contactName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a 
                          href={`mailto:${submission.email}`}
                          className="text-primary hover:underline"
                          data-testid={`link-email-${submission.id}`}
                        >
                          {submission.email}
                        </a>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a 
                            href={`tel:${submission.phone}`}
                            className="text-primary hover:underline"
                            data-testid={`link-phone-${submission.id}`}
                          >
                            {submission.phone}
                          </a>
                        </div>
                      )}
                      {submission.website && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Website:</span>
                          <a 
                            href={submission.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                            data-testid={`link-website-${submission.id}`}
                          >
                            {submission.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      {submission.timeline && (
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 mt-0.5" />
                          <div>
                            <span className="font-medium">Timeline:</span> {submission.timeline}
                          </div>
                        </div>
                      )}
                      {submission.budget && (
                        <div className="flex items-start gap-2">
                          <span className="font-medium">Budget:</span>
                          <span>{submission.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {submission.projectGoals && (
                  <div>
                    <h3 className="font-semibold mb-2">Project Goals</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap" data-testid={`text-project-goals-${submission.id}`}>
                      {submission.projectGoals}
                    </p>
                  </div>
                )}

                {submission.features && (
                  <div>
                    <h3 className="font-semibold mb-2">Required Features</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.features}
                    </p>
                  </div>
                )}

                {submission.targetAudience && (
                  <div>
                    <h3 className="font-semibold mb-2">Target Audience</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.targetAudience}
                    </p>
                  </div>
                )}

                {submission.competitors && (
                  <div>
                    <h3 className="font-semibold mb-2">Competitors</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.competitors}
                    </p>
                  </div>
                )}

                {submission.brandGuidelines && (
                  <div>
                    <h3 className="font-semibold mb-2">Brand Guidelines</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.brandGuidelines}
                    </p>
                  </div>
                )}

                {submission.additionalInfo && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Information</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.additionalInfo}
                    </p>
                  </div>
                )}

                {submission.emailMessageId && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Email Message ID: {submission.emailMessageId}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewIntake() {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (savedToken) {
      setAdminToken(savedToken);
    }
  }, []);

  const handleLogin = (token: string) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdminToken(null);
    queryClient.invalidateQueries({ queryKey: ['/api/intake-submissions'] });
  };

  if (!adminToken) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <ReviewContent adminToken={adminToken} onLogout={handleLogout} />;
}
