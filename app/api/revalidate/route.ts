// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const locales = ['en', 'nl', 'fr']; // Define the locales you support
const defaultPaths = ['/']; // Define the default paths to revalidate

export async function POST(request: Request) {
  // Secure the revalidation with a secret key from the webhook
  const secret = request.headers.get('x-secret');
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate each locale-specific version of the default paths
    await Promise.all(
      defaultPaths.flatMap((path) =>
        locales.map(async (locale) => {
          const localizedPath = `/${locale}${path === '/' ? '' : path}`; // Generate the localized path
          console.log(`Revalidating: ${localizedPath}`);
          // Revalidate the actual page path, not the API route
          revalidatePath(localizedPath);
        })
      )
    );

    const response = NextResponse.json({ revalidated: true });
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
