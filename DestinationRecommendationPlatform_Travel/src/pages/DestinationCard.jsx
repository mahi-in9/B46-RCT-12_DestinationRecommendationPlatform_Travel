import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  markAsExplored,
  shareDestination,
  syncCardDataToFirebase,
} from "../apps/slices/cardSlice";

function DestinationCard({ dest }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { favorites, explored, shared } = useSelector((state) => state.card);

  const isFavorited = favorites.some((d) => d.id === dest.id);
  const isExplored = explored.some((d) => d.id === dest.id);
  const isShared = shared.some((d) => d.id === dest.id);

  const handleSave = () => {
    if (!user) return alert("Login to save destinations");
    if (!isFavorited) {
      dispatch(addToFavorites(dest));
      dispatch(syncCardDataToFirebase());
    }
  };

  const handleExplore = () => {
    if (!user) return alert("Login to mark destinations as explored");
    if (!isExplored) {
      dispatch(markAsExplored(dest));
      dispatch(syncCardDataToFirebase());
    }
  };

  const handleShare = async () => {
    if (!user) return alert("Login to share destinations");
    if (!isShared) {
      dispatch(shareDestination(dest));
      dispatch(syncCardDataToFirebase());
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: dest.name,
          text: `Check out ${dest.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  const handleGoToMap = () => {
    if (!dest.lat || !dest.lng) {
      return alert("Map location not available for this destination.");
    }

    navigate(
      `/map?lat=${dest.lat}&lng=${dest.lng}&name=${encodeURIComponent(
        dest.name
      )}`
    );
  };

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={dest.image}
        alt={dest.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{dest.name}</h3>
        <p className="text-sm text-gray-600">{dest.description}</p>
        {dest.averageCost && <p className="text-sm">💰 ₹{dest.averageCost}</p>}
        {(dest.interest || dest.style) && (
          <p className="text-xs text-gray-500">
            {dest.interest && `Interest: ${dest.interest}`}{" "}
            {dest.style && `| Style: ${dest.style}`}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={handleSave}
            className={`text-sm px-3 py-1 rounded ${
              isFavorited ? "bg-green-100 text-green-600" : "bg-gray-100"
            }`}
          >
            {isFavorited ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleExplore}
            className={`text-sm px-3 py-1 rounded ${
              isExplored ? "bg-blue-100 text-blue-600" : "bg-gray-100"
            }`}
          >
            {isExplored ? "Explored" : "Mark as Explored"}
          </button>

          <button
            onClick={handleShare}
            className={`text-sm px-3 py-1 rounded ${
              isShared ? "bg-purple-100 text-purple-600" : "bg-gray-100"
            }`}
          >
            {isShared ? "Shared" : "Share"}
          </button>

          {dest.lat && dest.lng && (
            <button
              onClick={handleGoToMap}
              className="text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              🗺️ Go to Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
