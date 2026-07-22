import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { scriptsData } from "../data/scriptsData";

function ScriptsPage() {
  const { t } = useLanguage();
  const Icon = icons.scripts;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.scripts.title")}
      subtitle={t("pages.scripts.subtitle")}
      items={scriptsData}
      alwaysOpen
    />
  );
}

export default ScriptsPage;
