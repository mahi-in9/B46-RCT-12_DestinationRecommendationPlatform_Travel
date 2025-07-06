import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utills/firebase";
import {
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";

// 🔁 Fetch itineraries for the logged-in user
export const fetchItineraries = createAsyncThunk(
  "itinerary/fetchItineraries",
  async (userId, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "itineraries"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ➕ Add a new itinerary
export const addItinerary = createAsyncThunk(
  "itinerary/addItinerary",
  async (itinerary, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "itineraries"), {
        ...itinerary,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...itinerary };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ❌ Delete an itinerary
export const deleteItinerary = createAsyncThunk(
  "itinerary/deleteItinerary",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "itineraries", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    itineraries: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearItineraries: (state) => {
      state.itineraries = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItinerary.fulfilled, (state, action) => {
        state.itineraries.push(action.payload);
      })
      .addCase(deleteItinerary.fulfilled, (state, action) => {
        state.itineraries = state.itineraries.filter(
          (i) => i.id !== action.payload
        );
      });
  },
});

export const { clearItineraries } = itinerarySlice.actions;

export default itinerarySlice.reducer;
