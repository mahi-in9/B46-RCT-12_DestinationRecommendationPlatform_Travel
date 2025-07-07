import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utills/firebase";

// ✅ Fetch from Firebase
const fetchFromFirebase = async (placeName) => {
  const ref = doc(db, "destinations", placeName.toLowerCase());
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// ✅ Fetch lat/lng from OpenStreetMap (Nominatim)
const fetchCoordinates = async (placeName) => {
  try {
    const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      placeName
    )}&format=json&limit=1`;
    const res = await fetch(geoUrl);
    const data = await res.json();

    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geolocation fetch error:", error.message);
    return null;
  }
};

// ✅ Fetch summary & image from Wikipedia
const fetchWikipediaData = async (placeName) => {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        placeName
      )}`
    );
    const data = await res.json();

    return {
      name: data.title || placeName,
      description: data.extract || "No description available.",
      image: data.thumbnail?.source || null,
    };
  } catch (error) {
    console.error("Wikipedia fetch error:", error.message);
    return null;
  }
};

// ✅ Save to Firebase
const saveToFirebase = async (placeData) => {
  const ref = doc(db, "destinations", placeData.name.toLowerCase());
  await setDoc(ref, placeData);
};

// ✅ Main service function
export const getDestinationData = async (placeName) => {
  // 1. Try from Firebase
  const cached = await fetchFromFirebase(placeName);
  if (cached && cached.lat && cached.lng)
    return { ...cached, source: "firebase" };

  // 2. Get coordinates from OpenStreetMap
  const geo = await fetchCoordinates(placeName);
  if (!geo) return null;

  // 3. Get summary + image from Wikipedia
  const wiki = await fetchWikipediaData(placeName);
  if (!wiki) return null;

  const finalData = {
    ...wiki,
    ...geo,
    source: "internet",
  };

  // 4. Cache for future
  await saveToFirebase(finalData);

  return finalData;
};
