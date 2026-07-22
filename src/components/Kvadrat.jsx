import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { kvadratData } from "../data/kvadratData";

function Kvadrat() {
  const { t } = useLanguage();
  const Icon = icons.kvadrat;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.kvadrat.title")}
      subtitle={t("pages.kvadrat.subtitle")}
      items={kvadratData}
    />
  );
}

export default Kvadrat;
