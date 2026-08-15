import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { imanumData } from "../data/imanumData";
import { imanumOverview } from "../data/imanumOverview";

function Imanum() {
  const { t } = useLanguage();
  const Icon = icons.imanum;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.imanum.title")}
      subtitle={t("pages.imanum.subtitle")}
      overview={imanumOverview}
      faqItems={imanumData}
    />
  );
}

export default Imanum;
