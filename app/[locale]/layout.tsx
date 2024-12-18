import type { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "../../i18n/routing";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";

// Define the types for layout props
interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string }; // Expecting locale to be present here
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export const metadata: Metadata = {
  title: {
    default: "CEDIMED Brussels",
    template: "%s - CEDIMED Brussels"
  }, 
  description: "Shaping the Future of Emergency and Disaster Medicine: Uniting Practice, Education, Research, and Innovation.",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const {locale} = params;
  setRequestLocale(locale)

  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          {/* Wrapping content in a Flexbox container */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar at the top */}
            <Navbar locale={locale} />

            {/* Main content (children) grows to fill available space */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Footer sticks to the bottom */}
            <Footer t={t} locale={locale}/>  {/* Pass messages to Footer */}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
