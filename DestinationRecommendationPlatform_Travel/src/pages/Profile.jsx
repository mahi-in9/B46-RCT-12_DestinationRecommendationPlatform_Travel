import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utills/firebase";
import { fetchUserCards } from "../apps/slices/cardSlice";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const {
    favorites,
    explored,
    shared,
    loading: cardLoading,
    error,
  } = useSelector((state) => state.card);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) {
        setLoadingProfile(false);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setProfile(data);
        } else {
          setProfile({
            displayName: user.displayName || "",
            email: user.email,
            preferences: {},
            favorites: [],
            pastTrips: [],
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (user?.uid) dispatch(fetchUserCards(user.uid));
  }, [dispatch, user]);

  if (loadingProfile || cardLoading)
    return <p className="text-center">Loading profile...</p>;
  if (!user)
    return <p className="text-center">Please log in to view your profile.</p>;

  const { displayName, email, preferences, pastTrips = [] } = profile || {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p>
          <strong>Name:</strong> {displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Saved Preferences</h2>
        {preferences?.interest ? (
          <>
            <p>
              <strong>Interest:</strong> {preferences.interest}
            </p>
            <p>
              <strong>Budget:</strong> ₹{preferences.budget}
            </p>
            <p>
              <strong>Style:</strong> {preferences.style}
            </p>
          </>
        ) : (
          <p className="text-gray-600">No preferences saved.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">❤️ Favorite Destinations</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorites saved yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((dest, i) => (
              <Link
                key={dest.id || i}
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🌍 Explored Destinations</h2>
        {explored.length === 0 ? (
          <p className="text-gray-600">No explored destinations yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {explored.map((dest, i) => (
              <li key={i}>{dest.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Shared Destinations</h2>
        {shared.length === 0 ? (
          <p className="text-gray-600">No destinations shared yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {shared.map((dest, i) => (
              <li key={i}>{dest.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">🧳 Past Trips</h2>
        {pastTrips.length === 0 ? (
          <p className="text-gray-600">No past trips recorded yet.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {pastTrips.map((trip, i) => (
              <li key={i}>
                {trip.name} ({trip.date || "Unknown date"})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
