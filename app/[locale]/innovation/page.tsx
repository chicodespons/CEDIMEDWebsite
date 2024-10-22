
import PijlerText from "@/app/components/PijlerText";

export default async function Innovation({ params: { locale}}: { params: { locale: string} }) {
  
    return (
      <div>
        <PijlerText locale={locale} slug={"innovation"} />
      </div>
    );
  }