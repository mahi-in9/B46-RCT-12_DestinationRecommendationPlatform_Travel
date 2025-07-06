import { useEffect, useState } from "react";
import { db } from "../utills/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../apps/slices/destinationSlice";

function Recommendations() {
  const { user } = useSelector((state) => state.auth);
  const { destinations, loading } = useSelector((state) => state.destinations);
  const [preference, setPreference] = useState(null);
  const [prefLoading, setPrefLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Step 1: Fetch preferences from Firestore
  useEffect(() => {
    const fetchPreference = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "preferences"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const snap = await getDocs(q);
        const latestPref = snap.docs[0]?.data();
        setPreference(latestPref);

        // ✅ Step 2: After preference fetched, call redux thunk
        if (latestPref) {
          dispatch(fetchRecommendations(latestPref)); // { interest, style, budget }
        }
      } catch (err) {
        console.error("Error fetching preferences:", err);
      } finally {
        setPrefLoading(false);
      }
    };

    fetchPreference();
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="text-center mt-8">
        <p className="text-lg">Please login to view recommendations.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (prefLoading || loading) {
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        ✨ Your Recommendations
      </h2>

      {destinations.length === 0 ? (
        <p className="text-center text-gray-600">
          No matches found. Try changing your preferences.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="rounded-t-lg h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dest.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{dest.description}</p>
                <div className="mt-2 text-sm text-blue-500">
                  <span className="mr-2">#{dest.interest}</span>
                  <span>#{dest.style}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
