import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { bnplData } from "../data/bnplData";

function BNPL() {
  const { t } = useLanguage();
  const Icon = icons.bnpl;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.bnpl.title")}
      subtitle={t("pages.bnpl.subtitle")}
      items={bnplData}
    />
  );
}

export default BNPL;
