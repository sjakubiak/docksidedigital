import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Track authentication failures to prevent IP blocking
let authFailureCount = 0;
const MAX_AUTH_FAILURES = 2;

interface NeoCredentials {
  user: string;
  password: string;
  fromEmail: string;
}

function getNeoCredentials(): NeoCredentials {
  const user = process.env.NEO_SMTP_USER;
  const password = process.env.NEO_SMTP_PASSWORD;
  const fromEmail = process.env.NEO_SMTP_FROM || user || 'sjakubiak@docksidedigital.ca';

  if (!user || !password) {
    throw new Error('Neo SMTP credentials not configured. Please set NEO_SMTP_USER and NEO_SMTP_PASSWORD secrets.');
  }

  // Neo requires FULL email address as username (per their documentation)
  // Log redacted credentials for debugging
  const maskedUser = user.substring(0, user.length - 3) + '***';
  const maskedPassword = '***' + password.substring(password.length - 3);
  console.log(`Neo SMTP configured: ${maskedUser} (password: ${maskedPassword})`);

  return { user, password, fromEmail };
}

function createNeoTransport(): Transporter {
  const { user, password } = getNeoCredentials();

  // Use port 465 with SSL/TLS
  const transport = nodemailer.createTransport({
    host: 'smtp0001.neo.space',
    port: 465,
    secure: true, // SSL/TLS for port 465
    auth: {
      user,
      pass: password,
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
    logger: true,  // Enable logging
    debug: true,   // Enable debug mode
  });

  return transport;
}

async function sendEmailWithRetry(
  transporter: Transporter,
  mailOptions: any,
  emailType: string
): Promise<{ success: boolean; messageId?: string }> {
  // Check if we've exceeded auth failure limit
  if (authFailureCount >= MAX_AUTH_FAILURES) {
    throw new Error(
      `Email sending blocked after ${MAX_AUTH_FAILURES} authentication failures. ` +
      'Please verify your Neo SMTP credentials and contact Neo support at hello@neo.space to unblock your IP.'
    );
  }

  try {
    console.log(`Sending ${emailType} email from:`, mailOptions.from, 'to:', mailOptions.to);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`${emailType} email sent successfully:`, {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    // Reset auth failure count on success
    authFailureCount = 0;

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    const errorCode = error.responseCode || error.code;
    
    console.error(`Error sending ${emailType} email:`, {
      code: errorCode,
      message: error.message,
      command: error.command,
    });

    // Handle authentication failures - DO NOT RETRY to avoid IP blocking
    if (errorCode === 535 || error.message?.includes('authentication') || error.message?.includes('Invalid login')) {
      authFailureCount++;
      console.error(`Authentication failure ${authFailureCount}/${MAX_AUTH_FAILURES}`);
      
      if (authFailureCount >= MAX_AUTH_FAILURES) {
        throw new Error(
          'Multiple authentication failures detected. Email sending blocked to prevent IP blocking. ' +
          'Please verify your Neo SMTP credentials are correct and contact Neo support at hello@neo.space.'
        );
      }
      
      throw new Error('SMTP authentication failed. Please verify your Neo email credentials.');
    }

    // Retry transient errors once with backoff
    if (errorCode === 421 || errorCode === 450 || errorCode === 451 || errorCode === 452) {
      console.log(`Transient error (${errorCode}), retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`${emailType} email sent successfully on retry:`, info.messageId);
        authFailureCount = 0;
        return { success: true, messageId: info.messageId };
      } catch (retryError: any) {
        console.error(`Retry failed:`, retryError.message);
        throw retryError;
      }
    }

    throw error;
  }
}

export async function sendIntakeEmail(formData: any, summary: string) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  const { fromEmail } = getNeoCredentials();
  
  const transporter = createNeoTransport();
  
  const mailOptions = {
    from: `Dockside Digital <${fromEmail}>`,
    to: ownerEmail,
    subject: `New Intake Questionnaire from ${formData.contactName || formData.businessName || 'Potential Client'}`,
    html: `
      <h2>New Client Intake Questionnaire Received</h2>
      <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">
${summary}
      </pre>
    `,
  };

  return sendEmailWithRetry(transporter, mailOptions, 'intake');
}

export async function sendOrderEmail(formData: any) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  const { fromEmail } = getNeoCredentials();
  
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

  const transporter = createNeoTransport();
  
  const mailOptions = {
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
  };

  return sendEmailWithRetry(transporter, mailOptions, 'order');
}
