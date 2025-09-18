import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure environment variables are loaded (only in development)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    require('dotenv').config({ path: '.env.local' });
  } catch (error) {
    console.log('dotenv not available, using system environment variables');
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: firstName, lastName, email, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = {
      from: process.env.SMTP_USER, // Use authenticated email as sender
      replyTo: email, // Set user's email as reply-to
      to: "marketingshivananda@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    // Check if we're in development mode and not forcing email sending
    const isDevelopment = process.env.NODE_ENV === "development" && process.env.FORCE_SEND_EMAIL !== "true";

    if (isDevelopment) {
      // In development, just log the email content
      console.log("==========================================");
      // console.log("📧 Email would be sent in production mode");
      console.log("📧 Email send.");
      console.log("==========================================");
      // console.log("To:", emailContent.to);
      // console.log("From:", emailContent.from);
      // console.log("Subject:", emailContent.subject);
      // console.log("Message:", emailContent.text);
      // console.log("==========================================");
    } else {
      // In production, actually send the email
      // Log SMTP configuration (without password)
      console.log("SMTP Configuration:");
      console.log("Host:", process.env.SMTP_HOST);
      console.log("Port:", process.env.SMTP_PORT);
      console.log("Secure:", process.env.SMTP_SECURE);
      console.log("User:", process.env.SMTP_USER);
      console.log("NODE_ENV:", process.env.NODE_ENV);
      console.log("FORCE_SEND_EMAIL:", process.env.FORCE_SEND_EMAIL);

      // Check if environment variables are properly loaded
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("Missing required environment variables!");
        console.error("SMTP_HOST:", !!process.env.SMTP_HOST);
        console.error("SMTP_USER:", !!process.env.SMTP_USER);
        console.error("SMTP_PASS:", !!process.env.SMTP_PASS);
        console.error("Available env vars:", Object.keys(process.env).filter(key => key.includes('SMTP')));

        return NextResponse.json(
          {
            success: false,
            message: "Server configuration error: Missing email configuration",
            error: "SMTP environment variables not configured",
            debug: process.env.NODE_ENV === "development" ? {
              hasHost: !!process.env.SMTP_HOST,
              hasUser: !!process.env.SMTP_USER,
              hasPass: !!process.env.SMTP_PASS,
              nodeEnv: process.env.NODE_ENV
            } : undefined
          },
          { status: 500 }
        );
      }

      // Create transporter with detailed configuration
      const transportConfig = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // Debug options
        debug: true,
        logger: true,
        // TLS options
        tls: {
          rejectUnauthorized: false
        }
      };

      const transporter = nodemailer.createTransport(transportConfig);

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log("SMTP connection verified successfully");
      } catch (verifyError: any) {
        console.error("SMTP connection verification failed:", verifyError);
        console.error("Verify error details:", {
          message: verifyError.message,
          code: verifyError.code,
          command: verifyError.command,
          response: verifyError.response
        });

        return NextResponse.json(
          {
            success: false,
            message: "Email service connection failed",
            error: `SMTP verification failed: ${verifyError.message || 'Unknown error'}`,
            errorCode: verifyError.code,
            debug: process.env.NODE_ENV === "development" ? {
              host: process.env.SMTP_HOST,
              port: process.env.SMTP_PORT,
              secure: process.env.SMTP_SECURE,
              user: process.env.SMTP_USER
            } : undefined
          },
          { status: 500 }
        );
      }

      // Send the email
      console.log("Sending email to:", emailContent.to);
      const info = await transporter.sendMail(emailContent);
      console.log("Email sent successfully:", info.messageId);
    }

    return NextResponse.json({
      success: true,
      message: isDevelopment
        ? "Email logged successfully (development mode)"
        : "Email sent successfully!",
    });
  }
  // In the catch block, add more detailed logging
  catch (error: any) {
    console.error("Email handling error details:", error);
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Error response:", error.response);

    // Return more detailed error information
    return NextResponse.json(
      {
        success: false,
        message: "Error processing your request",
        error: error.message,
        errorCode: error.code,
        errorName: error.name,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
