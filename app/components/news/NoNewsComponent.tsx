
interface NoNewsComponentProps  {
  t: (key: string) => string;
}

export default function NoNewsComponent( {t}: NoNewsComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-700">
      <h1 className="text-2xl font-bold">{t("noNewsFound")}</h1>
      <p className="mt-2 text-lg">
        {t("noNewsFoundText")}
      </p>
    </div>
  );
}