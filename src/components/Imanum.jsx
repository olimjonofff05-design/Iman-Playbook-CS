import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { imanumData } from "../data/imanumData";

function Imanum() {
  const { t } = useLanguage();
  const Icon = icons.imanum;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.imanum.title")}
      subtitle={t("pages.imanum.subtitle")}
      items={imanumData}
    />
  );
}

export default Imanum;
