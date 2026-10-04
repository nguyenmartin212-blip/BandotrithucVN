import { useEffect } from "react";

export default function TravelTransition({ onComplete, countryName = "Việt Nam" }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2700);
    return () => clearTimeout(t);
  }, [onComplete]);

  return <div className="travel-transition travel-transition--globe" aria-label={`Đang bay đến ${countryName}`}>
    <div className="sky-glow" />
    <div className="transition-earth" aria-hidden="true"><span>🌏</span><i /></div>
    <div className="flight-path" aria-hidden="true" />
    <div className="cloud cloud--1">☁</div><div className="cloud cloud--2">☁</div><div className="cloud cloud--3">☁</div><div className="cloud cloud--4">☁</div>
    <div className="flying-plane">✈</div>
    <div className="travel-transition__text"><b>Đang bay đến {countryName}</b><span>Chuẩn bị khám phá bản đồ tri thức...</span></div>
  </div>;
}
