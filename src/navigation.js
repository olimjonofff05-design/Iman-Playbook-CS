// Bo'limlar tuzilmasi — sidebar va dashboard bir xil guruhlash va ranglardan foydalanadi

export const NAV_GROUPS = [
  { key: "main", items: ["dashboard", "playbookTabs"] },
  { key: "products", items: ["about", "imanum", "bnpl", "invest", "kvadrat", "ident"] },
  { key: "tools", items: ["investCalc", "workDays", "scripts", "offer"] },
  { key: "growth", items: ["attestation", "qa"] },
  { key: "system", items: ["admin", "settings"] },
];

// Har bir bo'limning o'z rangi (ikonka foni va hover yorug'ligi uchun)
export const TINTS = {
  dashboard: "#8A3B25",
  playbookTabs: "#8A3B25",
  about: "#B7791F",
  imanum: "#0F7C74",
  bnpl: "#C0365A",
  invest: "#2F8350",
  kvadrat: "#7B3F98",
  ident: "#0E7490",
  investCalc: "#4C5BC0",
  workDays: "#D0571B",
  scripts: "#1F7FB5",
  offer: "#5A6478",
  attestation: "#A8730C",
  qa: "#B83A2E",
  admin: "#5A6478",
  settings: "#5A6478",
};
