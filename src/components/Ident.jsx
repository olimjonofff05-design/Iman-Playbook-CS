import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { identData } from "../data/identData";
import { identOverview } from "../data/identOverview";

function Ident() {
  const { t } = useLanguage();
  const Icon = icons.ident;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.ident.title")}
      subtitle={t("pages.ident.subtitle")}
      overview={identOverview}
      faqItems={identData}
    />
  );
}

export default Ident;
