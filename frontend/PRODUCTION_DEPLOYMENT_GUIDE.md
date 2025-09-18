# Production Deployment Guide for Contact Form

## Current Issue
The contact form is returning a 500 Internal Server Error in production because environment variables are not configured.

## Solution Steps

### Step 1: Check Current Status
Visit this URL to see what environment variables are currently available:
```
https://shivanandamarketing.com/api/contact/debug
```

### Step 2: Deploy Updated Configuration
The `ecosystem.config.cjs` file has been updated with the required environment variables. Deploy this updated file to your production server.

### Step 3: Restart PM2 Application
On your production server, run:
```bash
pm2 restart Shivmanda
```

Or if you need to reload the configuration:
```bash
pm2 delete Shivmanda
pm2 start ecosystem.config.cjs
```

### Step 4: Verify Environment Variables
After restarting, check the debug endpoint again:
```
https://shivanandamarketing.com/api/contact/debug
```

You should see:
- `hasSmtpHost: true`
- `hasSmtpUser: true`
- `hasSmtpPass: true`
- `nodeEnv: "production"`

### Step 5: Test Contact Form
Try submitting the contact form at:
```
https://shivanandamarketing.com/Contact
```

## Alternative Setup Methods

### Method 1: Environment File on Server
Create a `.env.production` file on your server with:
```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=marketingshivananda@gmail.com
SMTP_PASS=nuhuchfkuzrtrrka
```

### Method 2: System Environment Variables
Set system environment variables on your server:
```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_SECURE=false
export SMTP_USER=marketingshivananda@gmail.com
export SMTP_PASS=nuhuchfkuzrtrrka
```

## Security Note
For better security, consider:
1. Using a dedicated email service like SendGrid or AWS SES
2. Storing sensitive credentials in a secure vault
3. Using environment-specific configuration files

## Troubleshooting

### If you still get 500 errors:
1. Check PM2 logs: `pm2 logs Shivmanda`
2. Check the debug endpoint for missing variables
3. Verify the Gmail app password is correct
4. Ensure the server can connect to smtp.gmail.com:587

### Common Issues:
- **Firewall**: Ensure port 587 is open for outbound connections
- **DNS**: Verify the server can resolve smtp.gmail.com
- **Credentials**: Double-check the Gmail app password
