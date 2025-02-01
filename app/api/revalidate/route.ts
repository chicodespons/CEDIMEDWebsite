// app/api/revalidate/route.ts
import { NextResponse } from 'next/server';

// const appId = '573d137f-a7ae-4150-a581-c7800106d480'; // Replace with your DigitalOcean app ID
const coolifyToken = '510|tvoTvbC1VwFVTVnUHuye98cn62hlBIciir3bx7yKab2996c9'; // Store your token in an environment variable for security

export async function POST(request: Request) {
  // Secure the webhook using a secret token
  const secret = request.headers.get('x-secret');
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Trigger a rebuild on DigitalOcean using fetch
    const response = await fetch(
      `https://app.coolify.io/api/v1/deploy?uuid=mswo0c88k4040440o0800k0c&force=false`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${coolifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ force_build: true }),
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
