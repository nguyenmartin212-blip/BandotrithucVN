import { useEffect, useMemo, useState } from "react";
import WikiImage from "./WikiImage";
import { REGIONS, KIND_ORDER } from "../data/content";
import { tr, pick, dayWord, dayLabel, monthLabel, monthFull, placesCount } from "../i18n";
import {
  DAY_CAPACITY, placeMap, totalHours, recommendedIds, autoPlan, scheduleDay, fmtTime,
  monthScore, bestMonth, moveItem, shift, removeItem, newId,
} from "../lib/itinerary";

export function Modal({ title, onClose, children, footer, wide }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal__box ${wide ? "modal__box--wide" : ""}`}>
        <header className="modal__head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="close">×</button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

export default function ItineraryBuilder({ lang, dests, initial, onClose, onSave, onOpenSaved }) {
  const edit = initial?.itinerary || null;
  const [step, setStep] = useState(edit ? 3 : 1);
  const [destId, setDestId] = useState(edit?.destId || initial?.destId || null);
  const [month, setMonth] = useState(edit?.month || null);
  const [days, setDays] = useState(edit?.days || null);
  const [selected, setSelected] = useState(edit ? edit.plan.flat() : []);
  const [plan, setPlan] = useState(edit?.plan || []);
  const [name, setName] = useState(edit?.name || "");
  const [notes, setNotes] = useState(edit?.notes || "");
  const [filter, setFilter] = useState("all");
  const [savedId, setSavedId] = useState(edit?.id || null);
  const [justSaved, setJustSaved] = useState(false);

  const dest = dests.find((d) => d.id === destId) || null;
  const map = useMemo(() => placeMap(dest), [dest]);

  // Chọn sẵn điểm đến nếu mở từ bảng chi tiết
  useEffect(() => {
    if (dest && !edit && month == null) {
      setMonth(bestMonth(dest));
      setDays(dest.suggestedDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function chooseDest(d) {
    if (d.id !== destId) {
      setSelected([]);
      setPlan([]);
      setName("");
    }
    setDestId(d.id);
    setMonth(d.id === destId && month ? month : bestMonth(d));
    setDays(d.id === destId && days ? days : d.suggestedDays);
  }

  function goStep2() {
    if (!dest) return;
    if (selected.length === 0) setSelected(recommendedIds(dest, days));
    setStep(2);
  }

  function goStep3() {
    if (!dest || selected.length === 0) return;
    const current = plan.flat();
    if (!(plan.length === days && sameSet(current, selected))) setPlan(autoPlan(dest, selected, days));
    if (!name) setName(`${pick(dest.name, lang)} · ${dayWord(lang, days)} · ${monthLabel(lang, month)}`);
    setJustSaved(false);
    setStep(3);
  }

  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function save() {
    const it = {
      id: savedId || newId(),
      destId: dest.id,
      month,
      days,
      plan,
      name: name.trim() || pick(dest.name, lang),
      notes,
      rating: edit?.rating || 0,
      createdAt: edit?.createdAt || Date.now(),
    };
    onSave(it);
    setSavedId(it.id);
    setJustSaved(true);
  }

  const steps = [tr(lang, "ib_s1"), tr(lang, "ib_s2"), tr(lang, "ib_s3")];
  const hours = dest ? totalHours(selected, map) : 0;
  const capacity = (days || 0) * DAY_CAPACITY;

  const footer = (
    <>
      {step > 1 && !justSaved && (
        <button className="btn" onClick={() => setStep(step - 1)}>← {tr(lang, "ib_prev")}</button>
      )}
      <span className="grow" />
      {step === 1 && (
        <button className="btn btn--accent" disabled={!dest} onClick={goStep2}>{tr(lang, "ib_next")} →</button>
      )}
      {step === 2 && (
        <button className="btn btn--accent" disabled={selected.length === 0} onClick={goStep3}>{tr(lang, "ib_next")} →</button>
      )}
      {step === 3 && !justSaved && (
        <button className="btn btn--accent" onClick={save}>{savedId ? tr(lang, "ib_update") : tr(lang, "ib_save")}</button>
      )}
      {step === 3 && justSaved && (
        <button className="btn btn--accent" onClick={onOpenSaved}>{tr(lang, "ib_view_saved")} →</button>
      )}
    </>
  );

  return (
    <Modal title={tr(lang, "ib_title")} onClose={onClose} footer={footer} wide>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={i} className={step === i + 1 ? "on" : step > i + 1 ? "done" : ""}>
            <b>{i + 1}</b>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      {/* ---------------- BƯỚC 1 ---------------- */}
      {step === 1 && (
        <section>
          <h3 className="sec">{tr(lang, "ib_pick_dest")}</h3>
          <div className="dgrid">
            {dests.map((d) => (
              <button key={d.id} className={`dcard ${d.id === destId ? "on" : ""}`} onClick={() => chooseDest(d)}>
                <WikiImage titles={d.hero} width={500} alt="" lang={lang} className="dcard__img" fallback={<div className="dcard__img dcard__img--fb" style={{ background: REGIONS[d.region].color }} />} />
                <div className="dcard__txt">
                  <small style={{ color: REGIONS[d.region].color }}>{pick(REGIONS[d.region].name, lang)}</small>
                  <strong>{pick(d.name, lang)}</strong>
                  <span>{pick(d.tagline, lang)}</span>
                </div>
              </button>
            ))}
          </div>

          {dest && (
            <div className="card">
              <h3 className="sec">{tr(lang, "ib_month")}</h3>
              <p className="muted small">{tr(lang, "ib_month_hint")}</p>
              <div className="mchart" role="group">
                {dest.bestMonths.map((s, i) => (
                  <button key={i} className={`mbar s${s} ${month === i + 1 ? "on" : ""}`} onClick={() => setMonth(i + 1)} aria-label={monthFull(lang, i + 1)}>
                    <span className="mbar__fill" />
                    <span className="mbar__lbl">{monthLabel(lang, i + 1)}</span>
                  </button>
                ))}
              </div>
              <div className="legend">
                <span><i className="s3" />{tr(lang, "lg_great")}</span>
                <span><i className="s2" />{tr(lang, "lg_ok")}</span>
                <span><i className="s1" />{tr(lang, "lg_poor")}</span>
              </div>
              {month && (
                <p className={`note note--s${monthScore(dest, month)}`}>
                  <b>{monthFull(lang, month)}:</b> {tr(lang, ["", "msg_poor", "msg_ok", "msg_great"][monthScore(dest, month)])}
                </p>
              )}
              <p className="small">{pick(dest.bestNote, lang)}</p>

              <h3 className="sec" style={{ marginTop: 18 }}>{tr(lang, "ib_days")}</h3>
              <div className="stepper">
                <button onClick={() => setDays(Math.max(1, (days || 1) - 1))} aria-label="-">−</button>
                <strong>{dayWord(lang, days || dest.suggestedDays)}</strong>
                <button onClick={() => setDays(Math.min(7, (days || 1) + 1))} aria-label="+">+</button>
                <span className="muted small">
                  {tr(lang, "ib_suggest")}: {dayWord(lang, dest.daysRange[0])}–{dayWord(lang, dest.daysRange[1])}
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ---------------- BƯỚC 2 ---------------- */}
      {step === 2 && dest && (
        <section>
          <div className="toolbar">
            <div className="chips">
              {["all", ...KIND_ORDER].map((k) => (
                <button key={k} className={`chip ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>
                  {k === "all" ? tr(lang, "f_all") : tr(lang, `k_${k}`)}
                </button>
              ))}
            </div>
            <div className="toolbar__btns">
              <button className="btn btn--sm" onClick={() => setSelected(recommendedIds(dest, days))}>✦ {tr(lang, "ib_auto")}</button>
              <button className="btn btn--sm" onClick={() => setSelected([])}>{tr(lang, "ib_clear")}</button>
            </div>
          </div>

          <div className="pgrid">
            {dest.places
              .filter((p) => filter === "all" || p.kind === filter)
              .map((p) => {
                const on = selected.includes(p.id);
                return (
                  <label key={p.id} className={`pcard ${on ? "on" : ""}`}>
                    <input type="checkbox" checked={on} onChange={() => toggle(p.id)} />
                    <span className="pcard__box">{on ? "✓" : ""}</span>
                    <span className="pcard__txt">
                      <strong>{pick(p.name, lang)}</strong>
                      <small>{pick(p.note, lang)}</small>
                      <span className="tags">
                        <em>{tr(lang, `k_${p.kind}`)}</em>
                        <em>⏱ {p.hours} {tr(lang, "hours")}</em>
                        <em>{tr(lang, `slot_${p.slot}`)}</em>
                        {p.must && <em className="must">★ {tr(lang, "ib_recommended")}</em>}
                      </span>
                    </span>
                  </label>
                );
              })}
          </div>

          <div className={`sumbar ${hours > capacity ? "over" : ""}`}>
            <strong>{placesCount(lang, selected.length)} · {hours} {tr(lang, "hours")} / ~{capacity} {tr(lang, "hours")} ({dayWord(lang, days)})</strong>
            <span>{selected.length === 0 ? tr(lang, "ib_need_pick") : hours > capacity ? tr(lang, "ib_over") : tr(lang, "ib_fit")}</span>
          </div>
        </section>
      )}

      {/* ---------------- BƯỚC 3 ---------------- */}
      {step === 3 && dest && (
        <section>
          <label className="field">
            <span>{tr(lang, "ib_name")}</span>
            <input value={name} onChange={(e) => { setName(e.target.value); setJustSaved(false); }} />
          </label>
          <div className="plan-head">
            <p className="muted small">{tr(lang, "ib_time_note")} · {monthFull(lang, month)}</p>
            <button className="btn btn--sm" onClick={() => { setPlan(autoPlan(dest, plan.flat(), days)); setJustSaved(false); }}>↻ {tr(lang, "ib_regen")}</button>
          </div>

          <div className="days">
            {plan.map((ids, di) => {
              const sched = scheduleDay(ids, map);
              const h = totalHours(ids, map);
              return (
                <div key={di} className="daycol">
                  <h4>
                    {dayLabel(lang, di + 1)}
                    <small className={h > DAY_CAPACITY + 1 ? "warn" : ""}>{h} {tr(lang, "hours")}</small>
                  </h4>
                  {ids.length === 0 && <p className="muted small">—</p>}
                  {sched.map((s, idx) => {
                    const p = map[s.id];
                    return (
                      <div key={s.id} className="plan-item">
                        <div className="plan-time">{fmtTime(s.start)}<br /><small>{fmtTime(s.end)}</small></div>
                        <div className="plan-main">
                          <strong>{pick(p.name, lang)}</strong>
                          <small>{pick(p.note, lang)}</small>
                          <div className="plan-ctl">
                            <button onClick={() => { setPlan(shift(plan, di, idx, -1)); setJustSaved(false); }} disabled={idx === 0} aria-label="up">↑</button>
                            <button onClick={() => { setPlan(shift(plan, di, idx, 1)); setJustSaved(false); }} disabled={idx === ids.length - 1} aria-label="down">↓</button>
                            <select value={di} onChange={(e) => { setPlan(moveItem(plan, di, s.id, Number(e.target.value), map)); setJustSaved(false); }} aria-label={tr(lang, "ib_move")}>
                              {plan.map((_, k) => <option key={k} value={k}>{tr(lang, "ib_move")} {dayLabel(lang, k + 1)}</option>)}
                            </select>
                            <button className="danger" onClick={() => { setPlan(removeItem(plan, s.id)); setSelected((x) => x.filter((i) => i !== s.id)); setJustSaved(false); }} title={tr(lang, "ib_remove")} aria-label={tr(lang, "ib_remove")}>✕</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <label className="field">
            <span>{tr(lang, "ib_notes")}</span>
            <textarea rows={3} value={notes} placeholder={tr(lang, "ib_notes_ph")} onChange={(e) => { setNotes(e.target.value); setJustSaved(false); }} />
          </label>
          {justSaved && <p className="note note--s3">✓ {tr(lang, "ib_saved")}</p>}
        </section>
      )}
    </Modal>
  );
}
