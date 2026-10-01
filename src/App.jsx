import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import DestinationList from "./components/DestinationList";
import "./index.css";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy data.json (mã " + res.status + ")");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "red", padding: 24 }}>Lỗi: {error}</p>;
  if (!data) return <p style={{ padding: 24 }}>Đang tải dữ liệu...</p>;

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Bản đồ tri thức du lịch Việt Nam</h1>
        <p className="sub">{data.destinations.length} điểm đến</p>
        <DestinationList
          destinations={data.destinations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </aside>
      <main className="map-area">
        <MapView
          destinations={data.destinations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </main>
    </div>
  );
}