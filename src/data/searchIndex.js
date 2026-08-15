import { aboutData } from "./aboutData";
import { imanumData } from "./imanumData";
import { bnplData } from "./bnplData";
import { investData } from "./investData";
import { kvadratData } from "./kvadratData";
import { scriptsData } from "./scriptsData";

// Har bir manba qaysi sahifaga (sidebar page key'iga) tegishli ekanini bog'laydi
const SOURCES = [
  { page: "about", items: aboutData },
  { page: "imanum", items: imanumData },
  { page: "bnpl", items: bnplData },
  { page: "invest", items: investData },
  { page: "kvadrat", items: kvadratData },
  { page: "scripts", items: scriptsData },
];

// Butun portal bo'ylab qidirish uchun yagona ro'yxat: [{ page, q, a }]
export const searchIndex = SOURCES.flatMap(({ page, items }) =>
  items.map((item) => ({ page, id: item.id, q: item.q, a: item.a }))
);
