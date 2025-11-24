import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Mail, Phone, Building, Calendar } from "lucide-react";
import type { IntakeSubmission } from "@shared/schema";

export default function ReviewIntake() {
  const { data, isLoading } = useQuery<{ ok: boolean; submissions: IntakeSubmission[] }>({
    queryKey: ['/api/intake-submissions'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">Loading submissions...</div>
      </div>
    );
  }

  const submissions = data?.submissions || [];

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Intake Submissions</h1>
        <p className="text-muted-foreground">Review all client intake questionnaire submissions</p>
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
                <div className="flex items-start justify-between">
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
