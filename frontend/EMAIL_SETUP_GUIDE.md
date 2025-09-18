# Email Setup Guide for Contact Form

This guide explains how to set up the email functionality for the contact form on your website.

## Overview

The contact form on your website is configured to send emails to `marketingshivananda@gmail.com` when users submit the form. For this to work in production, you need to configure SMTP settings.

## SMTP Configuration

### 1. Create Environment Variables

You need to set the following environment variables in your production environment:

- `SMTP_HOST`: Your SMTP server hostname (e.g., smtp.gmail.com, smtp.office365.com)
- `SMTP_PORT`: Your SMTP server port (usually 587 for TLS or 465 for SSL)
- `SMTP_SECURE`: Whether to use a secure connection (true for SSL, false for TLS/STARTTLS)
- `SMTP_USER`: Your SMTP username/email (usually your email address)
- `SMTP_PASS`: Your SMTP password or app-specific password

### 2. Gmail Setup (Recommended)

If you're using Gmail, follow these steps:

1. Create a Gmail account or use an existing one
2. Enable 2-Step Verification: 
   - Go to your Google Account > Security
   - Enable 2-Step Verification
3. Create an App Password:
   - Go to your Google Account > Security
   - Under "Signing in to Google," select "App passwords"
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "Website Contact Form")
   - Click "Generate"
   - Use the generated 16-character password as your `SMTP_PASS`

4. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-gmail-address@gmail.com
   SMTP_PASS=your-app-password
   ```

### 3. Office 365 Setup

If you're using Office 365, use these settings:

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

### 4. Custom Domain Email

If you have a custom domain email with a hosting provider, check their documentation for SMTP settings.

## Setting Environment Variables

### Vercel Deployment

If you're deploying on Vercel:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" > "Environment Variables"
3. Add each of the SMTP variables mentioned above
4. Click "Save"
5. Redeploy your application

### Other Hosting Providers

Consult your hosting provider's documentation on how to set environment variables.

## Testing

After setting up the environment variables:

1. Deploy your application
2. Go to the Contact page
3. Fill out and submit the form
4. Check if the email is received at marketingshivananda@gmail.com
5. If not, check the server logs for error messages

## Troubleshooting

If emails are not being received:

1. Check if the SMTP credentials are correct
2. Verify that the SMTP server allows sending from your hosting provider
3. Check if there are any firewall restrictions
4. For Gmail, make sure you're using an App Password if 2-Step Verification is enabled
5. Check the server logs for detailed error messages

## Support

If you continue to have issues, please contact the developer with the error messages from the server logs.
