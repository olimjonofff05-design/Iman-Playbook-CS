import ProductTemplate from "./ProductTemplate";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import { aboutData } from "../data/aboutData";
import { aboutOverview } from "../data/aboutOverview";

function About() {
  const { t } = useLanguage();
  const Icon = icons.about;
  return (
    <ProductTemplate
      icon={<Icon size={28} strokeWidth={1.75} />}
      title={t("pages.about.title")}
      subtitle={t("pages.about.subtitle")}
      overview={aboutOverview}
      faqItems={aboutData}
    />
  );
}

export default About;
