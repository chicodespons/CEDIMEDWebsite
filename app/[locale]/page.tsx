import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '../../app/components/Hero';
import CardSection from '../../app/components/CardSection';
import NieuwsSection from '../../app/components/NieuwsSection';
import ReviewsSection from '../../app/components/ReviewSection';
import LogoBanner from '../../app/components/LogoBanner';

type HomePageProps = {
  params : {
    locale: string
  }
}

export default async function Home({ params: { locale }}: HomePageProps) {
  setRequestLocale(locale);
  const t = await getTranslations(); // Fetch translations for the current locale

  return (
    <div>
      <Hero t={t} locale={locale}/>
      <CardSection locale={locale}/>
      <NieuwsSection />
      <ReviewsSection />
      <LogoBanner />
    </div>
  );
}
