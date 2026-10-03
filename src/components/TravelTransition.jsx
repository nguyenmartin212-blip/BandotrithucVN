import { useEffect } from "react";

export default function TravelTransition({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return <div className="travel-transition" aria-label="Đang mở bản đồ">
    <div className="sky-glow" />
    <div className="cloud cloud--1">☁</div><div className="cloud cloud--2">☁</div><div className="cloud cloud--3">☁</div><div className="cloud cloud--4">☁</div>
    <div className="flying-plane">✈</div>
    <div className="travel-transition__text"><b>Việt Nam đang chờ bạn</b><span>Chuẩn bị cất cánh...</span></div>
  </div>;
}
