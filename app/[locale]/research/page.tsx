import PijlerText from "@/app/components/PijlerText";

export default async function Research({ params: { locale}}: { params: { locale: string} }) {
  
    return (
      <div>
        <PijlerText locale={locale} slug={"research"} />
      </div>
    );
  }