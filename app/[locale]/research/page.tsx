import PijlerText from "../../components/PijlerText";
import { setRequestLocale } from "next-intl/server";

type Params = {
  params : {
    locale: string
  }
};

export default function Research({ params: { locale }}: Params) {
  setRequestLocale(locale);
    return (
      <div>
        <PijlerText locale={locale} slug={"research"} />
      </div>
    );
  }