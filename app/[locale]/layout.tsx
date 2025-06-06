import type { Metadata } from "next";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "../../i18n/routing";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Suspense } from "react";

// Define the types for layout props
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Expecting locale to be present here
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "CEDIMED Brussels",
    template: "%s - CEDIMED Brussels",
  },
  description:
    "Shaping the Future of Emergency and Disaster Medicine: Uniting Practice, Education, Research, and Innovation.",
  openGraph: {
    title: "CEDIMED Brussels",
    description:
      "Shaping the Future of Emergency and Disaster Medicine: Uniting Practice, Education, Research, and Innovation.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph-image.png`, // Use a relative path for images in the `public` folder
        width: 1200, // Ideal width for OG images
        height: 630, // Ideal height for OG images
        alt: "CEDIMED Brussels - Emergency and Disaster Medicine",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans">
        <Suspense>
          <GoogleAnalytics GA_MEASUREMENT_ID="G-MXEXQKJLKW" />
        </Suspense>

        <NextIntlClientProvider messages={messages}>
          {/* Wrapping content in a Flexbox container */}
          <div className="flex flex-col min-h-screen max-w-[1900px]">
            {/* Navbar at the top */}
            <Navbar locale={locale} />
            {/* Main content (children) grows to fill available space */}
            <main className="flex-grow ">
              {children}
              <CookieBanner locale={locale} />
            </main>
            {/* Footer sticks to the bottom */}
            <Footer t={t} locale={locale} /> {/* Pass messages to Footer */}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
