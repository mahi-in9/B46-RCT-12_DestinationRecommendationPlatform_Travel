import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../apps/slices/destinationSlice";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../utills/firebase";
import DestinationCard from "./DestinationCard";

function Recommendations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [latestPrefs, setLatestPrefs] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [allDestinations, setAllDestinations] = useState([]);

  const { destinations, loading, error } = useSelector(
    (state) => state.destinations
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const q = query(
          collection(db, "preferences"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(q);
        const latest = snapshot.docs[0]?.data();
        if (latest) setLatestPrefs(latest);
      } catch (err) {
        console.error("Failed to load preferences", err);
      }
    };

    if (user) loadPreferences();
  }, [user]);

  const fetchAllDestinations = async () => {
    try {
      const snapshot = await getDocs(collection(db, "destinations"));
      const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllDestinations(all);
    } catch (err) {
      console.error("Failed to fetch all destinations", err);
    }
  };

  const handleGetRecommendations = () => {
    if (latestPrefs) {
      dispatch(fetchRecommendations(latestPrefs));
      setShowRecommendations(true);
      setShowAll(false);
    } else {
      alert("No preferences found. Please complete the survey first.");
      navigate("/survey");
    }
  };

  const handleShowAll = () => {
    fetchAllDestinations();
    setShowAll(true);
    setShowRecommendations(false);
  };

  const displayList = showAll
    ? allDestinations
    : showRecommendations
    ? destinations
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎯 Recommended Destinations</h2>
        <div className="flex gap-2">
          <button
            onClick={handleGetRecommendations}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Show Recommendations
          </button>
          <button
            onClick={handleShowAll}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Show All Destinations
          </button>
        </div>
      </div>

      {!showAll && showRecommendations && latestPrefs && (
        <div className="mb-4 text-sm text-gray-700">
          Showing results for: <strong>{latestPrefs.interest}</strong> |{" "}
          <strong>{latestPrefs.style}</strong> | Budget: ₹
          <strong>{latestPrefs.budget}</strong>
        </div>
      )}

      {loading && showRecommendations && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && displayList.length === 0 && (
        <p className="text-gray-500">
          {showAll
            ? "No destinations available."
            : showRecommendations
            ? "No matching recommendations found."
            : "Click a button above to view destinations."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayList.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
