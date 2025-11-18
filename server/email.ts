import nodemailer from 'nodemailer';

// Create SMTP transporter using Neo mail server
function createTransporter() {
  const smtpUser = process.env.SMTP_USER || 'sjakubiak@docksidedigital.ca';
  
  return nodemailer.createTransport({
    host: 'smtp0001.neo.space',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export async function sendIntakeEmail(formData: any, summary: string) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  const fromEmail = 'sjakubiak@docksidedigital.ca';
  
  try {
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Dockside Digital" <${fromEmail}>`,
      to: ownerEmail,
      subject: `New Intake Questionnaire from ${formData.contactName || formData.businessName || 'Potential Client'}`,
      html: `
        <h2>New Client Intake Questionnaire Received</h2>
        <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">
${summary}
        </pre>
      `,
    });

    console.log('Intake email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending intake email:', error);
    throw error;
  }
}

export async function sendOrderEmail(formData: any) {
  const ownerEmail = process.env.OWNER_EMAIL || 'sjakubiak@docksidedigital.ca';
  const fromEmail = 'sjakubiak@docksidedigital.ca';
  
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
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Dockside Digital" <${fromEmail}>`,
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

    console.log('Order email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
}
