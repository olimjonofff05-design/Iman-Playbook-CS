import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { icons } from "../icons";
import {
  OFFICIAL_DAYS,
  VERIFIED_YEARS,
  FIXED_HOLIDAYS,
  ESTIMATED_HAYIT,
} from "../data/holidays";
import "./WorkDays.css";

/* ---------- Sana yordamchilari (UTC siljishisiz, mahalliy sana) ---------- */
const pad = (n) => String(n).padStart(2, "0");
const keyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const fmt = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

function isWeekend(d, week) {
  const g = d.getDay();
  return week === 5 ? g === 0 || g === 6 : g === 0;
}

/* ---------- Yil bo'yicha maxsus kunlar xaritasi ---------- */
const cache = new Map();
function yearMap(year, week) {
  const ck = `${year}:${week}`;
  if (cache.has(ck)) return cache.get(ck);
  const map = new Map();

  if (!VERIFIED_YEARS.includes(year)) {
    // Taxminiy: doimiy bayramlar + hayitlar + Mehnat kodeksi bo'yicha ko'chirish
    const hol = [
      ...FIXED_HOLIDAYS.map((h) => ({ date: `${year}-${h.md}`, uz: h.uz, ru: h.ru })),
      ...ESTIMATED_HAYIT.filter((h) => h.date.startsWith(`${year}-`)),
    ].sort((a, b) => a.date.localeCompare(b.date));

    hol.forEach((h) => map.set(h.date, { type: "holiday", uz: h.uz, ru: h.ru, estimated: true }));
    hol.forEach((h) => {
      const d = parseKey(h.date);
      if (!isWeekend(d, week)) return;
      let n = addDays(d, 1);
      while (isWeekend(n, week) || map.has(keyOf(n))) n = addDays(n, 1);
      if (n.getFullYear() === year) {
        map.set(keyOf(n), {
          type: "moved",
          uz: `Ko'chirilgan dam olish kuni (${h.uz} uchun)`,
          ru: `Перенесённый выходной (за ${h.ru})`,
          estimated: true,
        });
      }
    });
  }

  OFFICIAL_DAYS.forEach((e) => {
    if (e.date.startsWith(`${year}-`) && e.week.includes(week)) {
      map.set(e.date, { type: e.type, uz: e.uz, ru: e.ru, estimated: false });
    }
  });

  cache.set(ck, map);
  return map;
}

function dayInfo(d, week) {
  const e = yearMap(d.getFullYear(), week).get(keyOf(d));
  if (e && e.type === "work") return { off: false, entry: e };
  if (e) return { off: true, entry: e };
  return { off: isWeekend(d, week), entry: null };
}

const isVerified = (d) => VERIFIED_YEARS.includes(d.getFullYear()) || keyOf(d) === "2025-12-31";

/* ---------- Hisoblash ---------- */
function computeRange(from, to, include, week) {
  if (!from || !to) return { error: "errBothDates" };
  if (to < from) return { error: "errOrder" };
  const start = include ? from : addDays(from, 1);
  let total = 0, work = 0, off = 0, estimated = false;
  const special = [];
  for (let d = start; d <= to; d = addDays(d, 1)) {
    total++;
    const i = dayInfo(d, week);
    if (i.off) off++; else work++;
    if (i.entry) special.push({ d, ...i.entry });
    if (!isVerified(d)) estimated = true;
  }
  return { total, work, off, special, estimated, start, to };
}

function computeAdd(from, n, unit, week) {
  if (!from) return { error: "errStartDate" };
  if (!Number.isInteger(n) || n < 1) return { error: "errCount" };
  if (n > 3650) return { error: "errCountMax" };
  let d = from, estimated = false;
  const special = [];
  if (unit === "cal") {
    d = addDays(from, n);
    for (let x = addDays(from, 1); x <= d; x = addDays(x, 1)) {
      const i = dayInfo(x, week);
      if (i.entry) special.push({ d: x, ...i.entry });
      if (!isVerified(x)) estimated = true;
    }
  } else {
    let count = 0;
    while (count < n) {
      d = addDays(d, 1);
      const i = dayInfo(d, week);
      if (i.entry) special.push({ d, ...i.entry });
      if (!isVerified(d)) estimated = true;
      if (!i.off) count++;
    }
  }
  return { end: d, special, estimated };
}

