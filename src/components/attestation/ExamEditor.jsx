import { useRef, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Copy, Download, Upload } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Alert, Modal } from "./shared";

let localSeq = 0;
const newId = () => `q${Date.now().toString(36)}${(localSeq++).toString(36)}`;

function blankQuestion(type = "single") {
  return {
    id: newId(),
    type,
    context: "",
    text: "",
    options: type === "open" ? [] : ["", "", ""],
    correct: type === "open" ? [] : [0],
    points: type === "open" ? 2 : 1,
    explanation: "",
  };
}

function QuestionEditor({ q, index, total, onChange, onMove, onRemove, onDuplicate }) {
  const { t } = useLanguage();

  function setType(type) {
    if (type === "open") onChange({ ...q, type, options: [], correct: [] });
    else {
      const options = q.options.length >= 2 ? q.options : ["", "", ""];
      const correct = type === "single" ? [q.correct[0] ?? 0] : q.correct.length ? q.correct : [0];
      onChange({ ...q, type, options, correct });
    }
  }

  function toggleCorrect(i) {
    if (q.type === "single") onChange({ ...q, correct: [i] });
    else {
      const has = q.correct.includes(i);
      onChange({ ...q, correct: has ? q.correct.filter((x) => x !== i) : [...q.correct, i].sort((a, b) => a - b) });
    }
  }

  function removeOption(i) {
    const options = q.options.filter((_, k) => k !== i);
    const correct = q.correct.filter((x) => x !== i).map((x) => (x > i ? x - 1 : x));
    onChange({ ...q, options, correct });
  }

  return (
    <div className="att-card att-qedit">
      <div className="att-qedit-head">
        <strong>
          {t("att.runner.question")} {index + 1}
        </strong>
        <div className="att-qedit-tools">
          <select value={q.type} onChange={(e) => setType(e.target.value)}>
            <option value="single">{t("att.qtypes.single")}</option>
            <option value="multi">{t("att.qtypes.multi")}</option>
            <option value="open">{t("att.qtypes.open")}</option>
          </select>
          <label className="att-inline-field">
            {t("att.common.points")}
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={q.points}
              onChange={(e) => onChange({ ...q, points: e.target.value === "" ? "" : Number(e.target.value) })}
            />
          </label>
          <button type="button" className="att-icon-btn" disabled={index === 0} onClick={() => onMove(-1)}>
            <ChevronUp size={16} />
          </button>
          <button type="button" className="att-icon-btn" disabled={index === total - 1} onClick={() => onMove(1)}>
            <ChevronDown size={16} />
          </button>
          <button type="button" className="att-icon-btn" title={t("att.editor.duplicate")} onClick={onDuplicate}>
            <Copy size={16} />
          </button>
          <button type="button" className="att-icon-btn danger" title={t("att.common.delete")} onClick={onRemove}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <label className="att-field">
        <span>{t("att.editor.context")}</span>
        <textarea
          rows={2}
          value={q.context}
          placeholder={t("att.editor.contextPlaceholder")}
          onChange={(e) => onChange({ ...q, context: e.target.value })}
        />
      </label>

      <label className="att-field">
        <span>{t("att.editor.text")} *</span>
        <textarea rows={2} value={q.text} onChange={(e) => onChange({ ...q, text: e.target.value })} />
      </label>

      {q.type !== "open" && (
        <div className="att-field">
          <span>{t(q.type === "single" ? "att.editor.optionsSingle" : "att.editor.optionsMulti")}</span>
          <div className="att-opt-list">
            {q.options.map((opt, i) => (
              <div key={i} className={`att-opt-row ${q.correct.includes(i) ? "correct" : ""}`}>
                <input
                  type={q.type === "single" ? "radio" : "checkbox"}
                  name={`correct-${q.id}`}
                  checked={q.correct.includes(i)}
                  onChange={() => toggleCorrect(i)}
                  title={t("att.editor.markCorrect")}
                />
                <textarea
                  className="att-opt-input"
                  rows={Math.max(1, Math.ceil(opt.length / 80))}
                  value={opt}
                  placeholder={`${t("att.editor.option")} ${i + 1}`}
                  onChange={(e) => {
                    const options = [...q.options];
                    options[i] = e.target.value;
                    onChange({ ...q, options });
                  }}
                />
                <button
                  type="button"
                  className="att-icon-btn"
                  disabled={q.options.length <= 2}
                  onClick={() => removeOption(i)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          {q.options.length < 8 && (
            <button
              type="button"
              className="att-btn att-btn-ghost att-btn-sm"
              onClick={() => onChange({ ...q, options: [...q.options, ""] })}
            >
              <Plus size={14} /> {t("att.editor.addOption")}
            </button>
          )}
        </div>
      )}

      <label className="att-field">
        <span>{t(q.type === "open" ? "att.editor.expectedAnswer" : "att.editor.explanation")}</span>
        <textarea
          rows={2}
          value={q.explanation}
          placeholder={t("att.editor.explanationPlaceholder")}
          onChange={(e) => onChange({ ...q, explanation: e.target.value })}
        />
      </label>
    </div>
  );
}

function ExamEditor({ exam, onChange, onSave, saving, error, dirty }) {
  const { t } = useLanguage();
  const fileRef = useRef(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importMode, setImportMode] = useState("append");
  const [importError, setImportError] = useState("");

  const qs = exam.questions;
  const setQs = (questions) => onChange({ ...exam, questions });
  const set = (k, v) => onChange({ ...exam, [k]: v });
  const totalPoints = qs.reduce((s, q) => s + (Number(q.points) || 0), 0);

  function exportJson() {
    const blob = new Blob([JSON.stringify(qs, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${exam.title || "savollar"}.json`.replace(/[\\/:*?"<>|]/g, "_");
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function applyImport() {
    setImportError("");
    try {
      const parsed = JSON.parse(importText);
      const list = Array.isArray(parsed) ? parsed : parsed?.questions;
      if (!Array.isArray(list)) throw new Error(t("att.editor.importNotArray"));
      const mapped = list.map((q) => ({
        ...blankQuestion(q.type === "open" || q.type === "multi" ? q.type : "single"),
        ...q,
        id: newId(),
        options: Array.isArray(q.options) ? q.options.map(String) : [],
        correct: (Array.isArray(q.correct) ? q.correct : q.correct === undefined ? [] : [q.correct]).map(Number),
        context: q.context ?? "",
        explanation: q.explanation ?? "",
      }));
      setQs(importMode === "replace" ? mapped : [...qs, ...mapped]);
      setImportOpen(false);
      setImportText("");
    } catch (err) {
      setImportError(`${t("att.editor.importError")}: ${err.message}`);
    }
  }

  return (
    <div className="att-editor">
      <div className="att-card att-form">
        <label className="att-field">
          <span>{t("att.editor.title")} *</span>
          <input value={exam.title} onChange={(e) => set("title", e.target.value)} />
        </label>
        <label className="att-field">
          <span>{t("att.editor.description")}</span>
          <textarea
            rows={2}
            value={exam.description}
            placeholder={t("att.editor.descriptionPlaceholder")}
            onChange={(e) => set("description", e.target.value)}
          />
        </label>
        <div className="att-form-row att-form-row-4">
          <label className="att-field">
            <span>{t("att.users.level")}</span>
            <select value={exam.level} onChange={(e) => set("level", e.target.value)}>
              <option value="junior">{t("att.levels.junior")}</option>
              <option value="middle">{t("att.levels.middle")}</option>
            </select>
          </label>
          <label className="att-field">
            <span>{t("att.editor.duration")}</span>
            <input
              type="number"
              min="1"
              max="600"
              value={exam.duration_min}
              onChange={(e) => set("duration_min", e.target.value)}
            />
          </label>
          <label className="att-field">
            <span>{t("att.editor.passPercent")}</span>
            <input
              type="number"
              min="0"
              max="100"
              value={exam.pass_percent}
              onChange={(e) => set("pass_percent", e.target.value)}
            />
          </label>
          <div className="att-field">
            <span>{t("att.editor.options")}</span>
            <label className="att-check">
              <input type="checkbox" checked={exam.shuffle} onChange={(e) => set("shuffle", e.target.checked)} />
              {t("att.editor.shuffle")}
            </label>
            <label className="att-check">
              <input
                type="checkbox"
                checked={exam.show_result}
                onChange={(e) => set("show_result", e.target.checked)}
              />
              {t("att.editor.showResult")}
            </label>
          </div>
        </div>
      </div>

      <div className="att-section-head">
        <h2>
          {t("att.editor.questions")} ({qs.length}) · {totalPoints} {t("att.common.points")}
        </h2>
        <div className="att-btn-row">
          <button type="button" className="att-btn att-btn-ghost" onClick={() => setImportOpen(true)}>
            <Upload size={15} /> {t("att.editor.import")}
          </button>
          <button type="button" className="att-btn att-btn-ghost" disabled={!qs.length} onClick={exportJson}>
            <Download size={15} /> {t("att.editor.export")}
          </button>
        </div>
      </div>

      {qs.length === 0 && (
        <div className="att-card att-empty">
          <p className="att-muted">{t("att.editor.noQuestions")}</p>
        </div>
      )}

      {qs.map((q, i) => (
        <QuestionEditor
          key={q.id}
          q={q}
          index={i}
          total={qs.length}
          onChange={(nq) => setQs(qs.map((x, k) => (k === i ? nq : x)))}
          onRemove={() => {
            if (window.confirm(t("att.editor.confirmRemove"))) setQs(qs.filter((_, k) => k !== i));
          }}
          onDuplicate={() => setQs([...qs.slice(0, i + 1), { ...q, id: newId() }, ...qs.slice(i + 1)])}
          onMove={(d) => {
            const next = [...qs];
            [next[i], next[i + d]] = [next[i + d], next[i]];
            setQs(next);
          }}
        />
      ))}

      <div className="att-btn-row att-add-row">
        <button type="button" className="att-btn" onClick={() => setQs([...qs, blankQuestion("single")])}>
          <Plus size={15} /> {t("att.qtypes.single")}
        </button>
        <button type="button" className="att-btn" onClick={() => setQs([...qs, blankQuestion("multi")])}>
          <Plus size={15} /> {t("att.qtypes.multi")}
        </button>
        <button type="button" className="att-btn" onClick={() => setQs([...qs, blankQuestion("open")])}>
          <Plus size={15} /> {t("att.qtypes.open")}
        </button>
      </div>

      <div className="att-savebar">
        <Alert>{error}</Alert>
        <span className="att-muted att-small">{dirty ? t("att.editor.unsaved") : t("att.editor.allSaved")}</span>
        <button className="att-btn att-btn-primary" disabled={saving} onClick={onSave}>
          {saving ? t("att.common.loading") : t("att.common.save")}
        </button>
      </div>

      {importOpen && (
        <Modal title={t("att.editor.import")} onClose={() => setImportOpen(false)} wide>
          <p className="att-muted att-small">{t("att.editor.importHint")}</p>
          <div className="att-btn-row">
            <button type="button" className="att-btn att-btn-ghost" onClick={() => fileRef.current?.click()}>
              <Upload size={15} /> {t("att.editor.chooseFile")}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) setImportText(await f.text());
                e.target.value = "";
              }}
            />
            <select value={importMode} onChange={(e) => setImportMode(e.target.value)}>
              <option value="append">{t("att.editor.importAppend")}</option>
              <option value="replace">{t("att.editor.importReplace")}</option>
            </select>
          </div>
          <textarea
            className="att-textarea att-mono"
            rows={12}
            value={importText}
            placeholder='[{"type":"single","text":"...","options":["A","B"],"correct":[0],"points":1}]'
            onChange={(e) => setImportText(e.target.value)}
          />
          <Alert>{importError}</Alert>
          <div className="att-modal-actions">
            <button className="att-btn" onClick={() => setImportOpen(false)}>
              {t("att.common.cancel")}
            </button>
            <button className="att-btn att-btn-primary" disabled={!importText.trim()} onClick={applyImport}>
              {t("att.editor.importApply")}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExamEditor;
