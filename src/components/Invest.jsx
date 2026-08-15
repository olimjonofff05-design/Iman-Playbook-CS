import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { investData } from "../data/investData";
import { investOverview } from "../data/investOverview";

function Invest() {
  const { t } = useLanguage();
  const Icon = icons.invest;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.invest.title")}
      subtitle={t("pages.invest.subtitle")}
      overview={investOverview}
      faqItems={investData}
    />
  );
}

export default Invest;