/* ---------- Komponent ---------- */
function WorkDays() {
  const { t, language } = useLanguage();
  const Icon = icons.workDays;
  const tr = (k) => t(`pages.workDays.${k}`);
  const MONTHS = tr("months");
  const MONTHS_GEN = tr("monthsGen");
  const WEEKDAYS = tr("weekdays");
  const DOW = tr("dowShort");

  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const [mode, setMode] = useState("range");
  const [week, setWeek] = useState(5);
  const [unit, setUnit] = useState("work");
  const [rFrom, setRFrom] = useState(today);
  const [rTo, setRTo] = useState(() => addDays(today, 30));
  const [include, setInclude] = useState(true);
  const [aFrom, setAFrom] = useState(today);
  const [nText, setNText] = useState("10");
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [pickNext, setPickNext] = useState("from");

  const n = Number(nText);
  const rangeRes = computeRange(rFrom, rTo, include, week);
  const addRes = computeAdd(aFrom, n, unit, week);

  const fmtLong = (d) =>
    language === "ru"
      ? `${d.getDate()} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}, ${WEEKDAYS[d.getDay()].toLowerCase()}`
      : `${d.getDate()}-${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}, ${WEEKDAYS[d.getDay()].toLowerCase()}`;

  const highlight =
    mode === "range"
      ? rangeRes.error ? null : { a: rFrom, b: rTo }
      : addRes.error ? null : { a: aFrom, b: addRes.end };

  const readDate = (v) => (v ? parseKey(v) : null);

  function onDayClick(d) {
    if (mode === "range") {
      if (pickNext === "from") {
        setRFrom(d);
        if (rTo && rTo < d) setRTo(d);
        setPickNext("to");
      } else {
        if (rFrom && d < rFrom) { setRTo(rFrom); setRFrom(d); } else setRTo(d);
        setPickNext("from");
      }
    } else {
      setAFrom(d);
    }
  }

  const nameOf = (e) => (language === "ru" ? e.ru : e.uz);

  function specialList(items) {
    if (!items.length) return null;
    return (
      <ul className="wd-list">
        {items.map((s) => (
          <li key={keyOf(s.d) + s.type}>
            <i className={`wd-tag wd-tag-${s.type}`} />
            <span className="wd-list-date">{fmt(s.d)}</span>
            <span>
              {nameOf(s)}
              {s.estimated ? ` (${tr("estimatedShort")})` : ""}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  /* Kalendar oylari */
  function renderMonth(offset) {
    const first = new Date(view.getFullYear(), view.getMonth() + offset, 1);
    const daysIn = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    const aK = highlight ? keyOf(highlight.a) : "";
    const bK = highlight ? keyOf(highlight.b) : "";
    const todayK = keyOf(today);
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(<div key={`e${i}`} className="wd-day wd-empty" />);
    for (let day = 1; day <= daysIn; day++) {
      const d = new Date(first.getFullYear(), first.getMonth(), day);
      const k = keyOf(d);
      const info = dayInfo(d, week);
      const cls = ["wd-day"];
      let title = fmtLong(d);
      if (info.entry) {
        title += ` — ${nameOf(info.entry)}`;
        if (info.entry.type === "holiday") cls.push("wd-holiday");
        else if (info.entry.type === "work") cls.push("wd-worksat");
        else cls.push("wd-softred");
        if (info.entry.estimated) { cls.push("wd-estimated"); title += ` (${tr("estimatedShort")})`; }
      } else if (info.off) {
        cls.push("wd-weekend");
        title += ` — ${tr("dayOff")}`;
      }
      if (highlight && d >= highlight.a && d <= highlight.b) cls.push("wd-inrange");
      if (k === aK || k === bK) cls.push("wd-edge");
      if (k === todayK) cls.push("wd-today");
      cells.push(
        <button key={k} type="button" className={cls.join(" ")} title={title} aria-label={title} onClick={() => onDayClick(d)}>
          {day}
        </button>
      );
    }
    return (
      <div key={offset}>
        <p className="wd-month-title">{MONTHS[first.getMonth()]} {first.getFullYear()}</p>
        <div className="wd-cal">
          {DOW.map((x) => <div key={x} className="wd-dow">{x}</div>)}
          {cells}
        </div>
      </div>
    );
  }

  const viewYear = view.getFullYear();
  const yearItems = [...yearMap(viewYear, week).entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, e]) => ({ d: parseKey(k), ...e }));

  const estimateNote = <div className="wd-note">{tr("estimateNote")}</div>;

  return (
    <div className="wd-page">
      <div className="page-header">
        <h1>
          <span className="page-icon"><Icon size={28} strokeWidth={1.75} /></span>
          {tr("title")}
        </h1>
      </div>
      <p className="page-subtitle">{tr("subtitle")}</p>

      <div className="wd-topbar">
        <div className="wd-seg" role="group" aria-label={tr("modeLabel")}>
          <button type="button" aria-pressed={mode === "range"} onClick={() => setMode("range")}>{tr("modeRange")}</button>
          <button type="button" aria-pressed={mode === "add"} onClick={() => setMode("add")}>{tr("modeAdd")}</button>
        </div>
        <div className="wd-seg" role="group" aria-label={tr("weekLabel")}>
          <button type="button" aria-pressed={week === 5} onClick={() => setWeek(5)}>{tr("week5")}</button>
          <button type="button" aria-pressed={week === 6} onClick={() => setWeek(6)}>{tr("week6")}</button>
        </div>
      </div>

      <div className="wd-grid">
        <div>
          {mode === "range" ? (
            <section className="wd-card">
              <h2>{tr("rangeTitle")}</h2>
              <div className="wd-row2">
                <label className="wd-field">{tr("from")}
                  <input type="date" value={rFrom ? keyOf(rFrom) : ""} onChange={(e) => setRFrom(readDate(e.target.value))} />
                </label>
                <label className="wd-field">{tr("to")}
                  <input type="date" value={rTo ? keyOf(rTo) : ""} onChange={(e) => setRTo(readDate(e.target.value))} />
                </label>
              </div>
              <label className="wd-check">
                <input type="checkbox" checked={include} onChange={(e) => setInclude(e.target.checked)} />
                {tr("includeStart")}
              </label>
              <p className="wd-hint">{tr("rangeHint")}</p>

              <div className="wd-result">
                {rangeRes.error ? (
                  <div className="wd-alert">{tr(rangeRes.error)}</div>
                ) : (
                  <>
                    <div className="wd-big">{rangeRes.work} {tr("workDaysUnit")}</div>
                    <div className="wd-big-label">{fmt(rangeRes.start)} – {fmt(rangeRes.to)}, {week === 5 ? tr("week5") : tr("week6")}</div>
                    <div className="wd-stats">
                      <div className="wd-stat"><b>{rangeRes.total}</b><span>{tr("calDays")}</span></div>
                      <div className="wd-stat"><b>{rangeRes.work}</b><span>{tr("workDays")}</span></div>
                      <div className="wd-stat wd-stat-red"><b>{rangeRes.off}</b><span>{tr("offDays")}</span></div>
                    </div>
                    {rangeRes.special.length ? (
                      <>
                        <p className="wd-explain">{tr("specialInRange")}</p>
                        {specialList(rangeRes.special)}
                      </>
                    ) : (
                      <p className="wd-explain">{tr("noSpecial")}</p>
                    )}
                    {rangeRes.estimated && estimateNote}
                  </>
                )}
              </div>
            </section>
          ) : (
            <section className="wd-card">
              <h2>{tr("addTitle")}</h2>
              <label className="wd-field">{tr("startDate")}
                <input type="date" value={aFrom ? keyOf(aFrom) : ""} onChange={(e) => setAFrom(readDate(e.target.value))} />
              </label>
              <div className="wd-row2">
                <label className="wd-field">{tr("count")}
                  <input type="number" min="1" max="3650" inputMode="numeric" value={nText} onChange={(e) => setNText(e.target.value)} />
                </label>
                <div className="wd-field">{tr("unitLabel")}
                  <div className="wd-seg wd-seg-small" role="group" aria-label={tr("unitLabel")}>
                    <button type="button" aria-pressed={unit === "work"} onClick={() => setUnit("work")}>{tr("unitWork")}</button>
                    <button type="button" aria-pressed={unit === "cal"} onClick={() => setUnit("cal")}>{tr("unitCal")}</button>
                  </div>
                </div>
              </div>
              <p className="wd-hint">{tr("addHint")}</p>

              <div className="wd-result">
                {addRes.error ? (
                  <div className="wd-alert">{tr(addRes.error)}</div>
                ) : (
                  <>
                    <div className="wd-big">{fmt(addRes.end)}</div>
                    <div className="wd-big-label">{fmtLong(addRes.end)}</div>
                    <p className="wd-explain">
                      {tr("addExplain")
                        .replace("{from}", fmt(aFrom))
                        .replace("{n}", n)
                        .replace("{unit}", unit === "work" ? tr("workDaysUnit") : tr("calDaysUnit"))}
                    </p>
                    {unit === "cal" && dayInfo(addRes.end, week).off && (
                      <div className="wd-note">{tr("endIsOff")}</div>
                    )}
                    {addRes.special.length > 0 && (
                      <>
                        <p className="wd-explain">{tr("specialOnWay")}</p>
                        {specialList(addRes.special)}
                      </>
                    )}
                    {addRes.estimated && estimateNote}
                  </>
                )}
              </div>
            </section>
          )}
        </div>

        <section className="wd-card">
          <div className="wd-cal-head">
            <h2>{tr("calendar")}</h2>
            <div className="wd-cal-actions">
              <button type="button" className="wd-btn-today" onClick={() => setView(new Date(today.getFullYear(), today.getMonth(), 1))}>{tr("today")}</button>
              <button type="button" className="wd-nav" aria-label={tr("prevMonth")} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>‹</button>
              <button type="button" className="wd-nav" aria-label={tr("nextMonth")} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>›</button>
            </div>
          </div>
          <div className="wd-months">
            {renderMonth(0)}
            {renderMonth(1)}
          </div>
          <div className="wd-legend">
            <span><i className="wd-sw wd-holiday" />{tr("legendHoliday")}</span>
            <span><i className="wd-sw wd-softred" />{tr("legendExtra")}</span>
            <span><i className="wd-sw wd-weekend" />{tr("legendWeekend")}</span>
            <span><i className="wd-sw wd-worksat" />{tr("legendWorkSat")}</span>
            <span><i className="wd-sw wd-sw-est" />{tr("legendEstimated")}</span>
          </div>
        </section>
      </div>

      <section className="wd-card wd-year">
        <h2>
          {tr("yearTitle").replace("{year}", viewYear).replace("{week}", week)}
          {!VERIFIED_YEARS.includes(viewYear) && ` — ${tr("estimatedShort")}`}
        </h2>
        {yearItems.length ? specialList(yearItems) : <p className="wd-explain">{tr("noData")}</p>}
      </section>
    </div>
  );
}

export default WorkDays;
