import { useState } from "react";

export const ICON = { "di-san": "⌂", "am-thuc": "○", "van-hoa": "♬", "thien-nhien": "♧", "cau-chuyen": "◈" };

export default function DetailPanel({ d, layers, saved, onSave, onClose }) {
    const [tid, setTid] = useState(null);
    const topics = d.topics || [];
    const t = topics.find((x) => x.id === tid);
    const lname = (id) => layers.find((l) => l.id === id)?.name || "";
    const first = lname(d.layers?.[0]);
    const Sources = ({ s }) =>
        s?.length > 0 && (
            <div className="sources">
                <p className="eyebrow">Nguồn</p>
                {s.map((u, i) => <a key={i} href={u} target="_blank" rel="noreferrer">{u}</a>)}
            </div>
        );

    return (
        <aside className="panel">
            <div className="panel__hero" style={{ "--c": d.color }}>
                <span className="badge">{d.region}{first && ` · ${first}`}</span>
                <div className="acts">
                    <button onClick={onSave} title="Lưu vào bộ sưu tập">{saved ? "♥" : "♡"}</button>
                    <button onClick={onClose} title="Đóng">×</button>
                </div>
                <h2>{d.name}</h2>
            </div>
            <div className="panel__body">
                {t ? (
                    <>
                        <button className="back" onClick={() => setTid(null)}>← {d.name}</button>
                        <p className="eyebrow">{lname(t.layer)}</p>
                        <h3>{t.name}</h3>
                        {t.subtitle && <p className="muted">{t.subtitle}</p>}
                        <p>{t.description}</p>
                        <Sources s={t.sources} />
                    </>
                ) : (
                    <>
                        <h3>{d.subtitle ? `${d.name} — ${d.subtitle[0].toLowerCase()}${d.subtitle.slice(1)}` : d.name}</h3>
                        {d.description && <p>{d.description}</p>}
                        {(d.bestTime || d.duration) && (
                            <div className="facts">
                                {d.bestTime && <div><small>◷ Thời điểm đẹp</small><strong>{d.bestTime}</strong></div>}
                                {d.duration && <div><small>⌁ Thời lượng gợi ý</small><strong>{d.duration}</strong></div>}
                            </div>
                        )}
                        {d.tags?.length > 0 && <div className="tags">{d.tags.map((x) => <span key={x}>#{x}</span>)}</div>}
                        {topics.length > 0 && (
                            <>
                                <p className="eyebrow">Kết nối tri thức · {topics.length} chủ đề liên quan</p>
                                {topics.map((x) => (
                                    <button key={x.id} className="topic" onClick={() => setTid(x.id)}>
                                        <i>{ICON[x.layer]}</i>
                                        <div><small>{lname(x.layer)}</small><strong>{x.name}</strong><span>{x.subtitle}</span></div>
                                        <b>↗</b>
                                    </button>
                                ))}
                            </>
                        )}
                        <Sources s={d.sources} />
                    </>
                )}
            </div>
        </aside>
    );
}