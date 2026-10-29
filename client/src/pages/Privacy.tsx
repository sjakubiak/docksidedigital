import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logo from "@assets/dockside-logo.png";

export default function Privacy() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: November 2025</p>

          <h2>Introduction</h2>
          <p>
            Dockside Digital (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Fill out our intake questionnaire</li>
            <li>Place an order for our services</li>
            <li>Contact us via email or phone</li>
            <li>Subscribe to our newsletter or updates</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name and contact information (email, phone number)</li>
            <li>Business information (company name, industry)</li>
            <li>Project details and requirements</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device, including:
          </p>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website or search terms</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your orders and manage our relationship with you</li>
            <li>Send you technical notices, updates, and administrative messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve our website</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> We use trusted third-party services for payment processing and email communications. These providers have access to your information only to perform services on our behalf.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2>Your Rights (Canadian Privacy Law)</h2>
          <p>
            Under Canadian privacy law, you have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information (subject to legal obligations)</li>
            <li>Object to our processing of your information</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>Meta Pixel</h2>
          <p>
            We use the Meta (Facebook) Pixel to measure ad performance. You can manage or opt out of personalized ads through your Facebook ad settings.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
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
