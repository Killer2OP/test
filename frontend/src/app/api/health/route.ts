import { NextResponse } from "next/server";

export async function GET() {
  try {
    const healthInfo = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      nextVersion: process.env.npm_package_version || "unknown",
      emailConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      services: {
        api: "operational",
        email: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ? "configured" : "not_configured"
      }
    };

    return NextResponse.json(healthInfo);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
