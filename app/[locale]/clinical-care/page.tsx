import PijlerText from "@/app/components/PijlerText";


export default async function ClinicalCare({ params: { locale}}: { params: { locale: string} }) {
  
    return (
      <div>
        <PijlerText locale={locale} slug={"clinical-care"} />
      </div>
    );
  }