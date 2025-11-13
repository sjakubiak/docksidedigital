import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logo from "@assets/dockside-logo.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <img src={logo} alt="Dockside Digital" className="h-12 w-auto mb-6" />

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: November 2025</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the services provided by Dockside Digital (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access our services.
          </p>

          <h2>Services</h2>
          <p>
            Dockside Digital provides web design, development, and related services including:
          </p>
          <ul>
            <li>Landing page design and development</li>
            <li>Business website creation</li>
            <li>MVP web application development</li>
            <li>Ongoing care and maintenance plans</li>
          </ul>

          <h2>Project Scope and Proposals</h2>
          <p>
            All projects begin with an intake questionnaire and consultation. We will provide a detailed proposal outlining:
          </p>
          <ul>
            <li>Scope of work</li>
            <li>Deliverables</li>
            <li>Timeline and milestones</li>
            <li>Pricing and payment terms</li>
            <li>Number of revision rounds included</li>
          </ul>
          <p>
            Work begins only after you accept the proposal and provide the required deposit.
          </p>

          <h2>Payment Terms</h2>
          <h3>Project Payments</h3>
          <ul>
            <li><strong>Deposit:</strong> 50% of the total project cost is due upon acceptance of the proposal</li>
            <li><strong>Final Payment:</strong> Remaining 50% is due upon project completion and before final delivery</li>
            <li><strong>Paid-in-Full Discount:</strong> 10% discount available for full upfront payment</li>
          </ul>

          <h3>Care Plans</h3>
          <p>
            Care plan subscriptions are billed monthly and may be cancelled with 30 days written notice.
          </p>

          <h3>Late Payments</h3>
          <p>
            Payments not received within 15 days of the due date may result in project suspension or termination.
          </p>

          <h2>Client Responsibilities</h2>
          <p>
            You agree to:
          </p>
          <ul>
            <li>Provide timely feedback and approvals</li>
            <li>Supply necessary content, images, and materials</li>
            <li>Respond to requests for information within agreed timeframes</li>
            <li>Review and approve deliverables within specified revision periods</li>
          </ul>
          <p>
            Delays caused by client inaction may result in timeline adjustments and potential additional fees.
          </p>

          <h2>Revisions and Changes</h2>
          <p>
            Each project tier includes a specified number of revision rounds:
          </p>
          <ul>
            <li>Landing Page Sprint: 2 rounds</li>
            <li>Business Website: 2-3 rounds</li>
            <li>MVP Web App: As specified in proposal</li>
          </ul>
          <p>
            Additional revisions beyond the included rounds or changes to the approved scope may incur additional charges.
          </p>

          <h2>Intellectual Property</h2>
          <h3>Client Content</h3>
          <p>
            You retain all rights to content you provide (text, images, logos, etc.).
          </p>

          <h3>Deliverables</h3>
          <p>
            Upon receipt of final payment, you own the final deliverables. We retain the right to:
          </p>
          <ul>
            <li>Display the work in our portfolio</li>
            <li>Use the project as a case study</li>
            <li>Reference you as a client (unless otherwise agreed)</li>
          </ul>

          <h3>Code and Templates</h3>
          <p>
            Custom code developed for your project is yours. However, we retain rights to any reusable components, templates, or frameworks we&apos;ve created for general use.
          </p>

          <h2>Warranties and Disclaimers</h2>
          <p>
            We warrant that:
          </p>
          <ul>
            <li>Services will be performed in a professional manner</li>
            <li>Deliverables will function as specified in the proposal</li>
            <li>We have the right to provide the services</li>
          </ul>
          <p>
            EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Our total liability for any claims arising from our services shall not exceed the total amount paid by you for the specific project in question.
          </p>

          <h2>Termination</h2>
          <h3>By Client</h3>
          <p>
            You may terminate a project with written notice. You will be charged for work completed to date, and deposits are non-refundable.
          </p>

          <h3>By Company</h3>
          <p>
            We may terminate if:
          </p>
          <ul>
            <li>Payments are not received as agreed</li>
            <li>You fail to meet your responsibilities</li>
            <li>The working relationship becomes untenable</li>
          </ul>

          <h2>Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any proprietary information shared during the project, except as required by law or with written permission.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of Nova Scotia, Canada. Any disputes shall be resolved in the courts of Halifax, Nova Scotia.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified Terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:sjakubiak@gmail.com">sjakubiak@gmail.com</a><br />
            Location: Halifax, Nova Scotia, Canada
          </p>
        </article>
      </div>
    </div>
  );
}
