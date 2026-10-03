import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { tr, pick } from "../i18n";
import { REGIONS } from "../data/content";

// Vùng hiển thị bao gồm cả quần đảo Hoàng Sa và Trường Sa.
const BOUNDS = [[6.4, 101.5], [24.2, 118.2]];

// Vị trí các đảo mang tính minh họa (schematic).
const HOANG_SA = [[16.53, 111.61], [16.46, 111.7], [16.5, 111.52], [16.83, 112.33], [16.87, 112.28], [16.62, 112.75]];
const TRUONG_SA = [[11.43, 114.33], [10.38, 114.48], [10.18, 114.37], [9.89, 114.33], [9.85, 113.62], [8.86, 112.28], [8.64, 111.92], [7.88, 112.92], [10.38, 114.06], [9.72, 114.28]];

const labelIcon = (text, cls) =>
  L.divIcon({ className: `geo-label ${cls}`, html: `<span>${text}</span>`, iconSize: [0, 0] });

const pinIcon = (d, on) =>
  L.divIcon({
    className: "",
    html: `<div class="pin ${on ? "pin--on" : ""}" style="--c:${REGIONS[d.region].color}"></div>`,
    iconSize: [0, 0],
  });

function FitAndFly({ selected }) {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);
  useEffect(() => {
    if (selected) map.flyTo(selected.coords, 7, { duration: 1.1 });
    else map.flyToBounds(BOUNDS, { duration: 0.9, padding: [8, 8] });
  }, [selected, map]);
  return null;
}

export default function MapView({ geo, destinations, selected, onSelect, sat, lang }) {
  const vnStyle = sat
    ? { color: "#ffffff", weight: 1.6, fillOpacity: 0 }
    : { color: "#6d8057", weight: 1.3, fillColor: "#cdd9b3", fillOpacity: 1 };
  const nbStyle = sat
    ? { color: "#ffffff", weight: 0.6, opacity: 0.4, fillOpacity: 0 }
    : { color: "#cfc6b0", weight: 0.8, fillColor: "#ece7da", fillOpacity: 1 };

  const labels = useMemo(
    () => [
      { p: [18.9, 103.2], t: tr(lang, "g_laos"), c: "geo-label--land" },
      { p: [12.7, 104.6], t: tr(lang, "g_cambodia"), c: "geo-label--land" },
      { p: [15.4, 100.6], t: tr(lang, "g_thailand"), c: "geo-label--land" },
      { p: [23.6, 105.4], t: tr(lang, "g_china"), c: "geo-label--land" },
      { p: [14.2, 112.8], t: tr(lang, "g_east_sea"), c: "geo-label--sea geo-label--big" },
      { p: [19.7, 108.1], t: tr(lang, "g_tonkin"), c: "geo-label--sea" },
      { p: [9.4, 102.5], t: tr(lang, "g_thai_gulf"), c: "geo-label--sea" },
      { p: [17.65, 112.1], t: tr(lang, "g_hoang_sa"), c: "geo-label--isl" },
      { p: [6.9, 115.4], t: tr(lang, "g_truong_sa"), c: "geo-label--isl" },
    ],
    [lang]
  );

  const features = geo ? geo.features : [];
  const vn = geo ? { type: "FeatureCollection", features: features.filter((f) => f.properties.code === "vn") } : null;
  const nb = geo ? { type: "FeatureCollection", features: features.filter((f) => f.properties.code !== "vn") } : null;

  return (
    <MapContainer
      bounds={BOUNDS}
      boundsOptions={{ padding: [8, 8] }}
      minZoom={5}
      maxZoom={10}
      zoomSnap={0.25}
      maxBounds={[[-2, 94], [30, 126]]}
      maxBoundsViscosity={0.8}
      attributionControl={false}
    >
      {sat && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Imagery © Esri"
        />
      )}
      {nb && <GeoJSON key={`nb-${sat}`} data={nb} style={() => nbStyle} interactive={false} />}
      {vn && <GeoJSON key={`vn-${sat}`} data={vn} style={() => vnStyle} interactive={false} />}

      {[HOANG_SA, TRUONG_SA].flatMap((group, gi) =>
        group.map((p, i) => (
          <CircleMarker
            key={`isl-${gi}-${i}`}
            center={p}
            radius={3}
            pathOptions={{ color: "#c8553d", weight: 1, fillColor: "#e8604c", fillOpacity: 1 }}
            interactive={false}
          />
        ))
      )}

      {labels.map((l, i) => (
        <Marker key={`lb-${i}`} position={l.p} icon={labelIcon(l.t, l.c)} interactive={false} keyboard={false} />
      ))}

      {destinations.map((d) => (
        <Marker
          key={d.id}
          position={d.coords}
          icon={pinIcon(d, d.id === selected?.id)}
          zIndexOffset={d.id === selected?.id ? 1000 : 500}
          title={pick(d.name, lang)}
          eventHandlers={{ click: () => onSelect(d.id) }}
        />
      ))}
      {destinations.map((d) => (
        <Marker
          key={`n-${d.id}`}
          position={d.coords}
          icon={L.divIcon({ className: "geo-label geo-label--city", html: `<span>${pick(d.name, lang)}</span>`, iconSize: [0, 0] })}
          interactive={false}
          keyboard={false}
        />
      ))}

      <FitAndFly selected={selected} />
    </MapContainer>
  );
}
