import { useState } from "react";
import { Modal } from "./ItineraryBuilder";
import { DESTINATIONS } from "../data/content";
import { tr, pick, dayWord, dayLabel, monthLabel, placesCount, peopleWord } from "../i18n";
import { placeMap, scheduleDay, fmtTime, totalHours } from "../lib/itinerary";

export default function SavedItineraries({ lang, list, onClose, onPatch, onRemove, onEdit, onCopy, onNew }) {
  const [openId, setOpenId] = useState(list[0]?.id || null);
  const it = list.find((x) => x.id === openId) || null;
  const dest = it ? DESTINATIONS.find((d) => d.id === it.destId) : null;
  const map = placeMap(dest);

  const fmtDate = (t) => new Date(t).toLocaleDateString(lang === "vi" ? "vi-VN" : lang === "zh" ? "zh-CN" : lang === "ko" ? "ko-KR" : "en-GB");

  function remove(id) {
    if (!window.confirm(tr(lang, "sv_confirm"))) return;
    onRemove(id);
    setOpenId(list.find((x) => x.id !== id)?.id || null);
  }

  return (
    <Modal
      title={tr(lang, "sv_title")}
      onClose={onClose}
      wide
      footer={<><span className="grow" /><button className="btn btn--accent" onClick={onNew}>✦ {tr(lang, "btn_plan")}</button></>}
    >
      {list.length === 0 ? (
        <p className="empty">{tr(lang, "sv_empty")}</p>
      ) : (
        <div className="saved">
          <ul className="saved__list">
            {list.map((x) => {
              const d = DESTINATIONS.find((y) => y.id === x.destId);
              return (
                <li key={x.id}>
                  <button className={x.id === openId ? "on" : ""} onClick={() => setOpenId(x.id)}>
                    <strong>{x.name}</strong>
                    <small>{d ? pick(d.name, lang) : ""} · {dayWord(lang, x.days)} · {monthLabel(lang, x.month)}</small>
                    <small>{tr(lang, "sv_created")} {fmtDate(x.createdAt)}{x.rating ? ` · ${"★".repeat(x.rating)}` : ""}</small>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="saved__detail">
            {!it || !dest ? (
              <p className="empty">{tr(lang, "sv_pick")}</p>
            ) : (
              <>
                <h3>{it.name}</h3>
                <p className="muted small">
                  {pick(dest.name, lang)} · {dayWord(lang, it.days)} · {monthLabel(lang, it.month)} · {placesCount(lang, it.plan.flat().length)}
                  {it.people ? ` · ${peopleWord(lang, it.people)}` : ""}
                  {it.interests?.length ? ` · ${it.interests.map((k) => tr(lang, `k_${k}`)).join(", ")}` : ""}
                </p>

                <div className="days days--read">
                  {it.plan.map((ids, di) => (
                    <div key={di} className="daycol">
                      <h4>{dayLabel(lang, di + 1)}<small>{totalHours(ids, map)} {tr(lang, "hours")}</small></h4>
                      {scheduleDay(ids, map).map((s) => (
                        <div key={s.id} className="plan-item">
                          <div className="plan-time">{fmtTime(s.start)}<br /><small>{fmtTime(s.end)}</small></div>
                          <div className="plan-main">
                            <strong>{pick(map[s.id].name, lang)}</strong>
                            <small>{pick(map[s.id].note, lang)}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="rate">
                  <span>{tr(lang, "sv_rating")}</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className={n <= (it.rating || 0) ? "on" : ""} onClick={() => onPatch(it.id, { rating: n === it.rating ? 0 : n })} aria-label={`${n}`}>★</button>
                  ))}
                </div>

                <label className="field">
                  <span>{tr(lang, "sv_notes")} <em className="muted small">· {tr(lang, "sv_autosave")}</em></span>
                  <textarea rows={4} value={it.notes || ""} placeholder={tr(lang, "sv_notes_ph")} onChange={(e) => onPatch(it.id, { notes: e.target.value })} />
                </label>

                <div className="saved__btns">
                  <button className="btn" onClick={() => onEdit(it)}>✎ {tr(lang, "sv_edit")}</button>
                  <button className="btn" onClick={() => onCopy(it)}>⧉ {tr(lang, "sv_copy")}</button>
                  <button className="btn btn--danger" onClick={() => remove(it.id)}>{tr(lang, "sv_delete")}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
