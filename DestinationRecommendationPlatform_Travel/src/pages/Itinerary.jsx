import React, { useState } from "react";
import { Link } from "react-router-dom";

const Itinerary = () => {
  const [itinerary, setItinerary] = useState([
    {
      id: "1",
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
      day: 1,
    },
    {
      id: "2",
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1582661700381-d72ecf8ab9b4",
      day: 2,
    },
  ]);

  const handleRemove = (id) => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Itinerary</h1>

      {itinerary.length === 0 ? (
        <p className="text-center text-gray-600">No destinations added yet.</p>
      ) : (
        <div className="space-y-4">
          {itinerary.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">Day {item.day}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/destination/${item.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Itinerary;
