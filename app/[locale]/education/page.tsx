import PijlerText from "@/app/components/PijlerText";

export default async function Education({ params: { locale}}: { params: { locale: string} }) {
  
    return (
      <div>
        <PijlerText locale={locale} slug={"education"} />
      </div>
    );
  }