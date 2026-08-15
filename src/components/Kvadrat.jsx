import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { kvadratData } from "../data/kvadratData";
import { kvadratOverview } from "../data/kvadratOverview";

function Kvadrat() {
  const { t } = useLanguage();
  const Icon = icons.kvadrat;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.kvadrat.title")}
      subtitle={t("pages.kvadrat.subtitle")}
      overview={kvadratOverview}
      faqItems={kvadratData}
    />
  );
}

export default Kvadrat;
