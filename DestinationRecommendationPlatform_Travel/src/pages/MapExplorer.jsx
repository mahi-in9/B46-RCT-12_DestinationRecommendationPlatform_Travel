import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    description: "City of Light with culture, food, and the Eiffel Tower.",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    lat: 35.6895,
    lng: 139.6917,
    description: "Bustling city blending tradition and technology.",
  },
  {
    id: 3,
    name: "Cape Town, South Africa",
    lat: -33.9249,
    lng: 18.4241,
    description: "Mountains, beaches, and adventure.",
  },
];

function MapExplorer() {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[20.0, 0.0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((dest) => (
          <Marker key={dest.id} position={[dest.lat, dest.lng]}>
            <Popup>
              <h3 className="font-bold">{dest.name}</h3>
              <p>{dest.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapExplorer;
