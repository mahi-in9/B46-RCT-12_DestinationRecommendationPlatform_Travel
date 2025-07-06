import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const dummyDestinations = [
  {
    id: "1",
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
    description: "Experience the serene beaches and vibrant culture of Bali.",
    tags: ["beach", "culture", "relaxation"],
    lat: -8.3405,
    lng: 115.092,
    reviews: [
      { user: "Ravi", text: "Amazing place to unwind and enjoy the sea!" },
      { user: "Anita", text: "Loved the beaches and food!" },
    ],
  },
  {
    id: "2",
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1582661700381-d72ecf8ab9b4",
    description:
      "Explore temples, cherry blossoms, and traditional Japanese heritage.",
    tags: ["culture", "nature", "history"],
    lat: 35.0116,
    lng: 135.7681,
    reviews: [
      { user: "Sakura", text: "A beautiful mix of tradition and nature." },
    ],
  },
];

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const found = dummyDestinations.find((d) => d.id === id);
    setDestination(found);
  }, [id]);

  if (!destination) {
    return (
      <div className="text-center mt-10 text-red-500">
        Destination not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-gray-700 mb-4">{destination.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {destination.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Location</h2>
      <div className="h-72 mb-6 rounded overflow-hidden">
        <MapContainer
          center={[destination.lat, destination.lng]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>{destination.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      <div className="space-y-4">
        {destination.reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded shadow-sm">
            <p className="font-semibold">{review.user}</p>
            <p className="text-sm text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add to Itinerary
        </button>
      </div>
    </div>
  );
};

export default DestinationDetails;
