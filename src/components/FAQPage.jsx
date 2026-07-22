import PlaybookSection from "./PlaybookSection";
import { faqData } from "../data/playbookData";

function FAQPage() {
  return (
    <PlaybookSection
      icon="❓"
      title="FAQ"
      subtitle="Mijozlardan tez-tez so'raladigan savollar."
      items={faqData}
    />
  );
}

export default FAQPage;
