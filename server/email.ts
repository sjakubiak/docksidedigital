import Mailgun from 'mailgun.js';
import formData from 'form-data';

interface MailgunCredentials {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

function getMailgunCredentials(): MailgunCredentials {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const fromEmail = process.env.MAILGUN_FROM_EMAIL || 'info@docksidedigital.ca';

  if (!apiKey || !domain) {
    throw new Error('Mailgun credentials not configured. Please set MAILGUN_API_KEY and MAILGUN_DOMAIN secrets.');
  }

  // Log redacted API key for debugging
  const maskedKey = apiKey.substring(0, 8) + '***';
  console.log(`Mailgun configured: Domain=${domain}, API Key=${maskedKey}, From=${fromEmail}`);

  return { apiKey, domain, fromEmail };
}

function createMailgunClient() {
  const { apiKey, domain } = getMailgunCredentials();
  
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: apiKey,
  });

  return { mg, domain };
}

export async function sendIntakeEmail(formData: any, summary: string) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@gmail.com';
  const { fromEmail } = getMailgunCredentials();
  const { mg, domain } = createMailgunClient();

  try {
    console.log(`Sending intake email from: ${fromEmail} to: ${ownerEmail}`);

    const result = await mg.messages.create(domain, {
      from: `Dockside Digital <${fromEmail}>`,
      to: [ownerEmail],
      subject: `New Intake Questionnaire from ${formData.contactName || formData.businessName || 'Potential Client'}`,
      text: `New Client Intake Questionnaire Received\n\n${summary}`,
      html: `
        <h2>New Client Intake Questionnaire Received</h2>
        <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">
${summary}
        </pre>
      `,
    });

    console.log('Intake email sent successfully:', result.id);
    return { success: true, messageId: result.id };
  } catch (error: any) {
    console.error('Error sending intake email:', {
      message: error.message,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
}

export async function sendOrderEmail(formData: any) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@gmail.com';
  const { fromEmail } = getMailgunCredentials();
  const { mg, domain } = createMailgunClient();
  
  const projectTypeMap: Record<string, string> = {
    landing: 'Landing Page Sprint',
    website: 'Business Website',
    mvp: 'MVP Web App'
  };

  const carePlanMap: Record<string, string> = {
    none: 'None',
    basic: 'Basic ($149/mo)',
    standard: 'Standard ($349/mo)',
    pro: 'Pro ($799/mo)'
  };

  try {
    console.log(`Sending order email from: ${fromEmail} to: ${ownerEmail}`);

    const result = await mg.messages.create(domain, {
      from: `Dockside Digital <${fromEmail}>`,
      to: [ownerEmail],
      subject: `New Order from ${formData.name}`,
      text: `
New Order Received

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}
- Company: ${formData.company || 'Not provided'}

Project Details:
- Project Type: ${projectTypeMap[formData.projectType] || formData.projectType}
- Care Plan: ${carePlanMap[formData.carePlan] || formData.carePlan}
- Description: ${formData.description || 'Not provided'}
- Start Date: ${formData.startDate || 'Not specified'}
- Deadline: ${formData.deadline || 'Not specified'}
      `,
      html: `
        <h2>New Order Received</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Project Details</h3>
          <p><strong>Project Type:</strong> ${projectTypeMap[formData.projectType] || formData.projectType}</p>
          <p><strong>Care Plan:</strong> ${carePlanMap[formData.carePlan] || formData.carePlan}</p>
          <p><strong>Description:</strong></p>
          <p>${formData.description || 'Not provided'}</p>
          <p><strong>Start Date:</strong> ${formData.startDate || 'Not specified'}</p>
          <p><strong>Deadline:</strong> ${formData.deadline || 'Not specified'}</p>
        </div>
      `,
    });

    console.log('Order email sent successfully:', result.id);
    return { success: true, messageId: result.id };
  } catch (error: any) {
    console.error('Error sending order email:', {
      message: error.message,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
}
