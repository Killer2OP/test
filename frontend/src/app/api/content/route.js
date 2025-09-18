import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/content/public`
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    
    const response = await axios.post(
      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/content`,
      body,
      authHeader ? { headers: { Authorization: authHeader } } : undefined
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: error.response?.status || 500 }
    );
  }
}