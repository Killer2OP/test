import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, ctx) {
  // In recent Next.js versions, params may be a Promise in route handlers
  const { section, page } = await ctx.params;
  
  try {
    // Using the public endpoint that doesn't require authentication
    const response = await axios.get(
      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/content/${section}/${page}`
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    // Return backend error status (404 when not found) without noisy logs
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: error.response?.status || 500 }
    );
  }
}