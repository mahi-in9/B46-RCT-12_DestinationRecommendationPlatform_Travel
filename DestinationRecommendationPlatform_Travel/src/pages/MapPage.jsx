import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔍 Search bar on map
function SearchControl() {
  const map = useMap();
  const controlRef = useRef();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      searchLabel: "Search for a location",
      keepResult: true,
    });

    controlRef.current = searchControl;
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

// 🔄 Get URL query params
function useQueryParams() {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search));
}

function MapPage() {
  const query = useQueryParams();
  const name = decodeURIComponent(query.name || "Selected Location").trim();
  const latParam = parseFloat(query.lat);
  const lngParam = parseFloat(query.lng);

  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!isNaN(latParam) && !isNaN(lngParam)) {
        setCoords([latParam, lngParam]);
        setLoading(false);
        return;
      }

      if (name) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              name
            )}&format=json&limit=1`
          );
          const data = await response.json();

          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            if (!isNaN(lat) && !isNaN(lon)) {
              setCoords([lat, lon]);
            } else {
              throw new Error("Invalid coordinates received");
            }
          } else {
            throw new Error("No location found for the given name");
          }
        } catch (err) {
          console.error("Geocoding failed:", err);
          setError("Location not found. Defaulting to India.");
          setCoords([20, 78]);
        } finally {
          setLoading(false);
        }
      } else {
        setCoords([20, 78]);
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [latParam, lngParam, name]);

  if (loading) {
    return <p className="p-6 text-center text-gray-600">🗺️ Loading map...</p>;
  }

  if (!coords) {
    return (
      <p className="p-6 text-center text-red-600">
        Could not determine coordinates for this place.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {error && (
        <div className="text-center text-red-600 font-semibold mb-2">
          {error}
        </div>
      )}

      <div className="h-[85vh] w-full">
        <MapContainer
          center={coords}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <SearchControl />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <Marker position={coords}>
            <Popup>
              <strong>{name}</strong>
              <br />
              Coordinates: {coords[0].toFixed(4)}, {coords[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
