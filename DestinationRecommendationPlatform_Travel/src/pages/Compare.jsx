import React, { useState } from "react";

const dummyDestinations = [
  {
    id: "1",
    name: "Bali",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
    description: "Serene beaches and tropical paradise.",
    tags: ["beach", "relaxation"],
    rating: 4.8,
    estimatedCost: "₹60,000",
  },
  {
    id: "2",
    name: "Kyoto",
    image: "https://images.unsplash.com/photo-1582661700381-d72ecf8ab9b4",
    description: "Temples, culture, and cherry blossoms.",
    tags: ["culture", "nature"],
    rating: 4.6,
    estimatedCost: "₹85,000",
  },
  {
    id: "3",
    name: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1612203986297-bd3898b3a34b",
    description: "Mountains, snow, and skiing.",
    tags: ["adventure", "mountains"],
    rating: 4.9,
    estimatedCost: "₹1,20,000",
  },
];

const Compare = () => {
  const [selected, setSelected] = useState(["1", "2"]); // IDs of selected destinations

  const selectedDestinations = dummyDestinations.filter((d) =>
    selected.includes(d.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Compare Destinations
      </h1>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto">
        {selectedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{dest.name}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {dest.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-blue-600 mb-3">
                {dest.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-sm mb-1">
                <span className="font-semibold">Rating:</span> {dest.rating} ⭐
              </p>
              <p className="text-sm">
                <span className="font-semibold">Estimated Cost:</span>{" "}
                {dest.estimatedCost}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Destination Selector (optional future enhancement) */}
      {/* You can add checkboxes here to let users pick which destinations to compare */}
    </div>
  );
};

export default Compare;
