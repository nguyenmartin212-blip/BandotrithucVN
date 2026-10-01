import { useEffect, useRef } from "react";
import { ICON } from "./DetailPanel";

export default function Sidebar({ layers, counts, total, layer, setLayer, query, setQuery, list, selectedId, onSelect }) {
    const ref = useRef();
    useEffect(() => {
        const k = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); ref.current?.focus(); }
        };
        window.addEventListener("keydown", k);
        return () => window.removeEventListener("keydown", k);
    }, []);
    const lname = (id) => layers.find((l) => l.id === id)?.name;

    return (
        <aside className="side">
            <label className="search">
                ⌕<input ref={ref} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm điểm đến, văn hóa, món ăn..." />
                <kbd>Ctrl K</kbd>
            </label>
            <div className="label">Lớp tri thức <span>Chọn để khám phá</span></div>
            <button className={`row ${layer === "all" ? "on" : ""}`} onClick={() => setLayer("all")}>
                <span className="ic">✦</span>Tất cả<em>{total}</em>
            </button>
            {layers.map((l) => (
                <button key={l.id} className={`row ${layer === l.id ? "on" : ""}`} onClick={() => setLayer(l.id)}>
                    <span className="ic">{ICON[l.id]}</span>{l.name}<em>{counts[l.id] || 0}</em>
                </button>
            ))}
            <div className="label">Điểm đến nổi bật <span>{list.length} địa điểm</span></div>
            {list.map((d) => (
                <button key={d.id} className={`row dest ${d.id === selectedId ? "on" : ""}`} style={{ "--c": d.color }} onClick={() => onSelect(d.id)}>
                    <span className="sq">{d.name[0]}</span>
                    <div><strong>{d.name}</strong><small>{d.region}{d.layers?.[0] && ` · ${lname(d.layers[0])}`}</small></div>
                    <em>›</em>
                </button>
            ))}
        </aside>
    );
}