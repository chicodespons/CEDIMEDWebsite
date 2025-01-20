import { setRequestLocale } from "next-intl/server";

type Params = {
    locale: string | string[];
  };

export default async function PrivacyPolicy({
    params,
  }: {
    params: Params;
  }) {
    const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
    setRequestLocale(locale);
      return (
        <div>
          Privacy Policy text
        </div>
      );
    }