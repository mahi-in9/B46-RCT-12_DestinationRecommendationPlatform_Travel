// src/apps/slices/destinationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utills/firebase";

// 🔄 Async thunk to fetch recommended destinations
export const fetchRecommendations = createAsyncThunk(
  "destinations/fetchRecommendations",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const ref = collection(db, "destinations");

      const conditions = [];
      if (filters.interest) {
        conditions.push(where("interest", "==", filters.interest));
      }
      if (filters.style) {
        conditions.push(where("style", "==", filters.style));
      }
      if (filters.budget) {
        conditions.push(where("averageCost", "<=", Number(filters.budget)));
      }

      const q = conditions.length ? query(ref, ...conditions) : ref;

      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue("Failed to fetch recommendations");
    }
  }
);

const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    destinations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDestinations: (state) => {
      state.destinations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
