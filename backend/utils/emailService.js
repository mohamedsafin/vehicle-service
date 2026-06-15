import nodemailer from 'nodemailer';

/**
 * Sends a confirmation email to the user when they fill out the "Get Quote" form.
 *
 * @param {string} recipientEmail - Email of the customer
 * @param {Object} quoteDetails - Details of the saved Quote document
 * @param {Object} settings - Dynamic website settings
 */
export const sendQuoteConfirmationEmail = async (recipientEmail, quoteDetails, settings) => {
  const host = settings.smtpHost || process.env.SMTP_HOST;
  const port = settings.smtpPort || process.env.SMTP_PORT || 587;
  const user = settings.smtpUser || process.env.SMTP_USER;
  const pass = settings.smtpPass || process.env.SMTP_PASS;
  let from = process.env.EMAIL_FROM || settings.email || 'operations@haulierandservice.com';

  console.log('--- DEBUG SMTP CONFIG ---');
  console.log('settings:', { smtpHost: settings.smtpHost, smtpPort: settings.smtpPort, smtpUser: settings.smtpUser, smtpPass: settings.smtpPass });
  console.log('process.env:', { SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_USER: process.env.SMTP_USER, SMTP_PASS: process.env.SMTP_PASS });
  console.log('Resolved values:', { host, port, user, pass });
  console.log('-------------------------');

  let transporter;
  let isEthereal = false;

  // Check if credentials are set (either in settings or .env)
  const isCredentialsConfigured =
    user &&
    user !== 'your-email@gmail.com' &&
    user.trim() !== '' &&
    pass &&
    pass !== 'your-app-password' &&
    pass.trim() !== '';

  if (!isCredentialsConfigured) {
    console.warn('SMTP credentials not configured in backend Settings or .env. Falling back to Ethereal test account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      from = testAccount.user;
      isEthereal = true;
    } catch (etherealErr) {
      console.error('Failed to create Ethereal test account:', etherealErr.message);
      return false;
    }
  } else {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  const companyName = settings.companyName || 'Haulier & Service';
  const phone = settings.phone || '+91 98765 43210';
  const contactEmail = settings.email || 'operations@haulierandservice.com';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Quote Confirmation</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .header { background-color: #093f6d; color: #ffffff; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
          .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.8; }
          .content { padding: 30px; line-height: 1.6; }
          .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; }
          .summary { background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f97316; }
          .summary-title { font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-top: 0; margin-bottom: 12px; }
          .detail-row { display: flex; margin-bottom: 8px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; }
          .detail-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
          .detail-label { font-weight: 700; width: 140px; color: #475569; }
          .detail-value { flex: 1; color: #0f172a; }
          .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b; }
          .footer p { margin: 4px 0; }
          .footer a { color: #f97316; text-decoration: none; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${companyName} Dispatch</h1>
            <p>Quote Request Confirmation</p>
          </div>
          <div class="content">
            <p class="greeting">Hello ${quoteDetails.name},</p>
            <p>Thank you for your quote submission to <strong>${companyName}</strong>! We have received your request and our team is already reviewing the details.</p>
            
            <div class="summary">
              <div class="summary-title">Quote Details</div>
              <div class="detail-row">
                <div class="detail-label">Reference ID:</div>
                <div class="detail-value" style="font-family: monospace; font-weight: bold;">${quoteDetails._id}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Pickup Location:</div>
                <div class="detail-value">${quoteDetails.pickupLocation}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Drop Location:</div>
                <div class="detail-value">${quoteDetails.dropLocation}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Vehicle Type:</div>
                <div class="detail-value">${quoteDetails.vehicleType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Message:</div>
                <div class="detail-value">${quoteDetails.message || 'No additional specifications provided.'}</div>
              </div>
            </div>
            
            <p>Our operations team will contact you soon at <strong>${quoteDetails.phone}</strong> or by replying directly to this email to review rates and capacity.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
            <p>Need immediate help? Call us at <a href="tel:${phone}">${phone}</a> or email <a href="mailto:${contactEmail}">${contactEmail}</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${companyName} Operations" <${from}>`,
      to: recipientEmail,
      subject: `Quote Request Registered [Ref: ${quoteDetails._id}] - ${companyName}`,
      html: htmlContent,
    });

    console.log(`Confirmation email sent successfully to ${recipientEmail}`);
    if (isEthereal) {
      console.log(`Ethereal Test Mail Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return true;
  } catch (sendErr) {
    console.error('SMTP sendMail failed:', sendErr.message);
    return false;
  }
};
