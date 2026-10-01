import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const makeIcon = (d, on) =>
    L.divIcon({
        className: "",
        html: `<div class="pin ${on ? "pin--on" : ""}" style="--c:${d.color}"></div><span class="pin-label">${d.name}</span>`,
        iconSize: [0, 0],
    });

function Fly({ d }) {
    const map = useMap();
    useEffect(() => { if (d) map.flyTo(d.coords, 8, { duration: 1.2 }); }, [d, map]);
    return null;
}

export default function MapView({ list, selected, onSelect, sat }) {
    return (
        <MapContainer center={[16.0, 106.5]} zoom={6} minZoom={5}>
            {sat ? (
                <TileLayer key="s" attribution="Tiles &copy; Esri" url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            ) : (
                <TileLayer key="m" attribution="&copy; OpenStreetMap" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            )}
            {list.map((d) => (
                <Marker
                    key={d.id}
                    position={d.coords}
                    icon={makeIcon(d, d.id === selected?.id)}
                    zIndexOffset={d.id === selected?.id ? 1000 : 0}
                    eventHandlers={{ click: () => onSelect(d.id) }}
                />
            ))}
            <Fly d={selected} />
        </MapContainer>
    );
}