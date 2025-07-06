import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utills/firebase";

// 🔄 Async thunk to fetch recommended destinations
export const fetchRecommendations = createAsyncThunk(
  "destinations/fetchRecommendations",
  async ({ interest, style, budget }, { rejectWithValue }) => {
    try {
      const destRef = collection(db, "destinations");

      const q = query(
        destRef,
        where("interest", "==", interest),
        where("style", "==", style)
        // 👇 Uncomment if you have averageCost field in Firestore
        // where("averageCost", "<=", Number(budget))
      );

      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return results;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch destinations");
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
