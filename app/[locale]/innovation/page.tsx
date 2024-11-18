
import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  params : {
    locale: string
  }
};

export default async function Innovation({ params: { locale }}: Params) {
  setRequestLocale(locale);
    return (
      <div>
        <PijlerText locale={locale} slug={"innovation"} />
      </div>
    );
  }