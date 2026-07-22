import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { investData } from "../data/investData";

function Invest() {
  const { t } = useLanguage();
  const Icon = icons.invest;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.invest.title")}
      subtitle={t("pages.invest.subtitle")}
      items={investData}
    />
  );
}

export default Invest;
