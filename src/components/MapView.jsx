import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function makeIcon(name, active) {
    return L.divIcon({
        className: "",
        html: `<div class="pin ${active ? "pin--active" : ""}">${name.charAt(0)}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });
}

function FlyToSelected({ destination }) {
    const map = useMap();
    useEffect(() => {
        if (destination) map.flyTo(destination.coords, 8, { duration: 1.2 });
    }, [destination, map]);
    return null;
}

export default function MapView({ destinations, selectedId, onSelect }) {
    const selected = destinations.find((d) => d.id === selectedId);

    return (
        <MapContainer center={[16.0, 106.5]} zoom={6} minZoom={5} zoomControl={true}>
            <TileLayer
                attribution='&copy; OpenStreetMap &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {destinations.map((d) => (
                <Marker
                    key={d.id}
                    position={d.coords}
                    icon={makeIcon(d.name, d.id === selectedId)}
                    eventHandlers={{ click: () => onSelect(d.id) }}
                />
            ))}
            <FlyToSelected destination={selected} />
        </MapContainer>
    );
}