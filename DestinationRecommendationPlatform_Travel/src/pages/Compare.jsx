import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Compare() {
  const { favorites } = useSelector((state) => state.card);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Compare Favorites
      </h1>

      {favorites.length < 2 ? (
        <div className="text-center text-gray-600">
          <p>
            You need at least <strong>2 favorite destinations</strong> to
            compare.
          </p>
          <p className="mt-2">
            Visit{" "}
            <Link to="/recommendations" className="text-blue-600 underline">
              Recommendations
            </Link>{" "}
            or{" "}
            <Link to="/search" className="text-blue-600 underline">
              Search
            </Link>{" "}
            to add more favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((dest) => (
            <div
              key={dest.id}
              className="bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              {dest.image && (
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-40 object-cover rounded-t"
                />
              )}
              <div className="p-4 space-y-1">
                <h2 className="text-xl font-semibold">{dest.name}</h2>
                <p className="text-sm text-gray-600">{dest.description}</p>
                <p className="text-sm">
                  💰 <strong>Budget:</strong> ₹{dest.averageCost ?? "N/A"}
                </p>
                <p className="text-sm">
                  ✈️ <strong>Interest:</strong> {dest.interest ?? "N/A"}
                </p>
                <p className="text-sm">
                  🎒 <strong>Style:</strong> {dest.style ?? "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Compare;
