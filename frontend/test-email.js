// Simple script to test email sending with Nodemailer
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('SMTP Secure:', process.env.SMTP_SECURE);

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP configuration. Please check your .env.local file.');
    return;
  }

  // Create transporter
  const transportConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
    tls: {
      rejectUnauthorized: false
    }
  };

  const transporter = nodemailer.createTransport(transportConfig);

  // Verify connection
  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return;
  }

  // Send test email
  try {
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'marketingshivananda@gmail.com',
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email to verify Nodemailer configuration.',
      html: '<p>This is a test email to verify Nodemailer configuration.</p>',
    });
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
}

testEmail().catch(console.error);
