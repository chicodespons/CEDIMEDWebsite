import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "../../app/components/Hero";
import CardSection from "../../app/components/CardSection";
import NieuwsSection from "../components/news/NieuwsSection";
import ReviewsSection from "../../app/components/ReviewSection";
import LogoBanner from "../../app/components/LogoBanner";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(); // Fetch translations for the current locale

  return (
    <div>
      <Hero t={t} locale={locale} />
      <CardSection locale={locale} />
      <NieuwsSection t={t} locale={locale} />
      <ReviewsSection />
      <LogoBanner />
    </div>
  );
}
