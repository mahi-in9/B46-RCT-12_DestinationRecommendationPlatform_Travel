import { useState } from "react";
import { getDestinationData } from "../services/destinationService";
import { useNavigate } from "react-router-dom";

function SearchDestination() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = input.trim();
    if (!query) return;

    setLoading(true);
    setResult(null);
    setErrorMsg("");

    try {
      const data = await getDestinationData(query);

      if (!data || !data.lat || !data.lng) {
        setErrorMsg("Could not find location coordinates. Try another place.");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error("Error fetching destination data:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToMap = () => {
    if (!result || !result.lat || !result.lng) {
      alert("Coordinates not found for this destination.");
      return;
    }

    navigate(
      `/map?lat=${result.lat}&lng=${result.lng}&name=${encodeURIComponent(
        result.name
      )}`
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🔍 Search Destination
      </h2>

      <div className="flex mb-6 gap-2">
        <input
          type="text"
          placeholder="Enter destination name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">🔄 Loading...</p>}

      {errorMsg && <p className="text-center text-red-500 mb-4">{errorMsg}</p>}

      {result && result.lat && result.lng && (
        <div className="bg-white p-4 rounded shadow space-y-3">
          {result.image && (
            <img
              src={result.image}
              alt={result.name}
              className="w-full h-40 object-cover rounded"
            />
          )}
          <h3 className="text-xl font-semibold">{result.name}</h3>
          <p className="text-sm text-gray-700">{result.description}</p>
          <p className="text-xs text-gray-500">Source: {result.source}</p>

          <button
            onClick={handleGoToMap}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            🗺️ Go to Map
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchDestination;
