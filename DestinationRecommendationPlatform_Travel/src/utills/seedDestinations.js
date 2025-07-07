// src/utils/seedDestinations.js
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed
import dummyDestinations from "../data/destinations"; // your dummy data file

export const seedDestinations = async () => {
  try {
    const ref = collection(db, "destinations");
    const snapshot = await getDocs(ref);

    if (!snapshot.empty) {
      alert("Data already exists. Not adding again.");
      return;
    }

    for (const dest of dummyDestinations) {
      await addDoc(ref, dest);
    }

    alert("Dummy data successfully added!");
  } catch (error) {
    console.error("Seeding error:", error);
    alert("Failed to add dummy data.");
  }
};
