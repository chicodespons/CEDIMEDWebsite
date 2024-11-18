import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  params : {
    locale: string
  }
};

export default async  function Education({ params: {locale}}: Params) {
  setRequestLocale(locale);  setRequestLocale(locale);
    return (
      <div>
        <PijlerText locale={locale} slug={"education"} />
      </div>
    );
  }