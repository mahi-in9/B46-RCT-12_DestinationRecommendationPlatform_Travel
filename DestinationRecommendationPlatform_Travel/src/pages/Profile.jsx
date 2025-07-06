import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth); // Assuming Firebase auth structure

  // Dummy preferences & favorites for mock UI
  const preferences = {
    interest: "adventure",
    budget: "₹70,000",
    style: "solo",
  };

  const favorites = [
    {
      id: "1",
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1612203986297-bd3898b3a34b",
    },
    {
      id: "2",
      name: "Bali",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p>
          <strong>Name:</strong> {user?.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Saved Preferences</h2>
        <p>
          <strong>Interest:</strong> {preferences.interest}
        </p>
        <p>
          <strong>Budget:</strong> {preferences.budget}
        </p>
        <p>
          <strong>Travel Style:</strong> {preferences.style}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Saved Destinations</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorites saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((dest) => (
              <Link
                key={dest.id}
                to={`/destination/${dest.id}`}
                className="block bg-gray-100 hover:bg-gray-200 p-3 rounded"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{dest.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
