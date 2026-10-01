import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Bản đồ tri thức du lịch Việt Nam</h1>
      <p>
        {data
          ? `Đã tải ${data.layers.length} lớp tri thức, ${data.destinations.length} điểm đến`
          : "Đang tải dữ liệu..."}
      </p>
    </div>
  );
}