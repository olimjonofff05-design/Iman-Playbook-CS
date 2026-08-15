import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { bnplData } from "../data/bnplData";
import { bnplOverview } from "../data/bnplOverview";

function BNPL() {
  const { t } = useLanguage();
  const Icon = icons.bnpl;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.bnpl.title")}
      subtitle={t("pages.bnpl.subtitle")}
      overview={bnplOverview}
      faqItems={bnplData}
    />
  );
}

export default BNPL;
