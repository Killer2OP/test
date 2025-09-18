import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return environment information for debugging
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasSmtpHost: !!process.env.SMTP_HOST,
      hasSmtpUser: !!process.env.SMTP_USER,
      hasSmtpPass: !!process.env.SMTP_PASS,
      hasSmtpPort: !!process.env.SMTP_PORT,
      hasSmtpSecure: !!process.env.SMTP_SECURE,
      smtpHost: process.env.SMTP_HOST ? process.env.SMTP_HOST.substring(0, 10) + '...' : 'NOT_SET',
      smtpPort: process.env.SMTP_PORT || 'NOT_SET',
      smtpSecure: process.env.SMTP_SECURE || 'NOT_SET',
      smtpUser: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 10) + '...' : 'NOT_SET',
      availableSmtpVars: Object.keys(process.env).filter(key => key.includes('SMTP')),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: "Debug information retrieved",
      data: envInfo
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Debug endpoint error",
        error: error.message
      },
      { status: 500 }
    );
  }
}
