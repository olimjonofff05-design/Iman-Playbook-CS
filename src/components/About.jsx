import PlaybookSection from "./PlaybookSection";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { aboutData } from "../data/aboutData";

function About() {
  const { t } = useLanguage();
  const Icon = icons.about;
  return (
    <PlaybookSection
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.about.title")}
      subtitle={t("pages.about.subtitle")}
      items={aboutData}
    />
  );
}

export default About;
