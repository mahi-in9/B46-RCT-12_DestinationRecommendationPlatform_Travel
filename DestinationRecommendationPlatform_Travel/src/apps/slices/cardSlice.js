// src/apps/slices/cardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utills/firebase";

export const fetchUserCards = createAsyncThunk(
  "card/fetchUserCards",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "cards", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data(); // { favorites, explored, shared }
      } else {
        return { favorites: [], explored: [], shared: [] };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const saveToFirebase = async (uid, data) => {
  const docRef = doc(db, "cards", uid);
  await setDoc(docRef, data, { merge: true });
};

export const syncCardDataToFirebase = createAsyncThunk(
  "card/syncCardDataToFirebase",
  async (_, { getState, rejectWithValue }) => {
    const { auth, card } = getState();
    const uid = auth.user?.uid;
    if (!uid) return;

    try {
      await saveToFirebase(uid, {
        favorites: card.favorites,
        explored: card.explored,
        shared: card.shared,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  favorites: [],
  explored: [],
  shared: [],
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      const exists = state.favorites.find((d) => d.id === item.id);
      if (!exists) state.favorites.push(item);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((d) => d.id !== action.payload);
    },
    markAsExplored: (state, action) => {
      const item = action.payload;
      const exists = state.explored.find((d) => d.id === item.id);
      if (!exists) state.explored.push(item);
    },
    shareDestination: (state, action) => {
      const item = action.payload;
      const exists = state.shared.find((d) => d.id === item.id);
      if (!exists) state.shared.push(item);
    },
    clearCardState: (state) => {
      state.favorites = [];
      state.explored = [];
      state.shared = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCards.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favorites || [];
        state.explored = action.payload.explored || [];
        state.shared = action.payload.shared || [];
      })
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(syncCardDataToFirebase.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  markAsExplored,
  shareDestination,
  clearCardState,
} = cardSlice.actions;

export default cardSlice.reducer;
