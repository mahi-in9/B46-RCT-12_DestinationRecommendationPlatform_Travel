import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import bali from "../assets/bali.png";
import kyoto from "../assets/kyoto.png";
import swis from "../assets/swis.png";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const trendingDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: bali,
      description: "Tropical beaches, vibrant culture, and stunning temples.",
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      image: kyoto,
      description: "Historic shrines, cherry blossoms, and serene gardens.",
    },
    {
      id: 3,
      name: "Swiss Alps",
      image: swis,
      description: "Snowy peaks, scenic railways, and mountain adventures.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Perfect Travel Destination
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
          Personalized travel recommendations based on your style, interests,
          and budget.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to={user ? "/survey" : "/login"}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            {user ? "Find Your Next Destination" : "Start Your Journey"}
          </Link>

          <Link
            to="/search"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            🔍 Search Destination
          </Link>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 px-4 md:px-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          🌍 Trending Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dest.name}</h3>
                <p className="text-sm text-gray-600">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-12 px-4 md:px-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          ✨ Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Tailored Recommendations</h3>
            <p>
              Get matches based on your personal travel style and preferences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Real Reviews</h3>
            <p>See what other travelers say before planning your trip.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Plan with Ease</h3>
            <p>Build and share itineraries with a few clicks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
