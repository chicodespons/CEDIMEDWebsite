// app/api/revalidate/route.ts
import { NextResponse } from 'next/server';

const coolifyToken = process.env.COOLIFY_TOKEN; // Store your token in an environment variable for security

export async function POST(request: Request) {
  // Secure the webhook using a secret token
  const secret = request.headers.get('x-secret');
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const response = await fetch(
      process.env.COOLIFY_URL,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${coolifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      throw new Error(`DigitalOcean API responded with status ${response.status}`);
    }

    const jsonResponse = await response.json();
    return NextResponse.json({ message: 'Deployment triggered successfully', data: jsonResponse });
  } catch (error) {
    console.error('Error triggering deployment:', error);
    return NextResponse.json({ message: 'Error triggering deployment', error: error.message }, { status: 500 });
  }
}
