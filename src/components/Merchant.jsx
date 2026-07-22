import PlaybookSection from "./PlaybookSection";
import { merchantData } from "../data/playbookData";

function Merchant() {
  return (
    <PlaybookSection
      icon="🏪"
      title="Merchant Playbook"
      subtitle="Hamkorlar (sotuvchilar) bilan ishlash bo'yicha yo'riqnoma."
      items={merchantData}
    />
  );
}

export default Merchant;
