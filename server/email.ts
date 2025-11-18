import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail
  };
}

export async function sendIntakeEmail(formData: any, summary: string) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    console.log('Sending intake email from:', fromEmail, 'to:', ownerEmail);
    
    const result = await client.emails.send({
      from: `Dockside Digital <${fromEmail}>`,
      to: ownerEmail,
      subject: `New Intake Questionnaire from ${formData.contactName || formData.businessName || 'Potential Client'}`,
      html: `
        <h2>New Client Intake Questionnaire Received</h2>
        <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">
${summary}
        </pre>
      `,
    });

    console.log('Resend API response:', JSON.stringify(result, null, 2));
    console.log('Intake email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending intake email:', error);
    throw error;
  }
}

export async function sendOrderEmail(formData: any) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  
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
    const { client, fromEmail } = await getUncachableResendClient();
    
    const result = await client.emails.send({
      from: `Dockside Digital <${fromEmail}>`,
      to: ownerEmail,
      subject: `New Order from ${formData.name}`,
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

    console.log('Order email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
}
