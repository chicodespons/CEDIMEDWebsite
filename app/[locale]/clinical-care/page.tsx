import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: string | string[];
};

export default async function ClinicalCare({
  params,
}: {
  params: Params;
}) {
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params.locale || "nl"; // Default to 'nl'
  setRequestLocale(locale);
    return (
      <div>
        <PijlerText locale={locale} slug={"clinical-care"} titleBgColor='bg-vubBlue'/>
      </div>
    );
  }