import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import DetailPanel from "./components/DetailPanel";
import useCollection from "./hooks/useCollection";
import "./index.css";

const COLORS = ["#e8604c", "#2f8f83", "#8a63c9", "#e5a03a", "#4f9a62", "#3f86b8"];
const norm = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();

export default function App() {
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState("hue");
  const [layer, setLayer] = useState("all");
  const [query, setQuery] = useState("");
  const [sat, setSat] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const col = useCollection();

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((j) => setData({ ...j, destinations: j.destinations.map((d, i) => ({ ...d, color: COLORS[i % COLORS.length] })) }))
      .catch(() => setData(false));
  }, []);

  if (data === false) return <p style={{ padding: 24 }}>Không đọc được data.json</p>;
  if (!data) return <p style={{ padding: 24 }}>Đang tải...</p>;

  const q = norm(query);
  const list = data.destinations.filter(
    (d) =>
      (layer === "all" || d.layers?.includes(layer)) &&
      (!onlySaved || col.ids.includes(d.id)) &&
      (!q || norm([d.name, d.region, ...(d.tags || []), ...(d.topics || []).map((t) => t.name)].join(" ")).includes(q))
  );
  const counts = {};
  data.destinations.forEach((d) => d.layers?.forEach((l) => (counts[l] = (counts[l] || 0) + 1)));
  const selected = list.find((d) => d.id === selectedId);

  return (
    <div className="app">
      <header className="top">
        <div className="logo"><b>V</b><div>VIỆT NAM<small>TRAVEL KNOWLEDGE</small></div></div>
        <nav className="nav">
          <a className="on" href="#">Khám phá</a><a href="#">Chủ đề</a><a href="#">Hành trình</a><a href="#">Về dự án</a>
        </nav>
        <div className="right">
          <span>VI ⌄</span>
          <button className="link" onClick={() => setOnlySaved(!onlySaved)}>
            {onlySaved ? "♥" : "♡"} Bộ sưu tập ({col.ids.length})
          </button>
          <div className="avatar">HN</div>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Bản đồ tri thức du lịch Việt Nam</p>
          <h1>Khám phá không chỉ là <em>đi đến.</em><br />Mà là <em>hiểu sâu.</em></h1>
        </div>
        <p>Mỗi vùng đất là một mạng lưới sống động của con người, văn hóa, ẩm thực và những câu chuyện được trao truyền qua nhiều thế hệ.</p>
      </section>

      <div className="grid">
        <Sidebar
          layers={data.layers} counts={counts} total={data.destinations.length}
          layer={layer} setLayer={setLayer} query={query} setQuery={setQuery}
          list={list} selectedId={selected?.id} onSelect={setSelectedId}
        />
        <main className={`map-area ${sat ? "sat" : ""}`}>
          <div className="seg">
            <button className={!sat ? "on" : ""} onClick={() => setSat(false)}>Bản đồ</button>
            <button className={sat ? "on" : ""} onClick={() => setSat(true)}>Vệ tinh</button>
          </div>
          <MapView list={list} selected={selected} onSelect={setSelectedId} sat={sat} />
        </main>
        {selected && (
          <DetailPanel
            key={selected.id} d={selected} layers={data.layers}
            saved={col.ids.includes(selected.id)} onSave={() => col.toggle(selected.id)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}