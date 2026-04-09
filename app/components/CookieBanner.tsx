"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../lib/storageHelper";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CookieBanner({ locale }: { locale: string }) {
  const [cookieConsent, setCookieConsent] = useState<boolean | null | undefined>(undefined);

  const t = useTranslations();

  useEffect(() => {
    setCookieConsent(getLocalStorage("cookie_consent", null));
  }, []);

  useEffect(() => {
    if (cookieConsent === undefined || cookieConsent === null) return;

    setLocalStorage("cookie_consent", cookieConsent);

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  if (cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-uzGray text-white z-50 py-4 px-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <p className="text-sm sm:text-base">
          {t("cookieBannerText")}{" "}
          <Link
            href={`/${locale}/privacy-policy`}
            className="underline font-bold hover:text-uzGreen"
          >
            {t("privacyPolicy")}
          </Link>
          .
        </p>

        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm"
            onClick={() => setCookieConsent(false)}
          >
            {t("decline")}
          </button>
          <button
            className="px-4 py-2 bg-uzGreen text-white font-bold rounded hover:bg-uzGray transition duration-300 text-sm"
            onClick={() => setCookieConsent(true)}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}