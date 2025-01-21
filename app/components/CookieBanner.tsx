"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../lib/storageHelper";
import Link from "next/link";

// CookieBanner component that displays a banner for cookie consent.
export default function CookieBanner({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage and Google Analytics consent status when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
    }

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-uzGray text-white z-50 py-4 px-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Cookie Banner Text */}
        <p className="text-sm sm:text-base">
          This site uses cookies to enhance your browsing experience. Learn more
          in our{" "}
          <Link
            href={`/${locale}/privacy-policy`}
            className="underline font-bold hover:text-uzGreen"
          >
            {t("privacyPolicy")}
          </Link>
          .
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm"
            onClick={() => setCookieConsent(false)}
          >
            Decline
          </button>
          <button
            className="px-4 py-2 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm"
            onClick={() => setCookieConsent(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
