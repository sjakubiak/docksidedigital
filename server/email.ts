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
  return {apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email};
}

async function getUncachableResendClient() {
  const { apiKey } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: connectionSettings.settings.from_email
  };
}

export async function sendIntakeEmail(formData: any, summary: string) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@gmail.com';
  
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: `New Intake Questionnaire from ${formData.contactName || formData.businessName || 'Potential Client'}`,
      html: `
        <h2>New Client Intake Questionnaire Received</h2>
        <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">
${summary}
        </pre>
      `,
    });

    if (error) {
      console.error('Failed to send intake email:', error);
      throw error;
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending intake email:', error);
    throw error;
  }
}

export async function sendOrderEmail(formData: any) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@gmail.com';
  
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
    
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
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

    if (error) {
      console.error('Failed to send order email:', error);
      throw error;
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
}
